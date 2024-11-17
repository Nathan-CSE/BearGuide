import React from 'react';
import { View, ScrollView, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Chip, 
  Divider, 
  Text,
  Button,
  IconButton,
  MD3Colors,
  useTheme,
  Icon,
} from 'react-native-paper';

const OverviewScreen = ({ location }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const theme = useTheme();

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

  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  const currentTime = new Date().toTimeString().split(":").slice(0, 2).join(":");
  
  const isOpen = openingHours.data[currentDay]
    ? currentTime >= openingHours.data[currentDay].open && currentTime <= openingHours.data[currentDay].close
    : false;

  const handleExpand = () => setIsExpanded(!isExpanded);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Card.Cover key={index} source={{ uri: image }} style={styles.image} />

        ))}
      </View>
      
      <Divider style={styles.divider} />

      <Paragraph>{description}</Paragraph>

      <Divider style={styles.divider} />

      <View style={styles.locationContainer}>
        <Icon source="map-marker-outline" size={25} color="#964800" />
        <Text style={styles.locationText}>{address}</Text>

      </View>

      <Divider style={styles.divider} />

      {/* Opening Hours */}
      {/* Currently an issue where when I expand opening hours, the text */}
      {/* is horizontal and goes off the screen, also I need to add a divider */}
      <View style={styles.openingHoursContainer}>
        <Icon source="clock-outline" size={25} color="#964800" />
        {openingHours.data ? (
          <TouchableOpacity onPress={handleExpand} style={styles.openStatusContainer}>
            <Text style={{ color: isOpen ? theme.colors.primary : theme.colors.error }}>
              {isOpen ? "Currently Open" : "Currently Closed"}
            </Text>
            <Text style={styles.openingHoursText}>
              {`${currentDay.charAt(0).toUpperCase() + currentDay.slice(1)}: ${openingHours.data[currentDay]?.open === "Closed" ? "Closed" : `${openingHours.data[currentDay]?.open} - ${openingHours.data[currentDay]?.close}`}`}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text>No opening hours available.</Text>
        )}
        {isExpanded && openingHours.data && Object.entries(openingHours.data).map(([day, hours]) => (
          <Text
            key={day}
            style={[
              styles.openingHoursText,
              day === currentDay && styles.currentDayText,
            ]}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
            {hours.open === "Closed" ? "Closed" : `${hours.open} - ${hours.close}`}
          </Text>
        ))}
      </View>
     
     
      <Divider style={styles.divider} />

      <Text style={styles.subtitle}>Review Summary:</Text>
      <Text>Accessibility: {reviews.summary.accessibility}</Text>
      <Text>Cleanliness: {reviews.summary.cleanliness}</Text>
      <Text>Noisiness: {reviews.summary.noisiness}</Text>
      <Text>Overall: {reviews.summary.overall}</Text>

      <Divider style={styles.divider} />


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

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  tabView: { flex: 1, height: "100%" },
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  locationText: {
    marginLeft: 15,
    fontSize: 16,
    color: 'black',
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
  openingHoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  openStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  openingHoursText: {
    fontSize: 16,
    marginLeft: 5,
  },
  currentDayText: {
    fontWeight: 'bold',
  },
  iconButton: {
    marginLeft: 10,
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


export default OverviewScreen;
