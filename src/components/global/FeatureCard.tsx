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
    const colors = [
        'border-stormy-teal text-stormy-teal bg-stormy-teal/10',
        'border-pacific-blue text-pacific-blue bg-pacific-blue/10',
        'border-sky-blue-light text-sky-blue-light bg-sky-blue-light/10',
        'border-parchment text-stormy-teal bg-parchment/10',
    ];
    const colorClass = colors[index % colors.length];
    const [borderClass, textClass, bgClass] = colorClass!.split(' ');

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
            className="group relative p-4 sm:p-6 lg:p-8 bg-card rounded-2xl border-2 ${borderClass} shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* Minimal overlay on hover */}
            <div className={`absolute inset-0 ${bgClass} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />

            <div className="relative z-10">
                {/* Icon */}
                <motion.div
                    className={`w-12 h-12 sm:w-14 sm:h-16 lg:w-16 lg:h-16 rounded-xl ${bgClass} flex items-center justify-center mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${textClass}`} />
                </motion.div>

                {/* Title */}
                <h3 className={`text-lg sm:text-xl font-semibold text-foreground mb-3 group-hover:${textClass} transition-colors duration-300`}>
                    {title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Decorative corner accent */}
            <div className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${bgClass} rounded-tr-2xl rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </motion.div>
    );
};

export default FeatureCard;
