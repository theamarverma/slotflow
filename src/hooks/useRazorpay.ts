// hooks/useRazorpay.ts
import { useCallback, useState } from 'react';
import { openRazorpayCheckout } from '@/lib/razorpay';
import type { VerifyResponse } from '@/lib/razorpay';

export function useRazorpay() {
	const [loading, setLoading] = useState(false);

	const pay = useCallback(
		async (args: {
			orderId: string;
			bookingId: string;
			position: number;
			amountPaise?: number;
		}): Promise<VerifyResponse> => {
			setLoading(true);
			try {
				return await openRazorpayCheckout(args);
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return { pay, loading };
}
