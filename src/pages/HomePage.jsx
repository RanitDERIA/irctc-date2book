import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import HeroSection from '../components/sections/HeroSection';
import CalculatorCard from '../components/sections/CalculatorCard';

const HomePage = ({ navigate }) => {
  const { clearBookingData } = useStore();

  useEffect(() => {
    clearBookingData();
  }, [clearBookingData]);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <HeroSection />
      <CalculatorCard navigate={navigate} />
    </div>
  );
};

export default HomePage;
