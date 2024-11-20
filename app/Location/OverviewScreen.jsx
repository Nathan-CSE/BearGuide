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
import StarRating from '../StarRating';

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

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${suffix}`;
  };
  
  
  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  const currentTime = new Date().toTimeString().split(":").slice(0, 2).join(":");
  
  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };
  
  const currentTimeInMinutes = convertToMinutes(currentTime);
  const openingTimeInMinutes = convertToMinutes(openingHours.data[currentDay]?.open);
  const closingTimeInMinutes = convertToMinutes(openingHours.data[currentDay]?.close);

  const isOpen = openingTimeInMinutes && closingTimeInMinutes 
    ? currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes <= closingTimeInMinutes
    : false;

  // console.log("Current Day:", currentDay);
  // console.log("Current Time:", currentTime);
  // console.log("Opening Hours for Today:", openingHours.data[currentDay]);
  // console.log("Is Open:", isOpen);

  const handleExpand = () => setIsExpanded(!isExpanded);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            <Text style={{ color: isOpen ? theme.colors.tertiary : theme.colors.error, fontSize: 16 }}>
              {isOpen ? "Currently Open" : "Currently Closed"}
              {" • "}
            </Text>
            <Text style={[styles.openingHoursText, { flex: 2 }]}>
              {`${openingHours.data[currentDay]?.open === "Closed" ? "Closed" : `${convertTo12HourFormat(openingHours.data[currentDay]?.open)} - ${convertTo12HourFormat(openingHours.data[currentDay]?.close)}`}`}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text>No opening hours available.</Text>
        )}
      </View>
     
      {isExpanded &&
        <Divider style={styles.divider} />
      }

      <View style={{ marginLeft: 30 }}>
        {isExpanded &&
          openingHours.data &&
          Object.entries(openingHours.data).map(([day, hours]) => (
            <View
              key={day}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 2,
              }}
            >
              <Text
                style={[
                  styles.openingHoursText,
                  day === currentDay && styles.currentDayText,
                  { flex: 1 },
                ]}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Text>
              <Text
                style={[
                  styles.openingHoursText,
                  day === currentDay && styles.currentDayText,
                  { flex: 2, textAlign: 'right' },
                ]}
              >
                {hours.open === 'Closed'
                  ? 'Closed'
                  : `${convertTo12HourFormat(hours.open)} - ${convertTo12HourFormat(hours.close)}`}
              </Text>
            </View>
          ))}
      </View>

     
      <Divider style={styles.divider} />

      <Text style={styles.subtitle}>Review Summary</Text>
      <View style={styles.reviewSummaryContainer}>
        {[
          { label: 'Overall', value: reviews.summary.overall },
          { label: 'Cleanliness', value: reviews.summary.cleanliness },
          { label: 'Noisiness', value: reviews.summary.noisiness },
          { label: 'Accessibility', value: reviews.summary.accessibility },
        ].map((item, index) => (
          <View key={index} style={styles.reviewItem}>
            <Text style={styles.ratingValue}>{item.value.toFixed(1)}</Text>
            <StarRating rating={item.value} />
            <Text style={styles.ratingLabel}>{item.label}</Text>
          </View>
        ))}
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
    marginLeft: 10,
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
  reviewSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  reviewItem: {
    alignItems: 'center',
    flex: 1,
  },
  ratingValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  ratingLabel: {
    fontSize: 12,
    color: '#555',
  },
  
});


export default OverviewScreen;
