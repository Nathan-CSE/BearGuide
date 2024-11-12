import {
  StyleSheet,
  View,
  FlatList,
  Image,
  SectionList,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useBearGuide } from './BearGuideContext';
import { Button, Divider, Surface, Text } from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const FavouriteList = () => {
  const { bearGuide } = useBearGuide();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // map locations -> reviews
    // filter user written reviews
    const userFavourites = bearGuide.locations.filter((location) =>
      location.favourited.includes(bearGuide.currentUserId)
    );
    setFavourites(userFavourites);
    userFavourites.forEach((favourite) => console.log(favourite.name));
  }, []);

  return (
    <ScrollView
      styel
      style={{ paddingHorizontal: 24, paddingVertical: 16, gap: 24 }}
    >
      {favourites.length > 0 ? (
        <Text variant="labelLarge" style={{ fontWeight: 'bold' }}>
          Most Recent
        </Text>
      ) : (
        <Text>List is empty</Text>
      )}
      <View style={{ gap: 24, paddingTop: 24 }}>
        {favourites.map((item) => (
          <View
            key={item.id}
            style={{
              borderRadius: 5,
              overflow: 'hidden',
              paddingTop: 1,
              padding: 4,
            }}
          >
            <Surface
              elevation={3}
              style={{
                gap: 24,
                padding: 16,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text variant="titleMedium" style={{ maxWidth: 150 }}>
                  {item.name}
                </Text>
                <Button
                  mode="outlined"
                  onPress={() => console.log('show location on map')}
                >
                  Show on Map
                </Button>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={{ height: 88, width: 88 }}
                />
                <Image
                  source={{ uri: item.images[1] }}
                  style={{ height: 88, width: 88 }}
                />
                <Image
                  source={{ uri: item.images[2] }}
                  style={{ height: 88, width: 88 }}
                />
              </View>
            </Surface>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default FavouriteList;

const styles = StyleSheet.create({});
