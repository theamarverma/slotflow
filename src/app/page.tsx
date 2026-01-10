'use client';

import React from 'react';
import { motion } from 'motion/react';
import { HeroSection } from '../components/global/HeroSection';
import { FeaturesSection } from '../components/global/FeaturesSection';
import { CancellationSection } from '../components/home/CancellationSection';
import { Footer } from '../components/global/Footer';
import BookingSystem from '@/components/home/Stepper';

const LandingPage = () => {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<HeroSection />

			{/* Features Section */}
			<FeaturesSection />

			{/* Booking Section */}
			<section
				id="booking-section"
				className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/20 to-background"
			>
				<div className=" mx-auto flex flex-col w-full items-center px-4 sm:px-6">
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						{/* <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
							Book Your Visit
						</span> */}
						{/* <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
							Schedule Your Appointment
						</h2> */}

					</motion.div>

					{/* Stepper Component */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="w-full max-w-4xl lg:max-w-7xl mx-auto"
					>
						<div className="w-full bg-card rounded-3xl shadow-xl border border-border/50 overflow-hidden">
							<BookingSystem />
						</div>
					</motion.div>
				</div>
			</section>

			{/* Cancellation Section */}
			<CancellationSection />

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default LandingPage;
