'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { http } from '@/httpClient/httpClient';
import { XCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface CancellationFormData {
    name: string;
    email: string;
    bookingId: string;
}

export const CancellationSection: React.FC = () => {
    const [formData, setFormData] = useState<CancellationFormData>({
        name: '',
        email: '',
        bookingId: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const showResult = (
        icon: 'success' | 'error' | 'warning',
        title: string,
        text?: string
    ) => {
        Swal.fire({
            icon,
            title,
            text,
            confirmButtonText: 'OK',
        });
    };

    const handleInputChange = (field: keyof CancellationFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCancelBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.bookingId) {
            showResult('warning', 'Missing Information', 'Please fill in all required fields.');
            return;
        }

        try {
            setIsLoading(true);
            const trimmedBookingId = formData.bookingId.trim();

            const res = await http.delete(`bookings/${trimmedBookingId}/cancel`, {
                data: { email: formData.email.trim() },
            });

            showResult('success', 'Booking Cancelled', 'Your appointment has been successfully cancelled.');
            setFormData({ name: '', email: '', bookingId: '' });
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 404) {
                    showResult('error', 'Not Found', 'Booking ID not found!');
                } else if (status === 403) {
                    showResult('error', 'Mismatch', 'Email does not match the booking!');
                } else if (status >= 500) {
                    showResult('error', 'Server Error', 'Something went wrong. Please try again later.');
                } else {
                    showResult('error', 'Error', error.response.data?.message || 'Something went wrong!');
                }
            } else if (error.request) {
                showResult('error', 'Network Error', 'No response from server. Please check your connection.');
            } else {
                showResult('error', 'Error', error.message || 'Something went wrong!');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section
            id="cancellation-section"
            className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background"
        >
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-2 bg-destructive/10 text-destructive text-sm font-medium rounded-full mb-4">
                            <XCircle className="w-4 h-4 inline mr-2" />
                            Cancellation
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Need to Cancel Your Appointment?
                        </h2>
                        <p className="text-muted-foreground">
                            We understand plans change. Use the form below to cancel your booking.
                        </p>
                    </motion.div>

                    {/* Cancellation Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card p-8 rounded-2xl border border-border/50 shadow-lg"
                    >
                        {/* Instructions */}
                        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-amber-800 dark:text-amber-200">
                                    <p className="font-medium mb-1">Before you cancel:</p>
                                    <ul className="list-disc list-inside space-y-1 text-amber-700 dark:text-amber-300">
                                        <li>Enter the email used during booking</li>
                                        <li>Use the Booking ID from your confirmation email/SMS</li>
                                        <li>Cancellations cannot be undone</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleCancelBooking} className="space-y-6">
                            {/* Name Field (Optional) */}
                            <div className="space-y-2">
                                <Label htmlFor="cancel-name">Name (Optional)</Label>
                                <Input
                                    id="cancel-name"
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="h-12"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="cancel-email">
                                    Email <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="cancel-email"
                                    type="email"
                                    placeholder="Email used during booking"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                    className="h-12"
                                />
                            </div>

                            {/* Booking ID Field */}
                            <div className="space-y-2">
                                <Label htmlFor="cancel-booking-id">
                                    Booking ID <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="cancel-booking-id"
                                    type="text"
                                    placeholder="e.g., BK-123456"
                                    value={formData.bookingId}
                                    onChange={(e) => handleInputChange('bookingId', e.target.value)}
                                    required
                                    className="h-12"
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isLoading || !formData.email || !formData.bookingId}
                                className="w-full h-12 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold rounded-xl transition-all duration-300"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full inline-block"
                                        />
                                        Cancelling...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <XCircle className="w-5 h-5" />
                                        Cancel Appointment
                                    </span>
                                )}
                            </Button>
                        </form>

                        {/* Help text */}
                        <p className="text-center text-sm text-muted-foreground mt-6">
                            Need help? Contact us at{' '}
                            <a
                                href="mailto:support@32smile.com"
                                className="text-primary hover:underline"
                            >
                                support@32smile.com
                            </a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CancellationSection;
