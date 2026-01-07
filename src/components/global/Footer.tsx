'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Github } from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border/30">
            <div className="container mx-auto! px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center text-center"
                >
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                        <span>by</span>
                        <a
                        href="https://github.com/theamarverma"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
                    >
                        <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">theamarverma</span>
                    </a>
                    </div>
                    
                    
                    
                    <p className="text-xs text-muted-foreground mt-4">
                        © {currentYear} SlotFlow. Built with passion for seamless booking.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
