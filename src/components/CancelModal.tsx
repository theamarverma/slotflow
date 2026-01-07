'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { http } from '@/httpClient/httpClient';
import { X, XCircle, Mail, User, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface CancelModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CancellationFormData {
    name: string;
    email: string;
    bookingId: string;
}

export const CancelModal: React.FC<CancelModalProps> = ({ isOpen, onClose }) => {
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
            onClose();
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

    const handleClose = () => {
        if (!isLoading) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{
                            background: 'linear-gradient(135deg, rgba(22, 105, 122, 0.1) 0%, rgba(72, 159, 181, 0.1) 25%, rgba(130, 192, 204, 0.1) 50%, rgba(72, 159, 181, 0.1) 75%, rgba(22, 105, 122, 0.1) 100%)',
                            backdropFilter: 'blur(8px)',
                        }}
                        onClick={handleClose}
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="relative w-full max-w-md gap-4 overflow-hidden rounded-3xl shadow-2xl"
                            style={{
                                background: 'rgba(255, 255, 255, 0.85)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Gradient Background Overlay */}
                            <div 
                                className="absolute inset-0 opacity-40"
                                style={{
                                    background: 'linear-gradient(135deg, #16697a 0%, #489fb5 25%, #82c0cc 50%, #489fb5 75%, #16697a 100%)',
                                }}
                            />
                            
                            {/* Content Container */}
                            <div className="relative z-10 p-8">
                                {/* Close Button */}
                                <button
                                    onClick={handleClose}
                                    disabled={isLoading}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <X className="w-5 h-5 text-gray-700" />
                                </button>

                                {/* Header */}
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-stormy-teal to-pacific-blue mb-4">
                                        <XCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        Cancel Appointment
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        We understand plans change. Fill in the details below to cancel your booking.
                                    </p>
                                </div>

                                {/* Instructions */}
                                <div className="mb-6 p-3 rounded-xl bg-amber-50/80 backdrop-blur-sm border border-amber-200/50">
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                        <div className="text-xs text-amber-800">
                                            <p className="font-medium mb-1">Before you cancel:</p>
                                            <ul className="list-disc list-inside space-y-0.5 text-amber-700">
                                                <li>Enter the email used during booking</li>
                                                <li>Use the Booking ID from confirmation</li>
                                                <li>Cancellations cannot be undone</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleCancelBooking} className="space-y-4!">
                                    {/* Name Field */}
                                    <div className="space-y-2!">
                                        <Label htmlFor="cancel-name" className="text-sm font-medium text-gray-700">
                                            Name (Optional)
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                id="cancel-name"
                                                type="text"
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="pl-10 h-11 bg-white/50 border-white/30 rounded-xl focus:border-stormy-teal focus:ring-stormy-teal/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-2!">
                                        <Label htmlFor="cancel-email" className="text-sm font-medium text-gray-700">
                                            Email <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                id="cancel-email"
                                                type="email"
                                                placeholder="Email used during booking"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                required
                                                className="pl-10 h-11 bg-white/50 border-white/30 rounded-xl focus:border-stormy-teal focus:ring-stormy-teal/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Booking ID Field */}
                                    <div className="space-y-2!">
                                        <Label htmlFor="cancel-booking-id" className="text-sm font-medium text-gray-700">
                                            Booking ID <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input
                                                id="cancel-booking-id"
                                                type="text"
                                                placeholder="e.g., BK-123456"
                                                value={formData.bookingId}
                                                onChange={(e) => handleInputChange('bookingId', e.target.value)}
                                                required
                                                className="pl-10 h-11 bg-white/50 border-white/30 rounded-xl focus:border-stormy-teal focus:ring-stormy-teal/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={isLoading || !formData.email || !formData.bookingId}
                                        className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                Cancelling...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <XCircle className="w-4 h-4" />
                                                Cancel Appointment
                                            </span>
                                        )}
                                    </Button>
                                </form>

                                {/* Help Text */}
                                <p className="text-center text-xs text-gray-600 mt-4">
                                    Need help? Contact{' '}
                                    <a
                                        href="mailto:support@slotflow.com"
                                        className="text-purple-600 hover:text-purple-700 hover:underline"
                                    >
                                        support@slotflow.com
                                    </a>
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CancelModal;
