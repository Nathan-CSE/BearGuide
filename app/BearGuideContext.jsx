import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define initial structure for bearGuide
const initialBearGuide = {
  currentUserId: 1,
  locations: [
    {
      id: 0,
      coordinates: { long: -33.918900523094244, lat: 151.23102394496718 },
      address: 'Science Rd, Kensington NSW 2033',
      name: 'K17 Computer Science Building',
      amenities: [{ category: 'power', comment: 'Outlet Charging' }],
      capacity: 0,
      popularTimes: {
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
      },
      images: [
        'https://s3.studentvip.com.au/photos/front-view-174705-small.jpg',
        'https://s3.studentvip.com.au/photos/back-view-174604-small.jpg',
        'https://s3.studentvip.com.au/photos/side-view-174603-small.jpg',
      ],
      openingHours: { type: 1, data: {} },
      favourited: [1],
      description: 'Computer Science and Engineering',
      reviews: {
        summary: {
          accessibility: 4.2,
          cleanliness: 4.2,
          noisiness: 4.2,
          overall: 4.2,
        },
        list: [
          {
            id: 0,
            userId: 0,
            accessibility: 5,
            cleanliness: 5,
            noisiness: 5,
            overall: 5,
            comment: 'What an amazing building.',
          },
          {
            id: 1,
            userId: 1,
            accessibility: 5,
            cleanliness: 5,
            noisiness: 4,
            overall: 4.5,
            comment: 'Spectacular building, but it can get loud.',
          },
        ],
      },
    },
    // Modified location object to include address string, popular times and opening hours
    {
      id: 1,
      coordinates: { long: -33.918900523094244, lat: 151.23102394496718 },
      address: 'Science Rd, Kensington NSW 2033',
      name: 'Blockhouse G15',
      amenities: [{ category: 'power', comment: 'Outlet Charging' }],
      capacity: 50,
      // example hourly levels from 12 AM to 11 PM
      popularTimes: {
        monday: [
          0, 0, 0, 0, 1, 2, 4, 6, 7, 6, 5, 4, 3, 2, 3, 5, 7, 6, 5, 4, 3, 2, 1,
          0,
        ],
        tuesday: [
          0, 0, 0, 0, 1, 2, 4, 5, 6, 6, 5, 4, 3, 3, 4, 5, 6, 7, 5, 4, 3, 2, 1,
          0,
        ],
        wednesday: [
          0, 0, 0, 0, 1, 3, 4, 6, 7, 6, 5, 5, 4, 3, 4, 5, 6, 6, 5, 3, 2, 1, 1,
          0,
        ],
        thursday: [
          0, 0, 0, 0, 1, 2, 3, 5, 6, 6, 5, 4, 3, 4, 5, 5, 6, 6, 5, 4, 3, 2, 1,
          0,
        ],
        friday: [
          0, 0, 0, 0, 1, 2, 4, 6, 8, 8, 7, 5, 5, 6, 7, 8, 7, 6, 5, 3, 2, 1, 0,
          0,
        ],
        saturday: [
          0, 0, 0, 1, 2, 3, 5, 6, 7, 8, 8, 7, 6, 5, 4, 5, 6, 5, 4, 3, 2, 1, 0,
          0,
        ],
        sunday: [
          0, 0, 0, 1, 2, 3, 4, 5, 5, 6, 5, 4, 3, 4, 5, 5, 4, 4, 3, 2, 1, 0, 0,
          0,
        ],
      },
      images: [
        'https://s3.studentvip.com.au/photos/blockhouse-g6-opposite-tyree-bui-174303-small.jpg',
        'https://s3.studentvip.com.au/photos/blockhouse-g6-opposite-tyree-bui-174303-small.jpg',
        'https://s3.studentvip.com.au/photos/blockhouse-g6-opposite-tyree-bui-174303-small.jpg',
        'https://s3.studentvip.com.au/photos/blockhouse-g6-opposite-tyree-bui-174303-small.jpg',
      ],
      openingHours: {
        type: 1, // assuming 1 indicates regular weekly hours
        data: {
          monday: { open: '9:00 AM', close: '5:00 PM' },
          tuesday: { open: '9:00 AM', close: '5:00 PM' },
          wednesday: { open: '9:00 AM', close: '5:00 PM' },
          thursday: { open: '9:00 AM', close: '5:00 PM' },
          friday: { open: '9:00 AM', close: '5:00 PM' },
          saturday: { open: '10:00 AM', close: '3:00 PM' },
          sunday: { open: 'Closed', close: 'Closed' },
        },
      },
      favourited: [1],
      description:
        'The Blockhouse is home to several shops including Thoughtful Foods, Medibank and the UNSW Secondhand Book store and various rooms. Foundation studies take place inside the Blockhouse on levels 1 and 2 which is accessible from the back entrance near Roundhouse.',
      reviews: {
        summary: {
          accessibility: 4.2,
          cleanliness: 4.2,
          noisiness: 4.2,
          overall: 4.2,
        },
        list: [
          {
            id: 0,
            userId: 1,
            accessibility: 5,
            cleanliness: 5,
            noisiness: 5,
            overall: 5,
            comment: 'What an amazing building.',
          },
        ],
      },
    },
  ],
  users: [
    {
      id: 0,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'bearguide',
      faculty: 'Computer Science and Engineering',
      campus: 'UNSW Kensington',
      recents: [0], // Possibly related to search?
    },
    {
      id: 1,
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'bearguide',
      faculty: 'Computer Science and Engineering',
      campus: 'UNSW Kensington',
      recents: [1],
    },
  ],
};

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
