'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Clock, Sun, CloudSun, Moon, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ClassicLoader from './ClassicLoader';

interface TimeSelectionStepProps {
  selectedTime: string;
  morningTimes: string[];
  afternoonTimes: string[];
  eveningTimes: string[];
  waitingListCount: number;
  isLoading: boolean;
  onTimeSelect: (time: string) => Promise<void>;
}

const TimeSelectionStep: React.FC<TimeSelectionStepProps> = ({
  selectedTime,
  morningTimes,
  afternoonTimes,
  eveningTimes,
  waitingListCount,
  isLoading,
  onTimeSelect,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const TimeSlotGroup: React.FC<{
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClassName: string;
    times: string[];
  }> = ({ title, icon: Icon, iconClassName, times }) => (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-1.5 rounded-lg ${iconClassName}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-semibold">{title}</span>
      </div>
      {times.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 md:grid-cols-5 mt-3! gap-3"
        >
          {times.map((time) => (
            <motion.div key={`${title}-${time}`} variants={itemVariants}>
              <Button
                variant={selectedTime === time ? 'default' : 'outline'}
                onClick={() => onTimeSelect(time)}
                className={`w-full h-12 rounded-xl font-medium transition-all cursor-pointer
                  ${selectedTime === time
                    ? 'bg-primary shadow-lg shadow-primary/30'
                    : 'hover:border-primary hover:bg-primary/50 hover:cursor-pointer'
                  }
                `}
              >
                {time}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-sm text-muted-foreground italic p-3 bg-muted/50 rounded-xl">
          No {title.toLowerCase()} slots available for this date
        </p>
      )}
    </div>
  );

  return (
    <Card className="h-full border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-xl bg-primary/10">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          Select Time Slot
        </CardTitle>
        <CardDescription>
          Choose your preferred appointment time
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Morning Slots */}
        <TimeSlotGroup
          title="Morning Slots"
          icon={Sun}
          iconClassName="bg-amber-100 dark:bg-amber-900/30"
          times={morningTimes}
        />

        {/* Afternoon Slots */}
        <TimeSlotGroup
          title="Afternoon Slots"
          icon={CloudSun}
          iconClassName="bg-blue-100 dark:bg-blue-900/30"
          times={afternoonTimes}
        />

        {/* Evening Slots */}
        <TimeSlotGroup
          title="Evening Slots"
          icon={Moon}
          iconClassName="bg-indigo-100 dark:bg-indigo-900/30"
          times={eveningTimes}
        />

        {/* Status Notice */}
        {selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-xl">
                <ClassicLoader className="h-6 w-6" />
                <span className="font-medium">Checking availability...</span>
              </div>
            ) : waitingListCount === 0 ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-400">Slot Available!</p>
                    <p className="text-sm text-green-600 dark:text-green-500">This time slot is open for booking</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-700 dark:text-amber-400">Waiting List</p>
                    <p className="text-sm text-amber-600 dark:text-amber-500">
                      {waitingListCount} booking(s) already exist. You'll be added to the waiting list.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeSelectionStep;
