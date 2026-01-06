import React from 'react';
import FaqAccordian from './_components/FaqAccordian';
import Banner from '../_components/global/Banner';
import { dentalServices } from './_utils/serviceData';
import ServiceCard from './_components/ServiceCard';
import DenturesDemo from './_components/ServiceCards';
import TreatmentCards from './_components/ServiceCards';

const page = () => {
	return (
		<>
			<Banner name="Services" />
			{/* <div>
				{dentalServices.map((svc) => (
					<ServiceCard
						key={svc.id}
						service={svc}
					/>
				))}
			</div> */}
			<TreatmentCards />
			<div className="grid grid-cols-2 px-40 pt-30">
				<FaqAccordian />
			</div>
		</>
	);
};

export default page;
