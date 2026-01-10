'use client';

import React, { useState, useMemo } from 'react';
import type { XiorResponse } from 'xior';
import { motion, AnimatePresence } from 'motion/react';
import {
	Calendar,
	MapPin,
	Clock,
	Check,
	User,
	Sparkles,
} from 'lucide-react';

import { http } from '@/httpClient/httpClient';

import { BookingModal } from './BookingModal';

import { useRazorpay } from '@/hooks/useRazorpay';

import Swal from 'sweetalert2';
import ProgressIndicator from './ProgressIndicator';
import DateSelectionStep from './DateSelectionStep';
import LocationSelectionStep from './LocationSelectionStep';
import TimeSelectionStep from './TimeSelectionStep';
import PersonalInfoStep from './PersonalInfoStep';
import ReviewStep from './ReviewStep';
import NavigationButtons from './NavigationButtons';

interface Location {
	id: string;
	name: string;
	address: string;
}

interface CalendarDay {
	date: Date;
	day: number;
	isCurrentMonth: boolean;
	isPast: boolean;
	isToday: boolean;
	value: string;
	display: string;
	dayName: string;
}

export interface ApiResponse<T = any> extends XiorResponse<T> { }

interface BookingResponse {
	bookingId: string;
	orderId: string;
	[key: string]: any;
}

interface BookingSearchResponse {
	booking?: any;
	[key: string]: any;
}

interface FormData {
	name: string;
	address: string;
	email: string;
	phone: string;
	referredBy: string;
	message: string;
}

const stepInfo = [
	{ icon: Calendar, label: 'Date', description: 'Pick a date' },
	{ icon: MapPin, label: 'Location', description: 'Select branch' },
	{ icon: Clock, label: 'Time', description: 'Choose slot' },
	{ icon: User, label: 'Details', description: 'Your info' },
	{ icon: Check, label: 'Confirm', description: 'Review & book' },
];

