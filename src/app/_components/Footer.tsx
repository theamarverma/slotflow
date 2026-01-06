'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const locations = [
    {
        name: 'College Square Branch',
        address: '29, Shreegopal Mullick Ln, Newland, College Square',
        hours: 'Sun-Fri: 11:00 AM - 1:00 PM & 7:00 PM - 9:00 PM',
        note: 'Closed on Saturdays',
    },
    {
        name: 'VIP Road Branch',
        address: 'LOHARUKA GREEN LEAF, 3, VIP Rd',
        hours: 'Mon-Sat: Various slots available',
        note: 'Sunday by appointment only',
    },
];

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-background to-muted/50 border-t border-border/50">
            <div className="container mx-auto px-6 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                            <span className="text-stormy-teal">
                                SlotFlow
                            </span>
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Let Us Brighten Your Smile. Quality dental care with modern
                            technology and compassionate service.
                        </p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <a
                                href="mailto:info@slotflow.com"
                                className="hover:text-primary transition-colors"
                            >
                                info@slotflow.com
                            </a>
                        </div>
                    </motion.div>

                    {/* Location 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            {locations[0]!.name}
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>{locations[0]!.address}</p>
                            <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p>{locations[0]!.hours}</p>
                                    <p className="text-amber-600 dark:text-amber-400 text-xs mt-1">
                                        {locations[0]!.note}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Location 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            {locations[1]!.name}
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>{locations[1]!.address}</p>
                            <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p>{locations[1]!.hours}</p>
                                    <p className="text-pacific-blue dark:text-pacific-blue text-xs mt-1">
                                        {locations[1]!.note}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                { label: 'Book Appointment', href: '#booking-section' },
                                { label: 'Our Features', href: '#features-section' },
                                { label: 'Cancel Booking', href: '#cancellation-section' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="border-t border-border/50 my-10" />

                {/* Bottom Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
                >
                    <p>© {currentYear} SlotFlow. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
