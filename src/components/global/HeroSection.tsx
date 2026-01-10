'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Calendar, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { TextLogo } from './TextLogo';

interface HeroSectionProps {
    onBookNowClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookNowClick }) => {
    const scrollToBooking = () => {
        const bookingSection = document.getElementById('booking-section');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
        onBookNowClick?.();
    };

    return (
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#16697a]/10 via-[#489fb5]/5 to-white dark:from-[#16697a]/20 dark:via-[#489fb5]/10 dark:to-background" />

            {/* Decorative floating elements */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-cyan/10 rounded-full blur-3xl"
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-pacific-blue/10 rounded-full blur-3xl"
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-4 container mx-auto px-4 sm:px-6 text-center">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center mb-8"
                >
                    <Logo size="xl" className="mb-4" />
                    <TextLogo size="lg" showTagline={true} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    className="flex items-center justify-center gap-2 mb-6"
                >
                    <Sparkles className="w-5 h-5 text-stormy-teal" />
                    <span className="text-sm font-medium text-stormy-teal uppercase tracking-wider">
                        Easy Online Booking
                    </span>
                    <Sparkles className="w-5 h-5 text-stormy-teal" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stormy-teal mb-4"
                >
                    Schedule Your
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pacific-blue mb-8"
                >
                    Appointment Effortlessly
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    className="text-base sm:text-lg md:text-xl text-muted-foreground  mx-auto mb-8 sm:mb-10"
                >
                    Quick and easy scheduling in just a few steps. Choose your preferred
                    location, date, and time for a appointment.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
                >
                    <Button
                        size="lg"
                        variant="shimmer"
                        onClick={scrollToBooking}
                        className="group relative px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl w-full sm:w-auto"
                    >
                        <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Book Now
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => {
                            const featuresSection = document.getElementById('features-section');
                            featuresSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl border-2 hover:bg-muted/50 hover:text-primary-custom transition-all duration-300 w-full sm:w-auto"
                    >
                        Learn More
                    </Button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                    className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pt-4 mx-auto"
                >
                    {[
                        { value: '2', label: 'Locations' },
                        { value: '7', label: 'Days a Week' },
                        { value: '1000+', label: 'Happy Patients' },
                        { value: '5+', label: 'Years Experience' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
                    <motion.div
                        className="w-1.5 h-3 bg-muted-foreground/50 rounded-full mt-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
