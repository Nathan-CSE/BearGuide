import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useBearGuide } from '../BearGuideContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AmenitiesScreen = ({ location }) => {

  if (!location) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Location not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={location.amenities}
        keyExtractor={(item, index) => `${item.category}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.amenityItem}>
            <MaterialCommunityIcons
              name={getIconForCategory(item.category)}
              size={24}
              color="#007BFF"
            />
            <View style={styles.amenityDetails}>
              <Text style={styles.amenityCategory}>{item.category}</Text>
              <Text style={styles.amenityComment}>{item.comment}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Helper function to map category to icons
const getIconForCategory = (category) => {
  switch (category.toLowerCase()) {
    case 'power':
      return 'power-plug';
    case 'wifi':
      return 'wifi';
    case 'food':
      return 'food';
    case 'water':
      return 'water';
    default:
      return 'dots-horizontal';
  }
};

export default AmenitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  amenityDetails: {
    marginLeft: 12,
  },
  amenityCategory: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  amenityComment: {
    fontSize: 14,
    color: '#666',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
  },
});
