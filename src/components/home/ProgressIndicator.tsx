'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, User, Check } from 'lucide-react';

interface StepInfo {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

interface ProgressIndicatorProps {
  currentStep: number;
  stepInfo: StepInfo[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, stepInfo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex justify-center"
    >
      <div className="flex items-center gap-0">
        {stepInfo.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;
          const Icon = step.icon;

          return (
            <React.Fragment key={stepNum}>
              <motion.div
                className="flex flex-col items-center "
              >
                <motion.div
                  className={`
                    relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
                    font-semibold transition-all duration-300 
                    ${isCompleted
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                      : isCurrent
                        ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }
                  `}
                  animate={{
                    scale: isCurrent ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isCurrent ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </motion.div>
                  ) : (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  )}
                </motion.div>
                <div className="mt-1 sm:mt-2! text-center hidden sm:block">
                  <p className={`text-xs font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.label}
                  </p>
                </div>
              </motion.div>

              {stepNum < stepInfo.length && (
                <div className="w-4 sm:w-6 md:w-8 lg:w-16 h-1 mx-0.5 sm:mx-1 rounded-full overflow-hidden bg-muted">
                  <motion.div
                    className="h-full bg-gradient-to-r from-stormy-teal to-pacific-blue"
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;
