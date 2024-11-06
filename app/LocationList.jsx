import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native';
import { useBearGuide } from './BearGuideContext';

const LocationList = () => {
  const { bearGuide, setBearGuide, tools } = useBearGuide();
  
  const addLocation = () => {
    const newLocation = {
      id: bearGuide.locations.length, // or a unique ID
      coordinates: { long: 10, lat: 20 },
      name: "New Location",
      reviews: {
        summary: { accessibility: 0, cleanliness: 0, noisiness: 0, overall: 0 },
        list: [],
        amenities: [],
        capacity: 0,
        popularTimes: { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [] },
        images: [],
        openingHours: { type: 0, data: {} },
        description: ""
      }
    };

    // Update the bearGuide with the new location
    setBearGuide((prev) => ({
      ...prev,
      locations: [...prev.locations, newLocation]
    }));
  };

  
  return (
    <View>
      <Button title="Add Location" onPress={addLocation} />
      <Button title="Reset Data" onPress={tools.resetData} />
      <Button title="Dump Data" onPress={tools.dumpData} />

      {bearGuide.locations.map((location) => (
        <View key={location.id}>
          <Text>Name: {location.name}</Text>
          <Text>Coordinates: Long: {location.coordinates.long}, Lat: {location.coordinates.lat}</Text>
          {/* Render more location details if needed */}
        </View>
      ))}
    </View>
  );
};

export default LocationList;
