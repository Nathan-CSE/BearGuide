import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ReviewsScreen = ({ route }) => {
  // const { location } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      {/* {location.reviews?.list?.length > 0 ? (
        location.reviews.list.map((review, index) => (
          <View key={index}>
            <Text>{review.comment}</Text>
            <Text>{review.rating}</Text>
          </View>
        ))
      ) : (
        <Text>No reviews available.</Text>
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

export default ReviewsScreen;
