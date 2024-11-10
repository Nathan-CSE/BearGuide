import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Chip, Divider, Text } from 'react-native-paper';
import { useBearGuide } from './BearGuideContext';

const LocationDetail = ({ locationId }) => {
  const { bearGuide } = useBearGuide();
  const location = bearGuide.locations.find(loc => loc.id === locationId);

  if (!location) {
    return <Text>No location found.</Text>;
  }

  const { name, coordinates, reviews = {}, amenities = [], description } = location;
  const { summary = {}, list = [], images = [""] } = reviews;

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{name}</Title>
          <Paragraph>{description}</Paragraph>
          <Text style={styles.subtitle}>Coordinates:</Text>
          <Text>Longitude: {coordinates?.long}</Text>
          <Text>Latitude: {coordinates?.lat}</Text>
        </Card.Content>

        {/* Reviews Summary */}
        <Card.Content>
          <Text style={styles.subtitle}>Review Summary:</Text>
          <Text>Accessibility: {summary.accessibility}</Text>
          <Text>Cleanliness: {summary.cleanliness}</Text>
          <Text>Noisiness: {summary.noisiness}</Text>
          <Text>Overall: {summary.overall}</Text>
        </Card.Content>

        <Divider style={styles.divider} />

        {/* Amenities */}
        <Card.Content>
          <Text style={styles.subtitle}>Amenities:</Text>
          <View style={styles.amenitiesContainer}>
            {amenities.length > 0 ? (
              amenities.map((amenity, index) => (
                <Chip key={index} style={styles.chip}>
                  {amenity.category} - {amenity.comment}
                </Chip>
              ))
            ) : (
              <Text>No amenities available.</Text>
            )}
          </View>
        </Card.Content>

        <Divider style={styles.divider} />

        {/* Reviews List */}
        <Card.Content>
          <Text style={styles.subtitle}>Reviews:</Text>
          {list.length > 0 ? (
            list.map((review) => (
              <View key={review.id} style={styles.reviewContainer}>
                <Text>Accessibility: {review.accessibility}</Text>
                <Text>Cleanliness: {review.cleanliness}</Text>
                <Text>Noisiness: {review.noisiness}</Text>
                <Text>Overall: {review.overall}</Text>
                <Text>Comment: {review.comment}</Text>
                <Divider style={styles.reviewDivider} />
              </View>
            ))
          ) : (
            <Text>No reviews available.</Text>
          )}
        </Card.Content>

        {/* Images */}
        {images[0] ? (
          <Card.Cover source={{ uri: images[0] }} style={styles.image} />
        ) : (
          <Text style={styles.subtitle}>No image available.</Text>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 5,
    marginVertical: 5,
  },
  divider: {
    marginVertical: 10,
  },
  reviewContainer: {
    marginVertical: 10,
  },
  reviewDivider: {
    marginVertical: 5,
  },
  image: {
    marginTop: 10,
  },
});

export default LocationDetail;
