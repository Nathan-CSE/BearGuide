import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const AmenitiesScreen = ({ route }) => {
  // const { location } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amenities</Text>
      {/* {location.amenities ? (
        location.amenities.map((amenity, index) => (
          <Text key={index}>{amenity}</Text>
        ))
      ) : (
        <Text>No amenities available.</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default AmenitiesScreen;
