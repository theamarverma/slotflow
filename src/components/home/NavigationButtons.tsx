'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Script from 'next/script';

interface NavigationButtonsProps {
  currentStep: number;
  isStepValid: (step: number) => boolean;
  isLoading: boolean;
  onBack: () => void;
  onNext: () => void;
  onBooking: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  isStepValid,
  isLoading,
  onBack,
  onNext,
  onBooking,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex justify-between items-center pt-4"
    >
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 1}
        className="h-12 px-6 rounded-xl font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {currentStep < 5 ? (
        <Button
          variant="default"
          onClick={onNext}
          disabled={!isStepValid(currentStep)}
          className="h-12 px-8 rounded-xl font-medium cursor-pointer"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <>
          <Script
            id="razorpay-checkout"
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="afterInteractive"
          />
          <Button
            variant="secondary"
            onClick={onBooking}
            disabled={isLoading}
            className="h-12 px-8 rounded-xl font-medium cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-current border-t-transparent rounded-full inline-block"
                />
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Confirm Booking
              </span>
            )}
          </Button>
        </>
      )}
    </motion.div>
  );
};

export default NavigationButtons;
