import { StyleSheet, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useBearGuide } from './BearGuideContext';
import { Button, Divider, Text } from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const ReviewList = () => {
  const { bearGuide } = useBearGuide();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // map locations -> reviews
    // filter user written reviews
    const userReviews = bearGuide.locations
      .flatMap((location) =>
        location.reviews.list.map((review) => ({
          ...review,
          name: location.name,
        }))
      )
      .filter((review) => review.userId === bearGuide.currentUserId);
    setReviews(userReviews);
    userReviews.forEach((review) => console.log(review));
  }, []);

  return (
    <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
      {reviews.length > 0 ? (
        <Text variant="labelLarge" style={{ fontWeight: 'bold' }}>
          Most Recent
        </Text>
      ) : (
        <Text>List is empty</Text>
      )}
      <FlatList
        data={reviews}
        ItemSeparatorComponent={<Divider />}
        renderItem={({ item }) => (
          <View
            style={{
              gap: 8,
              paddingVertical: 24,
            }}
          >
            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ maxWidth: 200, gap: 8 }}>
                <Text variant="labelLarge">{item.comment}</Text>
                <StarRatingDisplay
                  rating={item.overall}
                  color="#E9C16C"
                  enableHalfStar={true}
                  starSize={20}
                />
              </View>
              <Button
                mode="outlined"
                onPress={() => console.log('show modal for more info')}
              >
                More Info
              </Button>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
      <Text>List is empty</Text>
    </View>
  );
};

export default ReviewList;

const styles = StyleSheet.create({});
