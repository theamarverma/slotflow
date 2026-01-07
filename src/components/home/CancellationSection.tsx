'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { CancelModal } from '@/components/CancelModal';
import { XCircle, Calendar } from 'lucide-react';

export const CancellationSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section
            id="cancellation-section"
            className="py-20 md:py-28 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, rgba(22, 105, 122, 0.05) 0%, rgba(72, 159, 181, 0.05) 25%, rgba(130, 192, 204, 0.05) 50%, rgba(72, 159, 181, 0.05) 75%, rgba(22, 105, 122, 0.05) 100%)',
            }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-stormy-teal/20 to-pacific-blue/20 blur-2xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-pacific-blue/20 to-sky-blue-light/20 blur-2xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-sky-blue-light/20 to-stormy-teal/20 blur-2xl animate-pulse delay-500" />
            </div>

            <div className="container mx-auto! px-6 relative z-10">
                <div className=" mx-auto text-center">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 flex-col gap-4 flex"
                    >
                        <div className="inline-flex items-center self-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
                            <XCircle className="w-4 h-4 text-stormy-teal" />
                            <span className="text-sm font-medium text-gray-700 ">Cancellation Policy</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Need to Cancel Your Appointment?
                        </h2>
                        
                        <p className="text-lg text-gray-600 mb-8 mx-auto">
                            We understand that plans change. Our cancellation process is simple and hassle-free. 
                            Click the button below to cancel your booking instantly.
                        </p>
                    </motion.div>

                    {/* Cancellation Card */}
                    <div className='flex justify-center self-center pt-8'><motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card p-8 rounded-3xl border border-white/30 shadow-xl max-w-2xl mx-auto"
                        style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        <div className="flex flex-col items-center space-y-4!">
                            {/* Icon */}
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-stormy-teal to-pacific-blue flex items-center justify-center shadow-lg">
                                <Calendar className="w-10 h-10 text-white" />
                            </div>

                            {/* Content */}
                            <div className="text-center space-y-4">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    Quick & Easy Cancellation
                                </h3>
                                
                                <div className="space-y-3 text-gray-600">
                                    <p className="flex items-center justify-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        Cancel anytime up to 24 hours before your appointment
                                    </p>
                                    <p className="flex items-center justify-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        Instant confirmation via email
                                    </p>
                                    <p className="flex items-center justify-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        No cancellation fees
                                    </p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Button
                                onClick={openModal}
                                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <XCircle className="w-5 h-5 mr-2" />
                                Cancel My Appointment
                            </Button>

                            {/* Help Text */}
                            <p className="text-sm text-gray-500">
                                Need help? Contact{' '}
                                <a
                                    href="mailto:support@slotflow.com"
                                    className="text-stormy-teal hover:text-pacific-blue hover:underline font-medium"
                                >
                                    support@slotflow.com
                                </a>
                            </p>
                        </div>
                    </motion.div></div>
                </div>
            </div>

            {/* Cancel Modal */}
            <CancelModal isOpen={isModalOpen} onClose={closeModal} />
        </section>
    );
};

export default CancellationSection;
