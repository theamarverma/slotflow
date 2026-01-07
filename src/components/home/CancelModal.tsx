import * as React from 'react';
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
import { FaSpinner } from 'react-icons/fa';
import ClassicLoader from './ClassicLoader';
import Swal from 'sweetalert2';


export function SearchModal({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const [query, setQuery] = React.useState({
		bookingId: '',
		email: '',
	});
	const [isLoading, setIsLoading] = React.useState(false);

	function showResult(t: string, d?: string) {
		Swal.fire({
			icon: 'success',
			title: t,
			text: d,
			confirmButtonText: 'OK'
		});
	}
	const handleCancelBooking = async (query: {
		bookingId: string;
		email: string;
	}) => {
		// alert(`Searching for: ${query}`);
		// setOpen(false); // optionally close after search
		try {
			const trimmedbookingId = query.bookingId.trim();
			setIsLoading(true);
			const res = await http.delete(
				`bookings/${trimmedbookingId}/cancel`,
				{
					data: { email: query.email },
				}
			);
			// console.log('💻cancel res', res);
			setOpen(!true);
			showResult('Booking cancelled successfully');
			// setOpen(!true);
			setIsLoading(false);
		} catch (error: any) {
			if (error.response) {
				const status = error.response.status;

				if (status === 404) {
					showResult('Booking ID not found!');
				} else if (status === 403) {
					showResult('Email does not match!');
				} else if (status >= 500) {
					showResult('Booking not found !');
				} else {
					showResult(
						`Error: ${
							error.response.data?.message ||
							'Something went wrong!'
						}`
					);
				}
			} else if (error.request) {
				// Request was made but no response received
				showResult(
					'No response from server, please check your network!'
				);
			} else {
				// Something else caused the error
				showResult(
					`Error: ${error.message || 'Something went wrong!'}`
				);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cancel Your Booking</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-4 ">
					<div className="flex flex-col gap-1">
						<label htmlFor="email">Email</label>
						<Input
							placeholder="enter your email..."
							value={query.email}
							id="email"
							required
							onChange={(e) =>
								setQuery({ ...query, email: e.target.value })
							}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label
							className=""
							htmlFor="bookingId">
							Booking ID
						</label>
						<Input
							placeholder="enter your booking id..."
							value={query.bookingId}
							id="bookingId"
							required
							onChange={(e) =>
								setQuery({
									...query,
									bookingId: e.target.value,
								})
							}
						/>
					</div>
					<Button
						className="bg-red-900 p-3 "
						onClick={() => handleCancelBooking(query)}>
						{isLoading ? (
							<div className="flex items-center gap-2">
								<ClassicLoader className="border-white w-2 h-2" />
								Canceling...
							</div>
						) : (
							'Cancel'
						)}
					</Button>
				</div>
				<DialogClose className="absolute right-4 top-4"></DialogClose>
			</DialogContent>
		</Dialog>
	);
}
