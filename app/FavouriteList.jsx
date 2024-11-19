import { StyleSheet, View, Image, ScrollView, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useBearGuide } from './BearGuideContext';
import { Button, Surface, Text } from 'react-native-paper';

const FavouriteList = () => {
  const { bearGuide } = useBearGuide();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // map locations -> reviews
    // filter user written reviews
    const userFavourites = bearGuide.locations
      .filter((location) =>
        location.favourited.includes(bearGuide.currentUserId)
      )
      .flatMap((location) => {
        return {
          id: location.id,
          name: location.name,
          images: [...location.images],
        };
      });
    setFavourites(userFavourites);
  }, []);

  return (
    <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
      {favourites.length > 0 ? (
        <Text variant="labelLarge" style={{ fontWeight: 'bold' }}>
          Most Recent
        </Text>
      ) : (
        <Text>List is empty</Text>
      )}
      <FlatList
        data={favourites}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          gap: 24,
          paddingTop: 24,
        }}
        renderItem={({ item }) => (
          <View
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
                  onPress={() => console.log(`location: ${item.id}`)}
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
                {item.images.slice(0, 3).map((imageUri, index) => (
                  <Image
                    key={index}
                    source={{ uri: imageUri }}
                    style={{ height: 88, width: 88 }}
                  />
                ))}
              </View>
            </Surface>
          </View>
        )}
      />
    </View>
  );
};

export default FavouriteList;

const styles = StyleSheet.create({});
