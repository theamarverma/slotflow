'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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

interface DateSelectionStepProps {
  selectedDate: string;
  currentMonth: Date;
  calendarDays: CalendarDay[];
  monthName: string;
  onDateSelect: (date: string) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const DateSelectionStep: React.FC<DateSelectionStepProps> = ({
  selectedDate,
  currentMonth,
  calendarDays,
  monthName,
  onDateSelect,
  onPreviousMonth,
  onNextMonth,
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

  return (
    <Card className="h-full border-0 shadow-xl bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-xl bg-primary/10">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          Select Your Preferred Date
        </CardTitle>
        <CardDescription>
          Choose a date for your appointment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 rounded-2xl p-4 md:p-6">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-6!">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPreviousMonth}
              className="hover:bg-primary/10  rounded-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h3 className="text-lg font-bold text-foreground">
              {monthName}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNextMonth}
              className="hover:bg-primary/10 rounded-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 mb-3!">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-muted-foreground py-2!"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-7 gap-1"
          >
            {calendarDays.map((day, index) => {
              const isSelected = selectedDate === day.value;
              const isDisabled = day.day === new Date().getDate() || day.isPast || !day.isCurrentMonth;

              return (
                <motion.div key={index} variants={itemVariants}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (!day.isPast && day.isCurrentMonth) {
                        onDateSelect(day.value);
                      }
                    }}
                    disabled={isDisabled}
                    className={`w-full h-10 md:h-12 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer
                      ${!day.isCurrentMonth ? 'text-muted-foreground/30' : ''}
                      ${day.isPast ? 'text-muted-foreground/50' : ''}
                      ${isSelected
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary'
                        : day.isToday && !isSelected
                          ? 'ring-2 ring-stormy-teal bg-stormy-teal/10'
                          : 'hover:bg-muted hover:cursor-pointer'
                      }
                    `}
                  >
                    {day.day}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mt-4!  mx-auto! bg-primary/5 rounded-xl border border-primary/20"
          >
            <p className="text-sm text-primary font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Selected: {calendarDays.find((d) => d.value === selectedDate)?.display}
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default DateSelectionStep;
