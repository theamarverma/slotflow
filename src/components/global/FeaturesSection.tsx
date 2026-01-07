'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
    Calendar,
    MapPin,
    Clock,
    Mail,
    ListOrdered,
    XCircle,
} from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const features = [
    {
        icon: Calendar,
        title: 'Easy Online Booking',
        description:
            'Book your appointment in just a few clicks with our intuitive 5-step booking process.',
    },
    {
        icon: MapPin,
        title: 'Multiple Locations',
        description:
            'Choose from our convenient locations - College Square Branch or VIP Road Branch.',
    },
    {
        icon: Clock,
        title: 'Flexible Scheduling',
        description:
            'Morning and evening slots available to fit your busy schedule. Select what works for you.',
    },
    {
        icon: Mail,
        title: 'Email Confirmations',
        description:
            'Receive instant email confirmation with all your appointment details and booking ID.',
    },
    {
        icon: ListOrdered,
        title: 'Waiting List Support',
        description:
            'If slots are full, join the waiting list and get notified when a slot opens up.',
    },
    {
        icon: XCircle,
        title: 'Easy Cancellation',
        description:
            'Need to reschedule? Cancel your appointment easily with just your email and booking ID.',
    },
];

export const FeaturesSection: React.FC = () => {
    return (
        <section
            id="features-section"
            className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30"
        >
            <div className="container mx-auto flex flex-col gap-10 px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                        Why Choose Us
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold pt-8 text-foreground mb-4">
                        Everything You Need for
                        <br />
                        <span className="text-stormy-teal">
                            {' '}
                            Hassle-Free Booking
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground  mx-auto">
                        We've designed our booking system to make scheduling your dental
                        appointment as simple and stress-free as possible.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
