import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

const ReviewStar = ({ rating, onChange }) => {
  return (
    <View style={styles.starContainer}>
      {Array.from({ length: 5 }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onChange(index + 1)}
          activeOpacity={0.7}
        >
          <IconButton
            icon={index < rating ? "star" : "star-outline"}
            size={45}
            iconColor="#F4B400"
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // marginVertical: 1,
    marginTop: -8
  },
  star: {
    marginHorizontal: 2,
  },
});

export default ReviewStar;
