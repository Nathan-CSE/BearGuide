import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Image } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Chip, 
  Divider, 
  Text,
  Button,
  IconButton,
  MD3Colors
} from 'react-native-paper';
import { useBearGuide } from './BearGuideContext';
import PopularTimesChart from './PopularTimesChart';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const LocationDetail = ({ locationId }) => {
  const { bearGuide } = useBearGuide();
  const location = bearGuide.locations.find(loc => loc.id === locationId);

  if (!location) {
    return <Text>No location found.</Text>;
  }

  const { name, coordinates, reviews = {}, amenities = [], description, openingHours } = location;
  const { summary = {}, list = [], images = [""] } = reviews;

  React.useEffect(() => {
    images.forEach((image, index) => console.log(`Image ${index} uri:`, image));
  }, [images]);

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.title}>{name}</Text>
            <IconButton
              icon="close"
              iconColor={MD3Colors.error50}
              onPress={() => console.log('Close button pressed')}
              style={styles.closeIcon}
            />
          </View>

          {/* Probably change this to render a component that takes in a prop that conditionally */}
          {/* renders the amount of stars (e.g. 3.5 -> round up to 4 stars) */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>4.2</Text>
            <Text>⭐️⭐️⭐️⭐️☆ (12)</Text>
          </View>

          {/* Can't seem to get spaces between buttons if I include the entire text in the button */}
          {/* Spaces vs. text */}
          <View style={styles.buttonRow}>
            <Button icon="map-marker" mode="elevated" style={styles.button}>
              Directions
            </Button>
            <Button icon="cards-heart-outline" mode="elevated" style={styles.button}>
              Favourite
            </Button>
            <Button icon="share-variant-outline" mode="elevated" style={styles.button}>
              Share
            </Button>
          </View>

          {/* No images provided yet */}
          <View style={styles.imageContainer}>
            {images.map((image, index) => (
              // <Card.Cover key={index} source={{ uri: image }} style={styles.image} />
              // console.log("this is uri: ", image)
              <Image key={index} style={styles.image} source={{ uri: image }} />
            ))}
          </View>

          <Card.Content>
            <Text style={styles.subtitle}>Opening Hours:</Text>
            {openingHours && openingHours.data ? (
              Object.entries(openingHours.data).map(([day, hours]) => (
                <Text key={day}>{day}: {hours.open} - {hours.close}</Text>
              ))
            ) : (
              <Text>No opening hours available.</Text>
            )}
          </Card.Content>

          <Paragraph>{description}</Paragraph>
          <Text style={styles.subtitle}>Coordinates:</Text>
          <Text>Longitude: {coordinates?.long}</Text>
          <Text>Latitude: {coordinates?.lat}</Text>
        </Card.Content>

        <Divider style={styles.divider} />

        {/* Having a lot of issues with popular times chart so gonna come back to it later */}
        <SafeAreaView style={{ flex: 1 }}>
          {/* <PopularTimesChart 
            dayData={location.reviews.popularTimes.tuesday} 
            day="Tuesday" 
          /> */}
          {/* <PopularTimesChart 
            dayData={location.reviews.popularTimes?.tuesday || []} // Provide an empty array as fallback
            day="Tuesday" 
          /> */}
        </SafeAreaView>

        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: { backgroundColor: 'blue' },
            tabBarLabelStyle: { fontSize: 14 },
          }}
        >
          <Tab.Screen name="Overview" component={OverviewScreen} />
          <Tab.Screen name="Popular Times" component={PopularTimesScreen} />
          <Tab.Screen name="Reviews" component={ReviewsScreen} />
        </Tab.Navigator>

        <Card.Content>
          <Text style={styles.subtitle}>Review Summary:</Text>
          <Text>Accessibility: {summary.accessibility}</Text>
          <Text>Cleanliness: {summary.cleanliness}</Text>
          <Text>Noisiness: {summary.noisiness}</Text>
          <Text>Overall: {summary.overall}</Text>
        </Card.Content>

        <Divider style={styles.divider} />

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
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    flex: 1,
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  image: {
    width: '48%',
    height: 100,
    marginBottom: 10,
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
});

export default LocationDetail;
