import React from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Button, Text, Divider } from "react-native-paper";
import ReviewStar from "./ReviewStar";

const ReviewForm = ({ onClose, onSubmit }) => {
  const [title, setTitle] = React.useState("");
  const [accessibility, setAccessibility] = React.useState(0);
  const [cleanliness, setCleanliness] = React.useState(0);
  const [noisiness, setNoisiness] = React.useState(0);
  const [overall, setOverall] = React.useState(0);
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={[styles.label, {fontSize: 26}]}>Review Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={[styles.label, {marginTop: 15}]}>Accessibility</Text>
      <ReviewStar rating={accessibility} onChange={setAccessibility} />

      <Divider style={styles.divider} />

      <Text style={styles.label}>Cleanliness</Text>
      <ReviewStar rating={cleanliness} onChange={setCleanliness} />

      <Divider style={styles.divider} />

      <Text style={styles.label}>Noisiness</Text>
      <ReviewStar rating={noisiness} onChange={setNoisiness} />

      <Divider style={styles.divider} />

      <Text style={styles.label}>Overall Rating</Text>
      <ReviewStar rating={overall} onChange={setOverall} />

      <Text style={[styles.label, {marginTop: 10}]}>Additional Comments?</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 10,
    paddingBottom: 80
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    fontSize: 20,
  },

  divider: {
    marginTop: -6,
    marginBottom: 10,
  },
  submit: {
    marginTop: 16,
    marginBottom: 20,
  },
  cancel: {
    marginVertical: 8,
  },
});

export default ReviewForm;