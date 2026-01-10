'use client';

import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
    size = 'md', 
    className = '' 
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            className={`${sizeClasses[size]} ${className}`}
        >
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Background circle with gradient */}
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#16697a" />
                        <stop offset="100%" stopColor="#489fb5" />
                    </linearGradient>
                    <linearGradient id="slotGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#82c0cc" />
                        <stop offset="100%" stopColor="#489fb5" />
                    </linearGradient>
                </defs>
                
                {/* Main circle background */}
                <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="url(#logoGradient)" 
                    opacity="0.1"
                />
                
                {/* Calendar/Slot representation */}
                <rect 
                    x="20" 
                    y="25" 
                    width="60" 
                    height="50" 
                    rx="8" 
                    fill="url(#logoGradient)"
                />
                
                {/* Calendar slots */}
                <rect 
                    x="28" 
                    y="33" 
                    width="44" 
                    height="34" 
                    rx="4" 
                    fill="white"
                />
                
                {/* Time slots grid */}
                <rect x="32" y="37" width="8" height="6" rx="2" fill="url(#slotGradient)" />
                <rect x="44" y="37" width="8" height="6" rx="2" fill="url(#slotGradient)" />
                <rect x="56" y="37" width="8" height="6" rx="2" fill="url(#slotGradient)" />
                
                <rect x="32" y="46" width="8" height="6" rx="2" fill="url(#slotGradient)" />
                <rect x="44" y="46" width="8" height="6" rx="2" fill="url(#slotGradient)" />
                <rect x="56" y="46" width="8" height="6" rx="2" fill="url(#slotGradient)" />
                
                <rect x="32" y="55" width="8" height="6" rx="2" fill="url(#slotGradient)" />
                <rect x="44" y="55" width="8" height="6" rx="2" fill="url(#slotGradient)" />
                <rect x="56" y="55" width="8" height="6" rx="2" fill="url(#slotGradient)" />
                
                {/* Flow arrow */}
                <path 
                    d="M 65 15 L 75 15 L 72 12 M 75 15 L 72 18" 
                    stroke="url(#logoGradient)" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
        </motion.div>
    );
};

export default Logo;