const BookingSystem: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [selectedLocation, setSelectedLocation] = useState<string>('');
	const [selectedTime, setSelectedTime] = useState<string>('');
	const [locationSearch, setLocationSearch] = useState<string>('');
	const [showLocationDropdown, setShowLocationDropdown] = useState<boolean>(false);
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { pay, loading } = useRazorpay();
	const [formData, setFormData] = useState<FormData>({
		name: '',
		address: '',
		email: '',
		phone: '',
		referredBy: '',
		message: '',
	});
	const [waitingListCount, setWaitingListCount] = useState<number>(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [previousBooking, setPreviousBooking] = useState<any>(null);
	const [nextBooking, setNextBooking] = useState<any>(null);
	const [currentMonth, setCurrentMonth] = useState<Date>(new Date(Date.now()));
	const [direction, setDirection] = useState<number>(0);

	// extracting day from selected date
	const dayOfWeek = selectedDate ? new Date(selectedDate).getDay() : null;

	// Chamber 1 slots - More comprehensive timing
	const morningSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
	const afternoonSlots = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
	const eveningSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];

	// Chamber 2 slots - Different timing pattern
	const earlyMorningSlots = ['08:00', '08:30', '09:00', '09:30'];
	const lateAfternoonSlots = ['15:00', '15:30', '16:00', '16:30', '17:00'];
	const nightSlots = ['20:00', '20:30', '21:00'];

	const toHour = (t: string) => parseInt(t.slice(0, 2), 10);

	let rawTimes: string[] = [];
	if (selectedLocation === '1') {
		if (dayOfWeek === null) {
			rawTimes = [];
		} else if (dayOfWeek === 0) {
			// Sunday - Morning and Evening only
			rawTimes = [...morningSlots, ...eveningSlots];
		} else if (dayOfWeek === 6) {
			// Saturday - Morning and Afternoon only
			rawTimes = [...morningSlots, ...afternoonSlots];
		} else {
			// Weekdays - All slots available
			rawTimes = [...morningSlots, ...afternoonSlots, ...eveningSlots];
		}
	} else if (selectedLocation === '2') {
		if (dayOfWeek === null) {
			rawTimes = [];
		} else if (dayOfWeek === 0) {
			// Sunday - Limited hours
			rawTimes = [...earlyMorningSlots, ...lateAfternoonSlots];
		} else if (dayOfWeek === 6) {
			// Saturday - No night slots
			rawTimes = [...earlyMorningSlots, ...lateAfternoonSlots];
		} else {
			// Weekdays - All slots available
			rawTimes = [...earlyMorningSlots, ...lateAfternoonSlots, ...nightSlots];
		}
	} else if (selectedLocation === '3') {
		if (dayOfWeek === null) {
			rawTimes = [];
		} else if (dayOfWeek === 0) {
			// Sunday - Morning and Afternoon only
			rawTimes = [...morningSlots, ...afternoonSlots];
		} else if (dayOfWeek === 6) {
			// Saturday - All slots except night
			rawTimes = [...morningSlots, ...afternoonSlots, ...eveningSlots.slice(0, 3)];
		} else {
			// Weekdays - All slots available
			rawTimes = [...morningSlots, ...afternoonSlots, ...eveningSlots];
		}
	} else if (selectedLocation === '4') {
		if (dayOfWeek === null) {
			rawTimes = [];
		} else if (dayOfWeek === 0) {
			// Sunday - Limited morning and afternoon
			rawTimes = [...earlyMorningSlots.slice(0, 3), ...afternoonSlots.slice(0, 3)];
		} else if (dayOfWeek === 6) {
			// Saturday - Morning and evening only
			rawTimes = [...morningSlots, ...eveningSlots];
		} else {
			// Weekdays - All slots available
			rawTimes = [...earlyMorningSlots, ...afternoonSlots, ...eveningSlots, ...nightSlots];
		}
	}

	const morningTimes = rawTimes.filter((t) => {
		const h = toHour(t);
		return h >= 6 && h < 12;
	}).sort();

	const afternoonTimes = rawTimes.filter((t) => {
		const h = toHour(t);
		return h >= 12 && h < 17;
	}).sort();

	const eveningTimes = rawTimes.filter((t) => {
		const h = toHour(t);
		return h >= 17 && h <= 23;
	}).sort();

	const locations: Location[] = [
		{
			id: '1',
			name: 'Downtown Medical Center',
			address: '123 Main Street, Suite 100, Downtown District, New York, NY 10001',
		},
		{
			id: '2',
			name: 'Westside Dental Clinic',
			address: '456 Oak Avenue, Building B, Westside Plaza, Los Angeles, CA 90001',
		},
		{
			id: '3',
			name: 'Northside Health Hub',
			address: '789 Elm Street, Medical Tower, Northside Complex, Chicago, IL 60001',
		},
		{
			id: '4',
			name: 'Eastside Wellness Center',
			address: '321 Pine Road, Wellness Park, Eastside District, Houston, TX 77001',
		},
	];

	const generateCalendar = (date: Date): CalendarDay[] => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const firstDay = new Date(year, month, 1);
		const startDate = new Date(firstDay);
		startDate.setDate(firstDay.getDate() - firstDay.getDay());

		const days: CalendarDay[] = [];
		const currentDate = new Date(startDate);

		for (let i = 0; i < 42; i++) {
			const isCurrentMonth = currentDate.getMonth() === month;
			const isPast = currentDate < today;
			const isToday = currentDate.getTime() === today.getTime();

			const dateValue = `${currentDate.getFullYear()}-${String(
				currentDate.getMonth() + 1
			).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

			days.push({
				date: new Date(currentDate),
				day: currentDate.getDate(),
				isCurrentMonth,
				isPast,
				isToday,
				value: dateValue,
				display: currentDate.toLocaleDateString('en-US', {
					weekday: 'short',
					month: 'short',
					day: 'numeric',
				}),
				dayName: currentDate.toLocaleDateString('en-US', {
					weekday: 'long',
				}),
			});

			currentDate.setDate(currentDate.getDate() + 1);
		}

		return days;
	};

	const calendarDays = generateCalendar(currentMonth);
	const monthName = currentMonth.toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	const goToPreviousMonth = (): void => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
	};

	const goToNextMonth = (): void => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
	};

	const filteredLocations = useMemo(() => {
		if (!locationSearch) return locations;
		return locations.filter(
			(location) =>
				location.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
				location.address.toLowerCase().includes(locationSearch.toLowerCase())
		);
	}, [locationSearch]);

	const handleLocationSelect = (location: Location): void => {
		setSelectedLocation(location.id);
		setLocationSearch(location.name);
		setShowLocationDropdown(false);
	};

	const handleDateSelect = (date: string): void => {
		setSelectedDate(date);
	};

	const handleTimeSelect = async (time: string): Promise<void> => {
		try {
			setSelectedTime(time);
			const chamber = selectedLocation === '1' ? 'College Square Branch' : 'VIP Road Branch';
			const countData = { date: selectedDate, chamber: chamber, time: time };
			setIsLoading(true);
			const res = await http.post('/waitinglist/count', countData);
			const waitingListCount = res.data.count;
			setWaitingListCount(waitingListCount);
			setIsLoading(false);
		} catch (error: any) {
			console.error('❌ Error calling /waitinglist/count:', error);
		}
	};

	const handleFormChange = (field: keyof FormData, value: string): void => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleNext = (): void => {
		if (currentStep < 5) {
			setDirection(1);
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = (): void => {
		if (currentStep > 1) {
			setDirection(-1);
			setCurrentStep(currentStep - 1);
		}
	};

	function showResult(t: string, d?: string) {
		Swal.fire({
			icon: 'success',
			title: t,
			text: d,
			confirmButtonText: 'OK',
		});
	}

	const isPaymentsEnabled = process.env.NEXT_PUBLIC_IS_PAYMENTS_ENABLED === 'true';

	const handleBooking = async () => {
		if (isPaymentsEnabled) {
			await paymentBooking();
		} else {
			await noPaymentBooking();
		}
	};

	const noPaymentBooking = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const selectedLocationData = locations.find((loc) => loc.id === selectedLocation);
			const selectedDateData = calendarDays.find((d) => d.value === selectedDate);

			const bookingData = {
				name: formData.name.trim(),
				chamber: selectedLocationData?.name,
				date: selectedDateData?.value,
				time: selectedTime,
				email: formData.email.trim(),
				phone: formData.phone,
				address: formData.address,
				referredBy: formData.referredBy,
				message: formData.message,
			};

			const res = await http.post('/bookings/search', bookingData);

			if (res.status === 200) {
				const foundRes = res?.data?.booking;
				setPreviousBooking(foundRes);
				setModalOpen(true);
				return foundRes;
			}
			if (res.status === 201) {
				const res = await http.post('/bookings/old', bookingData);
				if (res?.data?.message === 'Booking confirmed') {
					showResult('Your reservation is booked', 'Confirmation email sent.');
				}
				if (res?.data?.message === 'Added to waiting list') {
					showResult('Added to waiting list', `Position: ${res?.data?.position ?? '-'}`);
				}
			} else {
				showResult('Unexpected response', 'Please contact support.');
			}
			resetForm();
		} catch (error: any) {
			console.error('❌ Error calling /bookings:', error);
		}
	};

	const paymentBooking = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const selectedLocationData = locations.find((loc) => loc.id === selectedLocation);
			const selectedDateData = calendarDays.find((d) => d.value === selectedDate);

			const bookingData = {
				name: formData.name.trim(),
				chamber: selectedLocationData?.name,
				date: selectedDateData?.value,
				time: selectedTime,
				email: formData.email.trim(),
				phone: formData.phone,
				address: formData.address,
				referredBy: formData.referredBy,
				message: formData.message,
			};
			setNextBooking(bookingData);

			const searchRes = await http.post<BookingSearchResponse>('/bookings/search', bookingData);

			if (searchRes.status === 200) {
				const foundRes = searchRes?.data?.booking;
				setPreviousBooking(foundRes);
				setModalOpen(true);
				return;
			}
			if (searchRes.status === 201) {
				const bookingRes = await http.post<BookingResponse>('/bookings', bookingData);
				const bookingId = bookingRes?.data?.bookingId;
				const orderId = bookingRes?.data?.orderId;
				const position = bookingRes?.data?.position;

				const res = await pay({ orderId, bookingId, position });
				if (res?.status === 200 && res?.data?.message === 'Payment verified & booking confirmed') {
					showResult('Your reservation is booked', 'Payment verified and email sent.');
				} else if (res?.data?.message === 'Payment verified & waitlisted booking given') {
					showResult('Added to waiting list', `Payment received. Position: ${res?.data?.booking?.position ?? '-'}`);
				} else {
					showResult('Unexpected response', 'Please contact support.');
				}
			}
			resetForm();
		} catch (error: any) {
			console.error('❌ Error calling /bookings:', error);
			showResult('Payment failed', 'The transaction could not be completed.');
		} finally {
			setIsLoading(false);
		}
	};

	const resetForm = () => {
		setFormData({ name: '', address: '', email: '', phone: '', referredBy: '', message: '' });
		setSelectedDate('');
		setSelectedLocation('');
		setSelectedTime('');
		setWaitingListCount(0);
		setCurrentStep(1);
	};

	const isStepValid = (step: number): boolean => {
		switch (step) {
			case 1:
				return !!selectedDate;
			case 2:
				return !!selectedLocation;
			case 3:
				return !!selectedTime;
			case 4:
				return !!(formData.name && formData.email && formData.phone && formData.address);
			case 5:
				return true;
			default:
				return false;
		}
	};

	// Animation variants
	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 300 : -300,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 300 : -300,
			opacity: 0,
		}),
	};

	return (
		<div className="w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 bg-gradient-to-br from-background via-background to-muted/20">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="flex items-center justify-center gap-2 mb-2">
					<Sparkles className="w-5 h-5 text-primary" />
					<span className="text-sm font-medium text-primary uppercase tracking-wider">
						Easy Booking
					</span>
					<Sparkles className="w-5 h-5 text-primary" />
				</div>
				<h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
					Book Your Dental Appointment
				</h1>
				<p className="text-sm sm:text-base text-muted-foreground mt-1">
					Complete the steps below to schedule your visit
				</p>
			</motion.div>

			{/* Enhanced Progress Indicator */}
			<ProgressIndicator 
				currentStep={currentStep}
				stepInfo={stepInfo}
			/>

			{/* Step Content */}
			<div className="relative">
				<AnimatePresence mode="wait" custom={direction}>
					<motion.div
						key={currentStep}
						custom={direction}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
						className="w-full"
					>
						{/* Step 1: Date Selection */}
						{currentStep === 1 && (
							<DateSelectionStep
								selectedDate={selectedDate}
								currentMonth={currentMonth}
								calendarDays={calendarDays}
								monthName={monthName}
								onDateSelect={handleDateSelect}
								onPreviousMonth={goToPreviousMonth}
								onNextMonth={goToNextMonth}
							/>
						)}

						{/* Step 2: Location Selection */}
						{currentStep === 2 && (
							<LocationSelectionStep
								selectedLocation={selectedLocation}
								locationSearch={locationSearch}
								filteredLocations={filteredLocations}
								onLocationSelect={handleLocationSelect}
								onLocationSearchChange={(value) => {
									setLocationSearch(value);
									setShowLocationDropdown(true);
								}}
								onLocationDropdownFocus={() => setShowLocationDropdown(true)}
								onLocationDropdownBlur={() => setShowLocationDropdown(false)}
								showLocationDropdown={showLocationDropdown}
							/>
						)}

						{/* Step 3: Time Selection */}
						{currentStep === 3 && (
							<TimeSelectionStep
								selectedTime={selectedTime}
								morningTimes={morningTimes}
								afternoonTimes={afternoonTimes}
								eveningTimes={eveningTimes}
								waitingListCount={waitingListCount}
								isLoading={isLoading}
								onTimeSelect={handleTimeSelect}
							/>
						)}

						{/* Step 4: Personal Information */}
						{currentStep === 4 && (
							<PersonalInfoStep
								formData={formData}
								onFormChange={handleFormChange}
							/>
						)}

						{/* Step 5: Review and Confirm */}
						{currentStep === 5 && (
							<ReviewStep
								selectedLocation={selectedLocation}
								selectedDate={selectedDate}
								selectedTime={selectedTime}
								locations={locations}
								calendarDays={calendarDays}
								formData={formData}
							/>
						)}
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation Buttons */}
			<NavigationButtons
				currentStep={currentStep}
				isStepValid={isStepValid}
				isLoading={isLoading}
				onBack={handleBack}
				onNext={handleNext}
				onBooking={handleBooking}
			/>
			<BookingModal
				oldBooking={previousBooking}
				newBooking={nextBooking}
				open={modalOpen}
				setOpen={setModalOpen}
			/>
		</div>
	);
};

export default BookingSystem;
