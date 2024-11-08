import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Button,
  Surface,
  Text,
  Title,
  Paragraph,
} from 'react-native-paper';

import { useBearGuide } from './BearGuideContext';
import { StyleSheet } from 'react-native';

const UserProfile = () => {
  const { bearGuide, setBearGuide, tools } = useBearGuide();
  const [name, setName] = useState('Name');
  const [faculty, setFaculty] = useState('Faculty');
  const [campus, setCampus] = useState('Preferred campus');
  const statusBarColor = '#6a51ae'; // Your desired color

  return (
    <View>
      <Surface elevation={1} style={styles.headerContainer}>
        <View style={styles.userInfo}>
          <Avatar.Text size={80} label="NN" />
          <View>
            <Text variant="headlineLarge" style={styles.userInfoText}>
              {name}
            </Text>
            <Text variant="labelLarge" style={styles.userInfoText}>
              {faculty}
            </Text>
            <Text variant="labelLarge" style={styles.userInfoText}>
              {campus}
            </Text>
          </View>
          <Button mode="contained">Edit</Button>
        </View>
        <Text>Reviews/Favourites</Text>
      </Surface>
      <Text>
        Reviews/Favourites section with component that contains two flatlists
        which displays the corresponding list.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  userInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoText: {
    fontWeight: 'bold',
  },
});

export default UserProfile;
