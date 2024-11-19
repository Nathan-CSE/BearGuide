import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-paper';

const StarRating = ({ rating, size = 16, color = '#F4B400' }) => {
  return (
    <View style={styles.starContainer}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon
          key={index}
          source={index < Math.round(rating) ? 'star' : 'star-outline'}
          size={size}
          color={color}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
});

export default StarRating;
