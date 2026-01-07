'use client';
import React, { useEffect, useState } from 'react';

export interface ChamberTabsProps {
	onChamberSelect: (data: {
		chamber: 'chamber1' | 'chamber2';
		timeSlot: 'morning' | 'evening' | 'afternoon' | null;
	}) => void;
	chamberHandle: (date: Date | undefined) => void;
	selected?: Date | undefined;
}

const ChamberTabs: React.FC<ChamberTabsProps> = ({
	onChamberSelect,
	chamberHandle,
	selected,
}) => {
	const [activeTab, setActiveTab] = useState<'chamber1' | 'chamber2'>(
		'chamber1'
	);
	const [chamber1Time, setChamber1Time] = useState<'morning' | 'evening'>(
		'morning'
	);
	const [chamber2Time, setChamber2Time] = useState<'afternoon' | 'evening'>(
		'afternoon'
	);

	const chamberData = {
		chamber1: {
			address:
				'29 Sri gopal Mallick lane, Kolkata 700012 (Near College Square)',
			timeSlots: ['morning', 'evening'],
			hasTimeSelection: true,
		},
		chamber2: {
			address: 'Vip Enclave, phase-2, Shop-A12, Raghunathpur, Kol 700059',
			hasTimeSelection: false,
		},
	};

	useEffect(() => {
		// console.log('chamber1Time before select', chamber1Time);
		onChamberSelect({
			chamber: activeTab,
			timeSlot: activeTab === 'chamber1' ? chamber1Time : chamber2Time,
		});
		// console.log(
		// 	'chamber1Time after select',
		// 	chamber1Time,
		// 	'chamber2Time',
		// 	chamber2Time
		// );
	}, [activeTab, chamber1Time, chamber2Time]);

	return (
		<div className="w-full">
			<h2 className="text-lg font-semibold mb-2">Select Chamber</h2>
			<div className="flex border-b">
				<button
					type="button"
					className={`flex-1 p-2 font-medium ${
						activeTab === 'chamber1'
							? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
							: 'text-gray-600'
					}`}
					onClick={() => {
						setActiveTab('chamber1');
						onChamberSelect({
							chamber: 'chamber1',
							timeSlot: null,
						});
						chamberHandle(selected);
					}}>
					Chamber I
				</button>
				<button
					type="button"
					className={`flex-1 p-2 font-medium ${
						activeTab === 'chamber2'
							? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
							: 'text-gray-600'
					}`}
					onClick={() => {
						setActiveTab('chamber2');
						onChamberSelect({
							chamber: 'chamber2',
							timeSlot: null,
						});
						chamberHandle(selected);
					}}>
					Chamber II
				</button>
			</div>

			<div className="mt-4">
				<div className="p-3 bg-blue-50 text-blue-700 font-semibold rounded">
					{chamberData[activeTab].address}
				</div>

				{activeTab === 'chamber1' && (
					<div className="mt-3">
						<label className="block text-sm font-medium mb-1">
							Select Time Slot:
						</label>
						<select
							defaultValue={'select time'}
							onChange={(e) => {
								const value = e.target.value as
									| 'morning'
									| 'evening';
								setChamber1Time(value);
								// console.log(
								// 	'chamber1Time from chamber select',
								// 	value
								// );
								chamberHandle(selected);
							}}
							className="w-full border rounded p-2">
							<option value="select time">Select Time</option>
							<option value="morning">Morning</option>
							<option value="evening">Evening</option>
						</select>
					</div>
				)}

				{activeTab === 'chamber2' && (
					<div className="mt-3">
						<label className="block text-sm font-medium mb-1">
							Select Time Slot:
						</label>
						<select
							defaultValue={'select time'}
							onChange={(e) => {
								const value = e.target.value as
									| 'afternoon'
									| 'evening';
								setChamber2Time(value);
								// console.log(
								// 	'chamber2Time from chamber select',
								// 	value
								// );
								chamberHandle(selected);
							}}
							className="w-full border rounded p-2">
							<option value="select time">Select Time</option>
							<option value="afternoon">Afternoon</option>
							<option value="evening">Evening</option>
						</select>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChamberTabs;
