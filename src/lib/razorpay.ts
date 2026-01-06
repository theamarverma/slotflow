import { http } from '@/httpClient/httpClient';

export type VerifyResponse = {
	status: number;
	data?: { message?: string; position?: string;[k: string]: any };
};

let scriptPromise: Promise<boolean> | null = null;

export function loadRazorpayScript(): Promise<boolean> {
	if (scriptPromise) return scriptPromise;
	scriptPromise = new Promise((resolve) => {
		const s = document.createElement('script');
		s.src = 'https://checkout.razorpay.com/v1/checkout.js';
		s.onload = () => resolve(true);
		s.onerror = () => resolve(false);
		document.body.appendChild(s);
	});
	return scriptPromise;
}

type OpenArgs = {
	orderId: string;
	bookingId: string;
	position: number;
	amountPaise?: number;
	name?: string;
	description?: string;
	image?: string;
};

export async function openRazorpayCheckout({
	orderId,
	bookingId,
	position,
	amountPaise = 50000,
	name = 'SlotFlow',
	description = 'Test Transaction',
	image,
}: OpenArgs): Promise<VerifyResponse> {
	const ok = await loadRazorpayScript();
	if (!ok) throw new Error('Script load failed');

	return new Promise<VerifyResponse>((resolve, reject) => {
		let settled = false;

		const options: any = {
			key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
			amount: String(amountPaise),
			currency: 'INR',
			name,
			description,
			image,
			order_id: orderId,
			retry: { enabled: true, max_count: 2 },
			redirect: false,
			notes: { bookingId, position },
			theme: { color: '#3399cc' },
			handler: async (resp: {
				razorpay_payment_id: string;
				razorpay_order_id: string;
				razorpay_signature: string;
			}) => {
				if (settled) return;
				try {
					const verifyRes = await http.post(
						'/payment/verifyPayment',
						{
							bookingId,
							razorpay_payment_id: resp.razorpay_payment_id,
							razorpay_order_id: resp.razorpay_order_id,
							razorpay_signature: resp.razorpay_signature,
							position,
						}
					);
					settled = true;
					resolve({ status: verifyRes.status, data: verifyRes.data });
				} catch (e) {
					if (settled) return;
					settled = true;
					reject(e);
				}
			},
			modal: {
				ondismiss: () => {
					if (settled) return;
					settled = true;
					http.post('/bookings/cancelOnClose', {
						id: bookingId,
					}).finally(() => {
						reject(new Error('User dismissed Razorpay modal'));
					});
				},
			},
		};

		const rzp = new (window as any).Razorpay(options);
		rzp.on('payment.failed', () => {
			// notify UI if needed; do not reject to allow retry
		});
		rzp.open();
	});
}
