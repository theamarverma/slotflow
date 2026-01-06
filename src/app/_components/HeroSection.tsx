'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Calendar, Sparkles } from 'lucide-react';

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
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-blue-950 dark:via-cyan-950 dark:to-background" />

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
                className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
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
            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex items-center justify-center gap-2 mb-6"
                >
                    <Sparkles className="w-5 h-5 text-cyan" />
                    <span className="text-sm font-medium text-cyan uppercase tracking-wider">
                        Your Smile, Our Priority
                    </span>
                    <Sparkles className="w-5 h-5 text-cyan" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                    className="text-5xl md:text-7xl font-bold text-foreground mb-4"
                >
                    Book Your
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent mb-8"
                >
                    Dental Appointment
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    className="text-lg md:text-xl text-muted-foreground  mx-auto mb-10"
                >
                    Quick and easy scheduling in just a few steps. Choose your preferred
                    location, date, and time for a brighter smile.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button
                        size="lg"
                        onClick={scrollToBooking}
                        className="group relative px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 btn-shimmer"
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
                        className="px-8 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-muted/50 transition-all duration-300"
                    >
                        Learn More
                    </Button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4  mx-auto"
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
                            <div className="text-3xl md:text-4xl font-bold text-primary">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
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
