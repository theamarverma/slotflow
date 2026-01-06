import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqDataItem {
	id: string;
	title: string;
	content: string;
}

const FaqAccordian = () => {
	const faqItems: FaqDataItem[] = [
		{
			id: 'item-1',
			title: 'How Often Should I Get a Dental Checkup?',
			content:
				'Dental health varies from person to person; a general rule for adult patients is to visit a dentist once or twice a year, even if your mouth is in excellent condition. This way, you can get your teeth professionally cleaned regularly and maintain excellent oral health.',
		},
		{
			id: 'item-2',
			title: 'What Are the Best Ways to Practice Good Oral Hygiene at Home?',
			content:
				'In addition to daily brushing and flossing, take your oral hygiene to the next level by following a few steps to good dental health. These include:Using products that contain fluoride.Limiting snacks that are high in sugar.Eating a balanced diet of fruits and vegetables.Avoiding tobacco in any form.',
		},
		{
			id: 'item-3',
			title: 'How Can I Improve the Whiteness of My Teeth?',
			content:
				'A beautiful smile with clean, white teeth is a huge confidence booster. Most people experience some discoloration of teeth over the years, either from surface stains or internal ones. Treat stains caused by coffee, wine, tobacco, and pigmented foods with at-home whitening or have professional, in-office whitening done regularly. For internal discoloration, consider composite bonding or the application of veneers to the affected teeth, which provides a more permanent solution.',
		},
		{
			id: 'item-4',
			title: 'How Do I Prevent Tooth Decay, Gingivitis, and Other Problems?',
			content:
				'The best way to ensure a healthy mouth is to follow a balanced diet and regularly visit the dentist while maintaining your oral care routine with twice-daily brushing and once-daily flossing. Protect yourself against problems that can advance quickly by discussing these questions with your dental professional.',
		},
		{
			id: 'item-5',
			title: 'Should I Use Mouthwash Regularly?',
			content:
				'It depends - there are different kinds of mouthwash. Cosmetic mouthwashes aim to freshen breath and to maintain a healthy teeth color, but they contain fluoride to help fight cavities as well. Therapeutic rinses work to help treat conditions such as gingivitis, tooth sensitivity, and inflammation. For more advanced conditions, prescription mouthwashes often contain chlorhexidine gluconate to kill bacteria that cause bleeding, inflammation, and plaque or biofilm formation.',
		},
		{
			id: 'item-6',
			title: 'At What Age Should My Child First See a Dentist?',
			content:
				"Studies show children can develop their first cavities by two years old, so the American Academy of Pediatric Dentistry recommends booking the first visit once their first tooth appears – or, at the latest, their first birthday. This helps your dentist catch potential problems that can affect your child's overall health and well-being as more teeth grow in overtime.",
		},
	];

	return (
		<div>
			<div>
				<div className="flex flex-col md:flex-row gap-6 pt-4">
					<Accordion
						type="single"
						collapsible
						className="w-full md:w-1/2 flex flex-col gap-6" // Each Accordion takes half width on md and up
					>
						{faqItems.slice(0, 3).map((item) => (
							<AccordionItem
								className="border border-gray-500 bg-blue-custom text-white p-3 rounded-xl px-6 shadow-md"
								key={item.id}
								value={item.id}>
								<AccordionTrigger className="font-semibold text-lg text-white hover:no-underline data-[state=open]:text-blue-200">
									{item.title}
								</AccordionTrigger>
								<AccordionContent>
									<p className="text-blue-100 mt-2">
										{item.content}
									</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>

					{/* Second Column for Accordion Items (3-5) */}
					<Accordion
						type="single"
						collapsible
						className="w-full  md:w-1/2  flex flex-col gap-6 mt-6 md:mt-0" // Add top margin for mobile, reset for desktop
					>
						{faqItems.slice(3, 6).map((item) => (
							<AccordionItem
								className="border border-gray-500 bg-blue-custom text-white p-3 rounded-xl px-6 shadow-md"
								key={item.id}
								value={item.id}>
								<AccordionTrigger className="font-semibold text-lg text-white hover:no-underline data-[state=open]:text-blue-200">
									{item.title}
								</AccordionTrigger>
								<AccordionContent>
									<p className="text-blue-100 mt-2">
										{item.content}
									</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
};

export default FaqAccordian;
