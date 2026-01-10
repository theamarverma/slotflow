'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
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

interface LocationSelectionStepProps {
  selectedLocation: string;
  locationSearch: string;
  filteredLocations: Location[];
  onLocationSelect: (location: Location) => void;
  onLocationSearchChange: (value: string) => void;
  onLocationDropdownFocus: () => void;
  onLocationDropdownBlur: () => void;
  showLocationDropdown: boolean;
}

const LocationSelectionStep: React.FC<LocationSelectionStepProps> = ({
  selectedLocation,
  locationSearch,
  filteredLocations,
  onLocationSelect,
  onLocationSearchChange,
  onLocationDropdownFocus,
  onLocationDropdownBlur,
  showLocationDropdown,
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
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          Select Location
        </CardTitle>
        <CardDescription>
          Choose your preferred clinic branch
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search locations..."
            value={locationSearch}
            onChange={(e) => onLocationSearchChange(e.target.value)}
            onFocus={onLocationDropdownFocus}
            onBlur={onLocationDropdownBlur}
            className="pl-10 sm:pl-12 pr-3 sm:pr-4 h-10 sm:h-12 rounded-xl border-2 focus:border-primary"
          />
        </div>

        <motion.div
          key="location-list"
          variants={containerVariants}
          animate="visible"
          className="grid gap-4"
        >
          {filteredLocations.map((location) => (
            <motion.div key={location.id} variants={itemVariants} animate="visible">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onLocationSelect(location)}
                className={`w-full p-3 sm:p-4 md:p-5 rounded-2xl text-left transition-all duration-300
                  ${selectedLocation === location.id
                    ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-muted/50 hover:bg-muted border-2 border-transparent hover:border-primary/20'
                  }
                `}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 rounded-xl
                    ${selectedLocation === location.id
                      ? 'bg-white/20'
                      : 'bg-primary/10'
                    }
                  `}>
                    <MapPin className={`w-5 h-5 sm:w-6 sm:h-6 ${selectedLocation === location.id ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg">{location.name}</h3>
                    <p className={`text-sm mt-1 ${selectedLocation === location.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {location.address}
                    </p>
                  </div>
                  {selectedLocation === location.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="p-2 bg-white/20 rounded-full"
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default LocationSelectionStep;
