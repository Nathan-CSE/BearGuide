import React, { useEffect, useState } from 'react';
import { Dimensions, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Surface, Text, useTheme } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { useBearGuide } from './BearGuideContext';
import { StyleSheet } from 'react-native';
import UserProfileTab from './UserProfileTab';

const UserProfile = () => {
  const theme = useTheme();
  const { bearGuide, setBearGuide, tools } = useBearGuide();
  const [name, setName] = useState('Name');
  const [faculty, setFaculty] = useState('Faculty');
  const [campus, setCampus] = useState('Preferred campus');
  const layout = useWindowDimensions();

  return (
    <View style={styles.profileContainer}>
      <Surface elevation={5} style={styles.headerContainer}>
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
      </Surface>
      <UserProfileTab />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
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
