'use client';
import React, { useState } from 'react';
import DentalBookingSystem from './book-appointment/_components/Stepper';
import { Button } from '@/components/ui/button';
import { SearchModal } from './book-appointment/_components/CancelModal';

const page = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const cancelAppointment = () => {
		setModalOpen(true);
	};
	return (
		<div className="pt-20">
			{/* <Banner name="Book Appointment" /> */}
			<section className="w-full grid md:grid-cols-2 px-6 pb-12  md:px-20 pt-14">
				<div
					className="flex flex-col text-start  justify-start
				items-start gap-4  p-4">
					<h1 className="md:text-7xl text-4xl font-bold">
						Book with{' '}
					</h1>
					<h1 className="md:text-5xl text-2xl font-semibold">
						Your Dentist
					</h1>

					<ul
						style={{ listStyle: 'disc' }}
						className="flex flex-col gap-2">
						<li>
							Book regular check-ups to catch dental issues early.
						</li>
						<li>
							The dentist will examine your mouth and clean your
							teeth.
						</li>
						<li>
							Get personalized advice and a treatment plan if
							needed.
						</li>
						<li>
							Schedule your next appointment or any follow-up
							treatments before leaving.
						</li>
						<li>Chamber I working days Sun-Fri</li>
						<li>Chamber II working days Mon-Sat</li>
						<li>Chamber I is closed on Saturdays</li>
						<li>
							chamber II <b>Sunday App Basis</b>
						</li>
					</ul>
					<div className="flex flex-col gap-4">
						<h2 className="text-xl font-bold  ">
							Cancel Your Appointment
						</h2>
						<ul className="list-disc  text-gray-700 flex flex-col gap-2 ">
							<li>Enter email you used while booking.</li>
							<li>
								Type your Booking ID as provided in your
								confirmation email/SMS.
							</li>
							<li>Click 'Confirm Cancel' to proceed.</li>
							<li>
								For urgent help, call or email us (see contact
								below).
							</li>
						</ul>
						<Button
							className="bg-red-700 w-fit hover:bg-red-800 text-white font-bold py-6 px-6 rounded"
							onClick={cancelAppointment}>
							Cancel Appointment
						</Button>
						<SearchModal
							open={modalOpen}
							setOpen={setModalOpen}
						/>
					</div>
				</div>
				{/* <AppointmentForm /> */}
				<DentalBookingSystem />
			</section>
		</div>
	);
};

export default page;
