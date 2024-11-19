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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';

import OverviewScreen from './OverviewScreen';
import ReviewsScreen from './ReviewsScreen';
import AmenitiesScreen from './AmenitiesScreen'
import PopularTimesChart from './PopularTimesChart';
import StarRating from '../StarRating';

const LocationDetail = ({ locationId }) => {
  const { id } = useLocalSearchParams();
  const { bearGuide, setBearGuide } = useBearGuide();
  const theme = useTheme();
  const router = useRouter();

  if (!locationId) locationId = parseInt(id);

  const location = bearGuide.locations.find(loc => loc.id === locationId);

  if (!location) {
    return <Text>No location found.</Text>;
  }

  // console.log(`this is loc id ${locationId}`)

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
    favourited = [],
  } = location;
  
  const currentUserId = bearGuide.currentUserId;
  const isFavourited = favourited.includes(currentUserId);

  const toggleFavourite = () => {
    const updatedLocations = bearGuide.locations.map(loc => {
      if (loc.id === locationId) {
        const updatedFavourited = isFavourited
          ? loc.favourited.filter(userId => userId !== currentUserId) // Remove from favourites
          : [...loc.favourited, currentUserId]; // Add to favourites

        return { ...loc, favourited: updatedFavourited };
      }
      return loc;
    });

    setBearGuide({ ...bearGuide, locations: updatedLocations }); // Update the context
  };

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes = [
    { key: 'overview', title: 'Overview' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'popularTimes', title: 'Popular Times' },
    { key: 'amenities', title: 'Amenities' },
  ];

  const renderScene = SceneMap({
    overview: () => <OverviewScreen location={location} />,
    reviews: () => <ReviewsScreen location={location} />,
    amenities: () => <AmenitiesScreen location={location} />,
    popularTimes: () => <PopularTimesChart location={location} selectedDay="Monday" />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: 'rgba(0,0,0,0)',
        shadowOpacity: 0,
        elevation: 0,
      }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
      indicatorStyle={{
        backgroundColor: theme.colors.primary,
        height: 3,
        borderRadius: 1.5,
      }}
      labelStyle={{
        fontSize: 12,
        textTransform: 'none',
      }}
      tabStyle={{
        width: 'auto',
        paddingHorizontal: 10,
      }}
      scrollEnabled={true}
    />
  );
  

  React.useEffect(() => {
    if (openingHours && openingHours.data) {
      // console.log("Opening Hours:");
      Object.entries(openingHours.data).forEach(([day, hours]) => {
        const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
        const formattedHours = hours.open === "Closed" ? "Closed" : `${hours.open} - ${hours.close}`;
        // console.log(`${formattedDay}: ${formattedHours}`);
      });
    }
  }, [openingHours]);
  

  return (
    <SafeAreaView style={{ flex: 1, padding: 25, backgroundColor: "#fffdf5" }}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text variant="headlineLarge" style={styles.title} numberOfLines={2}>
            {name}
          </Text>
        </View>
        <IconButton
          icon="undo-variant"
          mode="contained"
          onPress={() => router.back()}
          style={styles.closeIcon}
        />
      </View>

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <StarRating rating={reviews.summary.overall || 4.2} size={20} />
        <Text style={styles.ratingValue}>
          {reviews.summary.overall ? reviews.summary.overall.toFixed(1) : 'Unable to find star rating'}
        </Text>
        <Text style={styles.ratingCount}> ({reviews.list.length})</Text>
      </View>

      {/* Horizontally scrollable button row for actions, have to enclose scrollview in a view otherwise there's vertical space for some reason */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollableButtonRow}
        >
          <View style={styles.buttonWrapper}>
            <Button icon="map-marker" mode="elevated" style={styles.button}>
              Directions
            </Button>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              icon={isFavourited ? "cards-heart" : "cards-heart-outline"}
              mode="elevated"
              style={styles.button}
              onPress={toggleFavourite}
            >
              {isFavourited ? "Favourited" : "Favourite"}
            </Button>
          </View>
          <View style={styles.buttonWrapper}>
            <Button icon="share-variant-outline" mode="elevated" style={styles.button}>
              Share
            </Button>
          </View>
        </ScrollView>
        </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(newIndex) => {
          // console.log("Switching to tab:", newIndex);
          setIndex(newIndex);
        }}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={styles.tabView}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabView: { flex: 1, height: "100%" },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    marginRight: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    marginLeft: 10
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
  scrollableButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  buttonWrapper: {
    marginHorizontal: 5,
  },
  button: {
    justifyContent: 'center',
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingValue: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingCount: {
    marginLeft: 5,
    fontSize: 14,
    color: 'gray',
  }
});

export default LocationDetail;
