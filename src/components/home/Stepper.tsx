'use client';

import React, { useState, useMemo } from 'react';
import type { XiorResponse } from 'xior';
import { motion, AnimatePresence } from 'motion/react';
import {
	Calendar,
	MapPin,
	Clock,
	Search,
	ChevronDown,
	Check,
	ChevronLeft,
	ChevronRight,
	User,
	ArrowLeft,
	ArrowRight,
	Sparkles,
	Sun,
	CloudSun,
	Moon,
	AlertCircle,
	CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { http } from '@/httpClient/httpClient';

import { BookingModal } from './BookingModal';
import Script from 'next/script';
import ClassicLoader from './ClassicLoader';
import { useRazorpay } from '@/hooks/useRazorpay';

import Swal from 'sweetalert2';

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

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
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
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="flex justify-center"
			>
				<div className="flex items-center gap-0">
					{stepInfo.map((step, index) => {
						const stepNum = index + 1;
						const isCompleted = currentStep > stepNum;
						const isCurrent = currentStep === stepNum;
						const Icon = step.icon;

						return (
							<React.Fragment key={stepNum}>
								<motion.div
									className="flex flex-col items-center "
									// whileHover={{ scale: 1.05 }}
								>
									<motion.div
										className={`
											relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
											font-semibold transition-all duration-300 
											${isCompleted
												? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
												: isCurrent
													? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/20'
													: 'bg-muted text-muted-foreground hover:bg-muted/80'
											}
										`}
										animate={{
											scale: isCurrent ? [1, 1.05, 1] : 1,
										}}
										transition={{
											duration: 2,
											repeat: isCurrent ? Infinity : 0,
											ease: 'easeInOut',
										}}
									>
										{isCompleted ? (
											<motion.div
												initial={{ scale: 0, rotate: -180 }}
												animate={{ scale: 1, rotate: 0 }}
												transition={{ type: 'spring', stiffness: 200 }}
											>
												<Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
											</motion.div>
										) : (
											<Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
										)}
									</motion.div>
									<div className="mt-1 sm:mt-2! text-center hidden sm:block">
										<p className={`text-xs font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
											{step.label}
										</p>
									</div>
								</motion.div>

								{stepNum < 5 && (
									<div className="w-4 sm:w-6 md:w-8 lg:w-16 h-1 mx-0.5 sm:mx-1 rounded-full overflow-hidden bg-muted">
										<motion.div
											className="h-full bg-gradient-to-r from-stormy-teal to-pacific-blue"
											initial={{ width: '0%' }}
											animate={{ width: isCompleted ? '100%' : '0%' }}
											transition={{ duration: 0.5, ease: 'easeInOut' }}
										/>
									</div>
								)}
							</React.Fragment>
						);
					})}
				</div>
			</motion.div>

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
							<Card className="h-full border-0 shadow-xl bg-card/80 backdrop-blur-sm">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-3 text-xl">
										<div className="p-2 rounded-xl bg-primary/10">
											<Calendar className="w-6 h-6 text-primary" />
										</div>
										Select Your Preferred Date
									</CardTitle>
									<CardDescription>
										Choose a date for your appointment
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="bg-muted/30 rounded-2xl p-4 md:p-6">
										{/* Calendar Header */}
										<div className="flex justify-between items-center mb-6!">
											<Button
												variant="ghost"
												size="icon"
												onClick={goToPreviousMonth}
												className="hover:bg-primary/10  rounded-xl"
											>
												<ChevronLeft className="w-5 h-5" />
											</Button>
											<h3 className="text-lg font-bold text-foreground">
												{monthName}
											</h3>
											<Button
												variant="ghost"
												size="icon"
												onClick={goToNextMonth}
												className="hover:bg-primary/10 rounded-xl"
											>
												<ChevronRight className="w-5 h-5" />
											</Button>
										</div>

										{/* Day Labels */}
										<div className="grid grid-cols-7 gap-1 mb-3!">
											{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
												<div
													key={day}
													className="text-center text-xs font-semibold text-muted-foreground py-2!"
												>
													{day}
												</div>
											))}
										</div>

										{/* Calendar Grid */}
										<motion.div
											variants={containerVariants}
											initial="hidden"
											animate="visible"
											className="grid grid-cols-7 gap-1"
										>
											{calendarDays.map((day, index) => {
												const isSelected = selectedDate === day.value;
												const isDisabled = day.day === new Date().getDate() || day.isPast || !day.isCurrentMonth;

												return (
													<motion.div key={index} variants={itemVariants}>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => {
																if (!day.isPast && day.isCurrentMonth) {
																	handleDateSelect(day.value);
																}
															}}
															disabled={isDisabled}
															className={`w-full h-10 md:h-12 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer
																${!day.isCurrentMonth ? 'text-muted-foreground/30' : ''}
																${day.isPast ? 'text-muted-foreground/50' : ''}
																${isSelected
																	? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary'
																	: day.isToday && !isSelected
																		? 'ring-2 ring-stormy-teal bg-stormy-teal/10'
																		: 'hover:bg-muted hover:cursor-pointer'
																}
															`}
														>
															{day.day}
														</Button>
													</motion.div>
												);
											})}
										</motion.div>
									</div>

									{selectedDate && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="p-4 mt-4!  mx-auto! bg-primary/5 rounded-xl border border-primary/20"
										>
											<p className="text-sm text-primary font-medium flex items-center gap-2">
												<CheckCircle2 className="w-4 h-4" />
												Selected: {calendarDays.find((d) => d.value === selectedDate)?.display}
											</p>
										</motion.div>
									)}
								</CardContent>
							</Card>
						)}

						{/* Step 2: Location Selection */}
						{currentStep === 2 && (
							<Card className="h-full border-0 shadow-xl bg-card/80 backdrop-blur-sm">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-3 text-xl">
										<div className="p-2 rounded-xl bg-primary/10">
											<MapPin className="w-6 h-6 text-primary" />
										</div>
										Select Location
									</CardTitle>
									<CardDescription>
										Choose your preferred clinic branch
									</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col gap-4">
									<div className="relative">
										<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
										<Input
											type="text"
											placeholder="Search locations..."
											value={locationSearch}
											onChange={(e) => {
												setLocationSearch(e.target.value);
												setShowLocationDropdown(true);
											}}
											onFocus={() => setShowLocationDropdown(true)}
											className="pl-10 sm:pl-12 pr-3 sm:pr-4 h-10 sm:h-12 rounded-xl border-2 focus:border-primary"
										/>
									</div>

									<motion.div
										key="location-list"
										variants={containerVariants}
										animate="visible"
										className="grid gap-4"
									>
										{filteredLocations.map((location, index) => (
											<motion.div key={location.id} variants={itemVariants} animate="visible">
												<motion.button
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
													onClick={() => handleLocationSelect(location)}
													className={`w-full p-3 sm:p-4 md:p-5 rounded-2xl text-left transition-all duration-300
														${selectedLocation === location.id
															? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30'
															: 'bg-muted/50 hover:bg-muted border-2 border-transparent hover:border-primary/20'
														}
													`}
												>
													<div className="flex items-start gap-3 sm:gap-4">
														<div className={`p-2 sm:p-3 rounded-xl
															${selectedLocation === location.id
																? 'bg-white/20'
																: 'bg-primary/10'
															}
														`}>
															<MapPin className={`w-5 h-5 sm:w-6 sm:h-6 ${selectedLocation === location.id ? 'text-white' : 'text-primary'}`} />
														</div>
														<div className="flex-1">
															<h3 className="font-semibold text-base sm:text-lg">{location.name}</h3>
															<p className={`text-sm mt-1 ${selectedLocation === location.id ? 'text-white/80' : 'text-muted-foreground'}`}>
																{location.address}
															</p>
														</div>
														{selectedLocation === location.id && (
															<motion.div
																initial={{ scale: 0 }}
																animate={{ scale: 1 }}
																className="p-2 bg-white/20 rounded-full"
															>
																<Check className="w-5 h-5" />
															</motion.div>
														)}
													</div>
												</motion.button>
											</motion.div>
										))}
									</motion.div>
								</CardContent>
							</Card>
						)}

						{/* Step 3: Time Selection */}
						{currentStep === 3 && (
							<Card className="h-full border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-auto">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-3 text-xl">
										<div className="p-2 rounded-xl bg-primary/10">
											<Clock className="w-6 h-6 text-primary" />
										</div>
										Select Time Slot
									</CardTitle>
									<CardDescription>
										Choose your preferred appointment time
									</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col gap-6">
									{/* Morning Slots */}
									<div>
										<div className="flex items-center gap-2 mb-3">
											<div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
												<Sun className="w-4 h-4 text-amber-600" />
											</div>
											<span className="font-semibold">Morning Slots</span>
										</div>
										{morningTimes.length > 0 ? (
											<motion.div
												variants={containerVariants}
												initial="hidden"
												animate="visible"
												className="grid grid-cols-3 md:grid-cols-5 mt-3! gap-3"
											>
												{morningTimes.map((time) => (
													<motion.div key={`m-${time}`} variants={itemVariants}>
														<Button
															variant={selectedTime === time ? 'default' : 'outline'}
															onClick={() => handleTimeSelect(time)}
															className={`w-full h-12 rounded-xl font-medium transition-all cursor-pointer
																${selectedTime === time
																	? 'bg-primary shadow-lg shadow-primary/30'
																	: 'hover:border-primary hover:bg-primary/50 hover:cursor-pointer'
																}
															`}
														>
															{time}
														</Button>
													</motion.div>
												))}
											</motion.div>
										) : (
											<p className="text-sm text-muted-foreground italic p-3 bg-muted/50 rounded-xl">
												No morning slots available for this date
											</p>
										)}
									</div>

									{/* Afternoon Slots */}
									<div>
										<div className="flex items-center gap-2 mb-3">
											<div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
												<CloudSun className="w-4 h-4 text-blue-600" />
											</div>
											<span className="font-semibold">Afternoon Slots</span>
										</div>
										{afternoonTimes.length > 0 ? (
											<motion.div
												variants={containerVariants}
												initial="hidden"
												animate="visible"
												className="grid grid-cols-3 mt-3! md:grid-cols-5 gap-3"
											>
												{afternoonTimes.map((time) => (
													<motion.div key={`a-${time}`} variants={itemVariants}>
														<Button
															variant={selectedTime === time ? 'default' : 'outline'}
															onClick={() => handleTimeSelect(time)}
															className={`w-full h-12 rounded-xl font-medium transition-all cursor-pointer
																${selectedTime === time
																	? 'bg-primary shadow-lg shadow-primary/30'
																	: 'hover:border-primary hover:bg-primary/50 hover:cursor-pointer'
																}
															`}
														>
															{time}
														</Button>
													</motion.div>
												))}
											</motion.div>
										) : (
											<p className="text-sm text-muted-foreground italic p-3 bg-muted/50 rounded-xl">
												No afternoon slots available for this date
											</p>
										)}
									</div>

									{/* Evening Slots */}
									<div>
										<div className="flex items-center gap-2 mb-3!">
											<div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
												<Moon className="w-4 h-4 text-indigo-600" />
											</div>
											<span className="font-semibold">Evening Slots</span>
										</div>
										{eveningTimes.length > 0 ? (
											<motion.div
												variants={containerVariants}
												initial="hidden"
												animate="visible"
												className="grid grid-cols-3 mt-3! md:grid-cols-5 gap-3"
											>
												{eveningTimes.map((time) => (
													<motion.div key={`e-${time}`} variants={itemVariants}>
														<Button
															variant={selectedTime === time ? 'default' : 'outline'}
															onClick={() => handleTimeSelect(time)}
															className={`w-full h-12 rounded-xl font-medium transition-all cursor-pointer
																${selectedTime === time
																	? 'bg-primary shadow-lg shadow-primary/30'
																	: 'hover:border-primary hover:bg-primary/50 hover:cursor-pointer'
																}
															`}
														>
															{time}
														</Button>
													</motion.div>
												))}
											</motion.div>
										) : (
											<p className="text-sm text-muted-foreground italic p-3 bg-muted/50 rounded-xl">
												No evening slots available for this date
											</p>
										)}
									</div>

									{/* Status Notice */}
									{selectedTime && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
										>
											{isLoading ? (
												<div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-xl">
													<ClassicLoader className="h-6 w-6" />
													<span className="font-medium">Checking availability...</span>
												</div>
											) : waitingListCount === 0 ? (
												<div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
													<div className="flex items-center gap-3">
														<CheckCircle2 className="w-5 h-5 text-green-600" />
														<div>
															<p className="font-medium text-green-700 dark:text-green-400">Slot Available!</p>
															<p className="text-sm text-green-600 dark:text-green-500">This time slot is open for booking</p>
														</div>
													</div>
												</div>
											) : (
												<div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
													<div className="flex items-start gap-3">
														<AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
														<div>
															<p className="font-medium text-amber-700 dark:text-amber-400">Waiting List</p>
															<p className="text-sm text-amber-600 dark:text-amber-500">
																{waitingListCount} booking(s) already exist. You'll be added to the waiting list.
															</p>
														</div>
													</div>
												</div>
											)}
										</motion.div>
									)}
								</CardContent>
							</Card>
						)}

						{/* Step 4: Personal Information */}
						{currentStep === 4 && (
							<Card className="h-full border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-auto">
								<CardHeader className="pb-4">
									<CardTitle className="flex items-center gap-3 text-xl">
										<div className="p-2 rounded-xl bg-primary/10">
											<User className="w-6 h-6 text-primary" />
										</div>
										Personal Information
									</CardTitle>
									<CardDescription>
										Please provide your contact details
									</CardDescription>
								</CardHeader>
								<CardContent>
									<motion.div
										variants={containerVariants}
										initial="hidden"
										animate="visible"
										className="space-y-4!"
									>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<motion.div variants={itemVariants} className="space-y-2!">
												<Label htmlFor="name" className="text-sm font-medium">
													Full Name <span className="text-destructive">*</span>
												</Label>
												<Input
													id="name"
													type="text"
													placeholder="Enter your full name"
													value={formData.name}
													onChange={(e) => handleFormChange('name', e.target.value)}
													className="h-12 rounded-xl border-2 focus:border-primary"
													required
												/>
											</motion.div>
											<motion.div variants={itemVariants} className="space-y-2!">
												<Label htmlFor="email" className="text-sm font-medium">
													Email Address <span className="text-destructive">*</span>
												</Label>
												<Input
													id="email"
													type="email"
													placeholder="Enter your email"
													value={formData.email}
													onChange={(e) => handleFormChange('email', e.target.value)}
													className="h-12 rounded-xl border-2 focus:border-primary"
													required
												/>
											</motion.div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<motion.div variants={itemVariants} className="space-y-2!">
												<Label htmlFor="phone" className="text-sm font-medium">
													Phone Number <span className="text-destructive">*</span>
												</Label>
												<Input
													id="phone"
													type="tel"
													placeholder="Enter your phone number"
													value={formData.phone}
													onChange={(e) => handleFormChange('phone', e.target.value)}
													className="h-12 rounded-xl border-2 focus:border-primary"
													required
												/>
											</motion.div>
											<motion.div variants={itemVariants} className="space-y-2!">
												<Label htmlFor="referredBy" className="text-sm font-medium">
													Referred By
												</Label>
												<Input
													id="referredBy"
													type="text"
													placeholder="Optional"
													value={formData.referredBy}
													onChange={(e) => handleFormChange('referredBy', e.target.value)}
													className="h-12 rounded-xl border-2 focus:border-primary"
												/>
											</motion.div>
										</div>

										<motion.div variants={itemVariants} className="space-y-2!">
											<Label htmlFor="address" className="text-sm font-medium">
												Address <span className="text-destructive">*</span>
											</Label>
											<Input
												id="address"
												type="text"
												placeholder="Enter your full address"
												value={formData.address}
												onChange={(e) => handleFormChange('address', e.target.value)}
												className="h-12 rounded-xl border-2 focus:border-primary"
												required
											/>
										</motion.div>

										<motion.div variants={itemVariants} className="space-y-2!">
											<Label htmlFor="message" className="text-sm font-medium">
												Message (Optional)
											</Label>
											<textarea
												id="message"
												className="w-full p-3 min-h-[80px] border-2 rounded-xl focus:outline-none focus:border-primary resize-none bg-background"
												placeholder="Any additional notes for the doctor..."
												value={formData.message}
												onChange={(e) => handleFormChange('message', e.target.value)}
											/>
										</motion.div>
									</motion.div>
								</CardContent>
							</Card>
						)}

						{/* Step 5: Review and Confirm */}
						{currentStep === 5 && (
							<Card className="h-full border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-auto">
								<CardHeader className="pb-4!">
									<CardTitle className="flex items-center gap-3 text-xl">
										<div className="p-2 rounded-xl bg-primary/10">
											<Check className="w-6 h-6 text-primary" />
										</div>
										Review Your Booking
									</CardTitle>
									<CardDescription>
										Please verify all details before confirming
									</CardDescription>
								</CardHeader>
								<CardContent>
									<motion.div
										variants={containerVariants}
										initial="hidden"
										animate="visible"
										className="space-y-6!"
									>
										{/* Appointment Details */}
										<motion.div variants={itemVariants}>
											<h3 className="font-semibold mb-3! flex items-center gap-2">
												<Calendar className="w-4 h-4 text-primary" />
												Appointment Details
											</h3>
											<div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 space-y-3">
												<div className="flex justify-between items-center">
													<span className="text-muted-foreground">Location</span>
													<span className="font-medium">
														{locations.find((loc) => loc.id === selectedLocation)?.name}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-muted-foreground">Address</span>
													<span className="font-medium text-right max-w-[60%]">
														{locations.find((loc) => loc.id === selectedLocation)?.address}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-muted-foreground">Date</span>
													<span className="font-medium">
														{calendarDays.find((d) => d.value === selectedDate)?.display}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-muted-foreground">Time</span>
													<span className="font-medium">{selectedTime}</span>
												</div>
											</div>
										</motion.div>

										{/* Personal Information */}
										<motion.div variants={itemVariants}>
											<h3 className="font-semibold mb-3! flex items-center gap-2">
												<User className="w-4 h-4 text-primary" />
												Personal Information
											</h3>
											<div className="bg-muted/50 rounded-2xl p-4 space-y-3!">
												<div className="flex justify-between items-center">
													<span className="text-muted-foreground">Name</span>
													<span className="font-medium">{formData.name}</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-muted-foreground">Email</span>
													<span className="font-medium">{formData.email}</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-muted-foreground">Phone</span>
													<span className="font-medium">{formData.phone}</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-muted-foreground">Address</span>
													<span className="font-medium text-right max-w-[60%]">{formData.address}</span>
												</div>
												{formData.referredBy && (
													<div className="flex justify-between items-center">
														<span className="text-muted-foreground">Referred by</span>
														<span className="font-medium">{formData.referredBy}</span>
													</div>
												)}
											</div>
										</motion.div>
									</motion.div>
								</CardContent>
							</Card>
						)}
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation Buttons */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="flex justify-between items-center pt-4"
			>
				<Button
					variant="outline"
					onClick={handleBack}
					disabled={currentStep === 1}
					className="h-12 px-6 rounded-xl font-medium cursor-pointer"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					Back
				</Button>

				{currentStep < 5 ? (
					<Button
						variant="default"
						onClick={handleNext}
						disabled={!isStepValid(currentStep)}
						className="h-12 px-8 rounded-xl font-medium cursor-pointer"
					>
						Next
						<ArrowRight className="w-4 h-4 ml-2" />
					</Button>
				) : (
					<>
						<Script
							id="razorpay-checkout"
							src="https://checkout.razorpay.com/v1/checkout.js"
							strategy="afterInteractive"
						/>
						<Button
							variant="secondary"
							onClick={handleBooking}
							disabled={isLoading}
							className="h-12 px-8 rounded-xl font-medium cursor-pointer"
						>
							{isLoading ? (
								<span className="flex items-center gap-2">
									<motion.span
										animate={{ rotate: 360 }}
										transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
										className="w-5 h-5 border-2 border-current border-t-transparent rounded-full inline-block"
									/>
									Processing...
								</span>
							) : (
								<span className="flex items-center gap-2">
									<Check className="w-5 h-5" />
									Confirm Booking
								</span>
							)}
						</Button>
						<BookingModal
							oldBooking={previousBooking}
							newBooking={nextBooking}
							open={modalOpen}
							setOpen={setModalOpen}
						/>
					</>
				)}
			</motion.div>
		</div>
	);
};

export default BookingSystem;
