import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import StarRating from "../StarRating";

const ReviewForm = ({ onClose, onSubmit }) => {
  const [title, setTitle] = React.useState("");
  const [accessibility, setAccessibility] = React.useState(0);
  const [cleanliness, setCleanliness] = React.useState(0);
  const [noisiness, setNoisiness] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const handleSubmit = () => {
    onSubmit({
      title,
      accessibility,
      cleanliness,
      noisiness,
      overall: (accessibility + cleanliness + noisiness) / 3,
      comment,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <Text>Accessibility</Text>
      <StarRating />
      <Text>Cleanliness</Text>
      <StarRating />
      <Text>Noisiness</Text>
      <StarRating />
      <Text style={styles.label}>Comment</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter comment"
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.submit}>
        Submit
      </Button>
      <Button onPress={onClose} style={styles.cancel}>
        Cancel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
  },
  label: {
    marginTop: 16,
    fontWeight: "bold",
  },
  submit: {
    marginTop: 16,
  },
  cancel: {
    marginTop: 8,
  },
});

export default ReviewForm;
