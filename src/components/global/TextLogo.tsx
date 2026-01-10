'use client';

import React from 'react';
import { motion } from 'motion/react';

interface TextLogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    showTagline?: boolean;
}

export const TextLogo: React.FC<TextLogoProps> = ({ 
    size = 'md', 
    className = '',
    showTagline = false
}) => {
    const sizeClasses = {
        sm: 'text-2xl',
        md: 'text-3xl',
        lg: 'text-4xl',
        xl: 'text-5xl'
    };

    const taglineSizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`text-center ${className}`}
        >
            <div className="flex items-center justify-center gap-1">
                <motion.span 
                    className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-stormy-teal to-pacific-blue bg-clip-text text-transparent`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    Slot
                </motion.span>
                <motion.span 
                    className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-pacific-blue to-sky-blue-light bg-clip-text text-transparent`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    Flow
                </motion.span>
            </div>
            
            {showTagline && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={`${taglineSizeClasses[size]} text-muted-foreground mt-1 font-medium`}
                >
                    Scheduling, Simplified
                </motion.p>
            )}
        </motion.div>
    );
};

export default TextLogo;
