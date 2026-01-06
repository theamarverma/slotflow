'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
    icon: Icon,
    title,
    description,
    index = 0,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative p-6 md:p-8 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
                {/* Icon */}
                <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-cyan/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                >
                    <Icon className="w-7 h-7 text-primary" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-2xl rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
};

export default FeatureCard;
