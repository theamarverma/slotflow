'use server';

import { parse, add, format } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

// --- Predefined time slots ---

// Chamber 1 slots
const SunToFriMorning = ['11:00', '11:30', '12:00', '12:30', '13:00'];
const MonToFriEvening = ['19:00', '19:30', '20:00', '20:30', '21:00'];
// Saturday closed

// Chamber 2 slots
const monAndWedAfternoon = [
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
];
const tueThufriSatEvening = ['17:30', '18:00', '18:30', '19:00', '19:30'];
// Sunday appointment only (no slots)

// --- Types ---
type Chamber = 1 | 2;
export type SlotType = 'morning' | 'evening' | 'afternoon';

// --- Build slots from predefined arrays only ---

/**
 * Converts each "HH:mm" slot in IST to a JS Date (UTC) for a given date and chamber.
 */
export const buildDateSlots = async (
	date: Date,
	chamber: Chamber,
	slotType?: string
): Promise<Date[]> => {
	const isoDay = format(date, 'yyyy-MM-dd'); // e.g. "2025-05-12"
	const day = format(date, 'eee'); // e.g. "Sat"
	// console.log('date recieved' + date);

	console.log('day recieved' + day);

	let availableSlots: string[] = [];

	// console.log('chamber all details' + chamber); got that
	// console.log(day);
	if (chamber === 1) {
		const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day);
		const isSun = day === 'Sun';
		console.log('slot type in chamber 1', slotType);
		if (slotType === 'morning' && (isWeekday || isSun)) {
			availableSlots = SunToFriMorning;
		} else if (slotType === 'evening' && isWeekday) {
			availableSlots = MonToFriEvening;
		} else {
			availableSlots = []; // No slots on Saturday or invalid combination
		}
	} else if (chamber === 2) {
		const isAfternoon = ['Mon', 'Wed'].includes(day);
		const isEvening = ['Tue', 'Thu', 'Fri', 'Sat'].includes(day);
		const isSun = day === 'Sun';

		switch (day) {
			case 'Mon':
			case 'Wed':
				availableSlots = isAfternoon ? monAndWedAfternoon : [];
				break;
			case 'Fri':
				availableSlots = isEvening ? tueThufriSatEvening : [];
				break;
			case 'Tue':
			case 'Thu':
			case 'Sat':
				availableSlots = isEvening ? tueThufriSatEvening : [];
				break;
			case 'Sun':
			default:
				availableSlots = []; // appointment-based or closed
				break;
		}
	}

	console.log('availableSlots', availableSlots);
	return availableSlots.map((slot) =>
		fromZonedTime(`${isoDay}T${slot}:00`, 'Asia/Kolkata')
	);
};

// --- Get available slots WITHOUT any API --- //

export const getAvailableSlots = async (
	date: string,
	chamber: 1 | 2,
	slotType?: 'morning' | 'evening' | string
): Promise<string[]> => {
	// Parse 'yyyyMMdd' date string
	const dayDate = parse(date, 'yyyyMMdd', new Date()); // Get all slots based on chamber/day/slotType arrays (no API call)

	const allSlotsUtc = await buildDateSlots(dayDate, chamber, slotType); // Return slots formatted in IST 'HH:mm' for UI

	return allSlotsUtc.map((slotUtc) => {
		const slotIst = toZonedTime(slotUtc, 'Asia/Kolkata');
		return format(slotIst, 'HH:mm');
	});
};
