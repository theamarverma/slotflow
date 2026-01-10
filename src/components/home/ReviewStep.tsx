'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, Calendar, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Location {
  id: string;
  name: string;
  address: string;
}

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isPast: boolean;
  isToday: boolean;
  value: string;
  display: string;
  dayName: string;
}

interface FormData {
  name: string;
  address: string;
  email: string;
  phone: string;
  referredBy: string;
  message: string;
}

interface ReviewStepProps {
  selectedLocation: string;
  selectedDate: string;
  selectedTime: string;
  locations: Location[];
  calendarDays: CalendarDay[];
  formData: FormData;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  selectedLocation,
  selectedDate,
  selectedTime,
  locations,
  calendarDays,
  formData,
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

  const selectedLocationData = locations.find((loc) => loc.id === selectedLocation);
  const selectedDateData = calendarDays.find((d) => d.value === selectedDate);

  return (
    <Card className="h-full border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-auto">
      <CardHeader className="pb-4!">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-xl bg-primary/10">
            <Check className="w-6 h-6 text-primary" />
          </div>
          Review Your Booking
        </CardTitle>
        <CardDescription>
          Please verify all details before confirming
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6!"
        >
          {/* Appointment Details */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-3! flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Appointment Details
            </h3>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">
                  {selectedLocationData?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Address</span>
                <span className="font-medium text-right max-w-[60%]">
                  {selectedLocationData?.address}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {selectedDateData?.display}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-3! flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Personal Information
            </h3>
            <div className="bg-muted/50 rounded-2xl p-4 space-y-3!">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Address</span>
                <span className="font-medium text-right max-w-[60%]">{formData.address}</span>
              </div>
              {formData.referredBy && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Referred by</span>
                  <span className="font-medium">{formData.referredBy}</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ReviewStep;
