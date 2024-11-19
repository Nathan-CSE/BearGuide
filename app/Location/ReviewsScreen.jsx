import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Text, Avatar, Divider, FAB, Portal, Modal, ScrollView, MD3Colors, useTheme } from "react-native-paper";
import StarRating from "../StarRating";
import ReviewForm from "./ReviewForm";

const Reviews = ({ location }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleReviewSubmit = (newReview) => {
    location.reviews.list.push({
      id: location.reviews.list.length + 1,
      ...newReview,
    });
    setModalVisible(false);
  };

  const renderReview = ({ item }) => (
    <Card style={styles.card} elevation={2}>
      <View style={styles.row}>
        <Avatar.Icon size={40} icon="account" style={styles.avatar} />
        <View style={styles.header}>
          <Text style={styles.title}>{item.title || "Anonymous Review"}</Text>
          <StarRating rating={item.overall} />
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.score}>{item.accessibility}/5</Text>
          <Text style={styles.category}>Accessibility</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.score}>{item.cleanliness}/5</Text>
          <Text style={styles.category}>Cleanliness</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.score}>{item.noisiness}/5</Text>
          <Text style={styles.category}>Noisiness</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.comment}>{item.comment}</Text>
    </Card>
  );
  

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={location.reviews.list}
        showsHorizontalScrollIndicator={false}
        renderItem={renderReview}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <FAB
        style={styles.fab}
        color="white"
        icon="pencil"
        label="Write a Review"
        onPress={() => setModalVisible(true)}
      />
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <ReviewForm
            onClose={() => setModalVisible(false)}
            onSubmit={handleReviewSubmit}
          />
          {/* <ScrollView contentContainerStyle={styles.modalContent}>
          </ScrollView> */}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF'
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
    backgroundColor: "#ccc",
  },
  header: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 8,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  detailItem: {
    alignItems: "center",
  },
  comment: {
    fontSize: 14,
    marginVertical: 8,
    marginHorizontal: 16
  },
  listContainer: {
    padding: 10,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: "#964800",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    maxHeight: "90%",
    elevation: 3,
  },
  modalContent: {
    flexGrow: 1,
    padding: 10,
  },
});

export default Reviews;
