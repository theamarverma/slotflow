import React from 'react';

interface Detail {
	summary: string;
	items: string[];
}

interface CardData {
	title: string;
	definition: string;
	materials?: string;
	details: Detail[];
	footer?: string;
}

const cardData: CardData[] = [
	{
		title: 'Dentures',
		definition:
			'Removable prosthetic appliances that replace missing teeth in one or both jaws.',
		materials: 'Acrylic resin, nylon, metal alloys, porcelain.',
		details: [
			{
				summary: 'Types of Dentures',
				items: [
					'Full (Complete) – Replace an entire arch; may need adhesive.',
					'Partial – Replace several missing teeth; hooks onto natural teeth.',
					'Immediate – Placed immediately after extractions.',
					'Implant‑Retained (“Snap‑In”) – Removable; snaps onto implants.',
					'Implant‑Supported (“Hybrid”/Permanent) – Fixed; only removed by a dentist.',
				],
			},
		],
		footer: 'Average lifespan: 4–5 years.',
	},
	{
		title: 'Dental Fillings',
		definition:
			'Materials used to fill cavities, chips or cracks in teeth.',
		details: [
			{
				summary: 'Direct Fillings (one visit)',
				items: [
					'Amalgam (silver-colored; contains mercury mixed with silver, tin, zinc and copper)',
					'Composite Resin (tooth-colored; resin base with quartz, silica or glass)',
					'Glass Ionomer (tooth-colored; silica glass powder)',
				],
			},
			{
				summary: 'Indirect Fillings (lab-made)',
				items: [
					'Inlays & Onlays – Fit into existing tooth structure when damage is too extensive for direct fillings but not enough for a crown',
					'Gold Alloys – Gold-colored; gold mixed with other metals',
					'Porcelain – Tooth-colored; feldspar, quartz and kaolin',
				],
			},
		],
		footer: 'Longevity: 5–20 years depending on material and hygiene.',
	},
	{
		title: 'Impacted Wisdom Teeth',
		definition:
			'Third molars that become partially or fully trapped in gums or jawbone (ages 17–25).',
		details: [
			{
				summary: 'By Visibility',
				items: [
					'Non‑impacted – Fully erupted and visible',
					'Partially impacted – Partially through gum',
					'Fully impacted – Completely under gum and bone',
				],
			},
			{
				summary: 'By Tissue Type',
				items: [
					'Soft Tissue Impaction – Erupted through bone but not gum',
					'Hard Tissue Impaction – Covered by bone and gum',
				],
			},
		],
		footer: 'Treatment: Surgical extraction to prevent pain, decay or infection.',
	},
	{
		title: 'Root Canal',
		definition:
			'Endodontic treatment to remove infected tooth pulp and save the tooth.',
		details: [
			{
				summary: 'Symptoms & Indications',
				items: [
					'Persistent deep toothache, may radiate to jaw/face',
					'Pain on biting or pressure',
					'Swollen or tender gums',
					'Gum abscess or “pimple” with pus',
					'Discolored or loose tooth',
				],
			},
		],
		footer: 'Key Benefit: Painless under anesthesia; avoids extraction.',
	},
	{
		title: 'Teeth Cleaning & Prophylaxis',
		definition:
			'Preventive dental care removing plaque and tartar to protect against cavities and gum disease.',
		details: [
			{
				summary: 'Core Services',
				items: [
					'Dental Exam – Check for decay, gum disease and oral cancer',
					'X‑rays – Detect hidden decay or bone changes',
					'Ultrasonic Scaling & Hand Scaling – Remove tartar and calculus',
					'Polishing & Flossing – Remove stains and plaque buildup',
					'Fluoride Treatments & Sealants – Strengthen enamel (often for children)',
				],
			},
		],
		footer: 'Performed routinely every 6 months or as recommended.',
	},
	{
		title: 'Dental Implants',
		definition:
			'Surgically placed posts replacing missing tooth roots, supporting crowns, bridges or dentures.',
		details: [
			{
				summary: 'Parts of an Implant',
				items: [
					'Implant Post – Titanium or ceramic “root” anchored in bone',
					'Abutment – Connector between post and prosthetic',
					'Restoration – Crown, bridge or denture',
				],
			},
			{
				summary: 'Process Overview',
				items: [
					'Surgical placement of implant',
					'Healing period (osseointegration)',
					'Attachment of abutment and final restoration',
				],
			},
		],
		footer: 'Over 3 million placed annually in the U.S.; can last a lifetime with proper care.',
	},
];

const TreatmentCards: React.FC = () => (
	<div className="flex flex-wrap gap-6 md:p-6 justify-center pt-4">
		{cardData.map((card, idx) => (
			<article
				key={idx}
				className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden w-full sm:w-72">
				<header className="bg-blue-custom text-white px-4 py-2 text-lg font-bold">
					{card.title}
				</header>
				<div className="p-4 flex-1">
					<p className="mb-2">
						<span className="font-semibold">Definition:</span>{' '}
						{card.definition}
					</p>
					{card.materials && (
						<p className="mb-2">
							<span className="font-semibold">Materials:</span>{' '}
							{card.materials}
						</p>
					)}
					{card.details.map((detail, di) => (
						<details
							key={di}
							className="mb-3">
							<summary className="font-semibold cursor-pointer">
								{detail.summary}
							</summary>
							<ul className="list-disc list-inside ml-4 mt-1">
								{detail.items.map((item, ii) => (
									<li
										key={ii}
										className="text-sm leading-relaxed">
										{item}
									</li>
								))}
							</ul>
						</details>
					))}
				</div>
				{card.footer && (
					<footer className="bg-gray-200 px-4 py-2 text-sm text-gray-700">
						{card.footer}
					</footer>
				)}
			</article>
		))}
	</div>
);

export default TreatmentCards;
