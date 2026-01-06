import React from 'react';

// Define the structure for each detail section
interface DetailSection {
	title: string;
	items: string[];
}

// Define the service prop structure
export interface Service {
	id: string;
	name: string;
	overview: string;
	details: DetailSection[];
}

interface ServiceCardProps {
	service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
	return (
		<div className="border rounded-lg shadow-md p-6 bg-white">
			<h2 className="text-xl font-semibold mb-2">{service.name}</h2>
			<p className="text-gray-700 mb-4">{service.overview}</p>

			{service.details.map((section, idx) => (
				<div
					key={idx}
					className="mb-4">
					<h3 className="text-lg font-medium mb-1">
						{section.title}
					</h3>
					<ul className="list-disc list-inside text-gray-600">
						{section.items.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default ServiceCard;
