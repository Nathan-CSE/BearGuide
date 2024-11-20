import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useBearGuide } from './BearGuideContext';
import { Button, Divider, Text } from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { useRouter } from 'expo-router';

const ReviewList = () => {
  const { bearGuide } = useBearGuide();
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // map locations -> reviews
    // filter user written reviews
    const userReviews = bearGuide.locations
      .flatMap((location) =>
        location.reviews.list.map((review) => {
          return {
            userId: review.userId,
            comment: review.comment,
            overall: review.overall,
            reviewId: review.id,
            locationId: location.id,
            name: location.name,
          };
        })
      )
      .filter((review) => review.userId === bearGuide.currentUserId);
    setReviews(userReviews);
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
        data={[...reviews]}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={<Divider />}
        renderItem={({ item }) => (
          <Pressable
            style={{
              gap: 8,
              paddingVertical: 24,
            }}
            onPress={() => {
              router.push(
                {
                  pathname: '/Location/LocationDetail',
                  params: { id: item.locationId },
                },
              );
            }}
          >
            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
              {item.name}
            </Text>
            <Text variant="labelLarge" numberOfLines={4}>
              {item.comment}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <StarRatingDisplay
                rating={item.overall}
                color="#E9C16C"
                enableHalfStar={true}
                starSize={25}
              />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default ReviewList;

const styles = StyleSheet.create({});
