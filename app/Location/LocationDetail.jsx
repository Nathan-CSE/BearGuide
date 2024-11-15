import React from 'react';
import { View, ScrollView, StyleSheet, Image, useWindowDimensions } from 'react-native';
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
import { useBearGuide } from '../BearGuideContext';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from 'react-native-paper';

// You may need to update react-native-screens to resolve dependency tree
// npm install react-native-screens@^4.0.0

// Import each screen component
// import ReviewsScreen from './ReviewsScreen';
// import OverviewScreen from './OverviewScreen';

import OverviewScreen from './OverviewScreen';
import ReviewsScreen from './ReviewsScreen';
import AmenitiesScreen from './AmenitiesScreen'
import PopularTimesChart from './PopularTimesChart';

// const OverviewScreen = () => <Text>Overview Content</Text>;
// const ReviewsScreen = () => <Text>Reviews Content</Text>;

const LocationDetail = ({ locationId }) => {
  const { id } = useLocalSearchParams();
  const { bearGuide } = useBearGuide();
  const theme = useTheme();

  if (!locationId) locationId = parseInt(id);

  const location = bearGuide.locations.find(loc => loc.id === locationId);

  if (!location) {
    return <Text>No location found.</Text>;
  }


  const { 
    coordinates,
    address,
    name,
    amenities = [], 
    capacity, 
    popularTimes = {}, 
    images = [""], 
    openingHours = { type: 1, data: {} }, 
    description, 
    reviews = { summary: {}, list: [] }, 
  } = location;
  
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes = [
    { key: 'overview', title: 'Overview' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'amenities', title: 'Amenities' },
  ];

  const renderScene = SceneMap({
    overview: () => <OverviewScreen location={location} />,
    reviews: () => <ReviewsScreen location={location} />,
    amenities: () => <AmenitiesScreen location={location} />,
  });

  const renderTabBar = (props) => (
    <View style={styles.tabBarContainer}>
      <TabBar
        {...props}
        style={{
          backgroundColor: 'rgba(0,0,0,0)',
          width: 320,
        }}
        activeColor={theme.colors.primary}
        inactiveColor={theme.colors.onSurfaceVariant}
        indicatorStyle={{
          backgroundColor: theme.colors.primary,
          height: 4,
          width: 50,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          marginHorizontal: 55,
        }}
      />
    </View>
  );

  React.useEffect(() => {
    if (openingHours && openingHours.data) {
      console.log("Opening Hours:");
      Object.entries(openingHours.data).forEach(([day, hours]) => {
        const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
        const formattedHours = hours.open === "Closed" ? "Closed" : `${hours.open} - ${hours.close}`;
        console.log(`${formattedDay}: ${formattedHours}`);
      });
    }
  }, [openingHours]);
  

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.header}>
                <Text variant="headlineLarge" style={styles.title}>{name}</Text>
                <IconButton
                  icon="close"
                  mode="contained"
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

              <View style={styles.imageContainer}>
                {images.map((image, index) => (
                  <Card.Cover key={index} source={{ uri: image }} style={styles.image} />
                  // console.log("this is uri: ", image)
                  // <Image key={index} style={styles.image} source={{ uri: image }} />
                ))}
              </View>


              <Card.Content>
                <Text style={styles.subtitle}>Opening Hours:</Text>
                {openingHours && openingHours.data ? (
                  Object.entries(openingHours.data).map(([day, hours]) => (
                    <Text key={day}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}: 
                      {hours.open === "Closed" ? " Closed" : ` ${hours.open} - ${hours.close}`}
                    </Text>
                  ))
                ) : (
                  <Text>No opening hours available.</Text>
                )}
              </Card.Content>


              <Paragraph>{description}</Paragraph>
            </Card.Content>

            <Divider style={styles.divider} />

            {/* Having a lot of issues with popular times chart so gonna come back to it later */}
            {/* <SafeAreaView style={{ flex: 1 }}>
              <PopularTimesChart 
                dayData={location.reviews.popularTimes.tuesday} 
                day="Tuesday" 
              />
              <PopularTimesChart 
                dayData={location.reviews.popularTimes?.tuesday || []} // Provide an empty array as fallback
                day="Tuesday" 
              />
            </SafeAreaView> */}
            


            <Card.Content>
              <Text style={styles.subtitle}>Review Summary:</Text>
              <Text>Accessibility: {reviews.summary.accessibility}</Text>
              <Text>Cleanliness: {reviews.summary.cleanliness}</Text>
              <Text>Noisiness: {reviews.summary.noisiness}</Text>
              <Text>Overall: {reviews.summary.overall}</Text>
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
            
            {/* Regardless -> the tab navigation just doesn't seem to work which is REALLY annoying */}
          

          </Card>
        </ScrollView>
        {/* Tab View */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
          style={styles.tabView}
        />

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  tabView: { flex: 1 },
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
    borderRadius: 6,
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
