import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { http } from '@/httpClient/httpClient';
import { toast } from 'react-toastify';
import { Check, CrossIcon, Delete } from 'lucide-react';
import ClassicLoader from './ClassicLoader';
import { useRazorpay } from '@/hooks/useRazorpay';

import { useState } from 'react';
import Swal from 'sweetalert2';

interface Booking {
	name: string;
	date: string;
	time: string;
	chamber: string;
	email: string;
	phone: string;
	address: string;
	referredBy: string;
	message: string;
}
type BookingModalProps = {
	open: boolean;
	oldBooking: Booking;
	newBooking: Booking;
	setOpen: (open: boolean) => void;
};

export function BookingModal({
	open,
	oldBooking,
	newBooking,
	setOpen,
}: BookingModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { pay, loading } = useRazorpay();
	const modalData = {
		name: oldBooking?.name,
		date: new Date(oldBooking?.date).toLocaleDateString(),
		time: oldBooking?.time,
		chamber: oldBooking?.chamber,
	};
	function showResult(t: string, d?: string) {
		Swal.fire({
			icon: 'success',
			title: t,
			text: d,
			confirmButtonText: 'OK'
		});
	}
	// TODO: HANDLE PAYMENT AND WITHOUT PAYMENT BOTH
	// method to confirm booking
	async function BookingConfirm() {
		setIsLoading(true);
		try {
			const bookingRes = await http.post('/bookings', { ...newBooking });
			const bookingId = bookingRes?.data?.bookingId;
			const orderId = bookingRes?.data?.orderId;
			const position = bookingRes?.data?.position;
			console.log('💻orderId, bookingId', orderId, bookingId);
			setOpen(false); //for not overlapping razorpaymodal
			const res = await pay({ orderId, bookingId, position });
			console.log('💻razorpayRes', res);
			if (
				res?.status === 200 &&
				res?.data?.message === 'Payment verified & booking confirmed'
			) {
				showResult(
					'Reservation confirmed',
					'Email sent successfully!!'
				);
				setTimeout(() => window.location.reload(), 10000);
			} else if (
				res?.data?.message ===
				'Payment verified & waitlisted booking given'
			) {
				showResult(
					'Payment Received & Added to waiting list',
					`Position: ${res?.data?.booking?.position}`
				);
				setTimeout(() => window.location.reload(), 10000);
			} else {
				toast.error(
					'Unexpected response from server. Please contact support.'
				);
			}
		} catch (error: any) {
			console.log('💻error', error);
			toast.error(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogContent className="bg-gray-200">
				<DialogHeader>
					<DialogTitle className="text-xl">
						We found an existing booking for:{' '}
					</DialogTitle>
				</DialogHeader>
				<ul className="font-bold text-md w-full text-red-700 ">
					<li>Name: {modalData.name}</li>
					<li>Date: {modalData.date}</li>
					<li>Time: {modalData.time}</li>
					<li>Location: {modalData.chamber}</li>
				</ul>
				<p>
					Confirming this new booking will automatically cancel your
					previous reservation. Would you like to proceed?
				</p>

				<div className="flex justify-between">
					<Button onClick={BookingConfirm}>
						{isLoading ? (
							<div className="flex items-center gap-2">
								<ClassicLoader className="border-white" />
								Confirming...
							</div>
						) : (
							<div className="flex items-center gap-2">
								<Check className="w-4 h-4 mr-2" />
								Confirm New Booking
							</div>
						)}
					</Button>
					<Button
						onClick={() => setOpen(false)}
						variant="outline">
						<Delete />
						Keep Previous Booking
					</Button>
				</div>
				<DialogClose className="absolute right-4 top-4"></DialogClose>
			</DialogContent>
		</Dialog>
	);
}
