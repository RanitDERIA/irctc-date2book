import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // Theme management
      theme: 'light',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),

      // Booking data
      journeyDate: null,
      bookingDate: null,
      daysUntilBooking: null,

      // Actions
      setBookingData: (data) => set(data),
      clearBookingData: () => set({ 
        journeyDate: null, 
        bookingDate: null, 
        daysUntilBooking: null 
      }),
    }),
    {
      name: 'irctc-calculator-storage',
    }
  )
);