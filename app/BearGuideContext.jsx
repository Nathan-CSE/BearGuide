import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define initial structure for bearGuide
const initialBearGuide = {
  locations: [
    {
      id: 0,
      coordinates: { long: 0, lat: 0 },
      name: "",
      reviews: {
        summary: { accessibility: 0, cleanliness: 0, noisiness: 0, overall: 0 },
        list: [
          {
            id: 0,
            accessibility: 0,
            cleanliness: 0,
            noisiness: 0,
            overall: 0,
            comment: ""
          }
        ],
        amenities: [{ category: "", comment: "" }],
        capacity: 0,
        popularTimes: {
          sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: []
        },
        images: ["<IMAGE URI>"],
        openingHours: { type: 0, data: {} },
        description: ""
      }
    }
  ],
  users: [
    {
      id: 0,
      name: "",
      email: "",
      password: "",
      faculty: "",
      campus: "",
      reviews: [{ locationId: 0, reviewId: 0 }],
      favourites: [0],
      recents: [0]
    }
  ]
};

// Async Storage key for the bearGuide data
const BEAR_GUIDE_STORAGE_KEY = '@bearGuide';

// Create the context
const BearGuideContext = createContext();

// Provider component to wrap around app or specific parts
export const BearGuideProvider = ({ children }) => {
  const [bearGuide, setBearGuide] = useState(initialBearGuide);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from Async Storage or use initial structure
  const loadBearGuideData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(BEAR_GUIDE_STORAGE_KEY);
      if (storedData !== null) {
        setBearGuide(JSON.parse(storedData));
      } else {
        setBearGuide(initialBearGuide); // If no data, use default
      }
    } catch (error) {
      console.error("Failed to load bear guide data:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  // Save data to Async Storage whenever it changes
  useEffect(() => {
    const saveBearGuideData = async () => {
      try {
        await AsyncStorage.setItem(BEAR_GUIDE_STORAGE_KEY, JSON.stringify(bearGuide));
      } catch (error) {
        console.error("Failed to save bear guide data:", error);
      }
    };
    if (isLoaded) {
      saveBearGuideData();
    }
  }, [bearGuide, isLoaded]);

  // Load the data when the component mounts
  useEffect(() => {
    loadBearGuideData();
  }, []);

  {/* Only render children once data is loaded */}
  return (
    <BearGuideContext.Provider value={{ bearGuide, setBearGuide }}>
      {isLoaded ? children : null} 
    </BearGuideContext.Provider>
  );
};

// Custom hook for using the context
export const useBearGuide = () => useContext(BearGuideContext);
