'use client';

import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface FormData {
  name: string;
  address: string;
  email: string;
  phone: string;
  referredBy: string;
  message: string;
}

interface PersonalInfoStepProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  onFormChange,
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
    <Card className="h-full border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-xl bg-primary/10">
            <User className="w-6 h-6 text-primary" />
          </div>
          Personal Information
        </CardTitle>
        <CardDescription>
          Please provide your contact details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4!"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="space-y-2!">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => onFormChange('name', e.target.value)}
                className="h-12 rounded-xl border-2 focus:border-primary"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-2!">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => onFormChange('email', e.target.value)}
                className="h-12 rounded-xl border-2 focus:border-primary"
                required
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="space-y-2!">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => onFormChange('phone', e.target.value)}
                className="h-12 rounded-xl border-2 focus:border-primary"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-2!">
              <Label htmlFor="referredBy" className="text-sm font-medium">
                Referred By
              </Label>
              <Input
                id="referredBy"
                type="text"
                placeholder="Optional"
                value={formData.referredBy}
                onChange={(e) => onFormChange('referredBy', e.target.value)}
                className="h-12 rounded-xl border-2 focus:border-primary"
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-2!">
            <Label htmlFor="address" className="text-sm font-medium">
              Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={(e) => onFormChange('address', e.target.value)}
              className="h-12 rounded-xl border-2 focus:border-primary"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2!">
            <Label htmlFor="message" className="text-sm font-medium">
              Message (Optional)
            </Label>
            <textarea
              id="message"
              className="w-full p-3 min-h-[80px] border-2 rounded-xl focus:outline-none focus:border-primary resize-none bg-background"
              placeholder="Any additional notes for the doctor..."
              value={formData.message}
              onChange={(e) => onFormChange('message', e.target.value)}
            />
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoStep;
