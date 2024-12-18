import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BearGuideSample from '../constants/BearGuideSample.json';

// Define initial structure for bearGuide
const initialBearGuide = BearGuideSample;

// Async Storage key for the bearGuide data
const BEAR_GUIDE_STORAGE_KEY = '@bearGuide';

// Create the context
const BearGuideContext = createContext();

// Provider component to wrap around app or specific parts
export const BearGuideProvider = ({ children }) => {
  const [bearGuide, setBearGuide] = useState(initialBearGuide);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset async storage to initial state
  const resetData = async () => {
    try {
      // Set in-memory data to the initial state
      setBearGuide(initialBearGuide);
    } catch (e) {
      console.warn('Error with resetting data: ', e);
      return;
    }

    console.debug('Reset Bear Guide Data to inital state.');
  };

  // Dump local storage data
  const dumpData = () => {
    console.debug(bearGuide);
  };

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
      console.error('Failed to load bear guide data:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  // Save data to Async Storage whenever it changes
  useEffect(() => {
    const saveBearGuideData = async () => {
      try {
        await AsyncStorage.setItem(
          BEAR_GUIDE_STORAGE_KEY,
          JSON.stringify(bearGuide)
        );
      } catch (error) {
        console.error('Failed to save bear guide data:', error);
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

  {
    /* Only render children once data is loaded */
  }
  return (
    <BearGuideContext.Provider
      value={{
        bearGuide,
        setBearGuide,
        tools: {
          resetData,
          dumpData,
        },
      }}
    >
      {isLoaded ? children : null}
    </BearGuideContext.Provider>
  );
};

// Custom hook for using the context
export const useBearGuide = () => useContext(BearGuideContext);
