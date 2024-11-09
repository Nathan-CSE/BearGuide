import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Surface, Text, useTheme } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { useBearGuide } from './BearGuideContext';
import { StyleSheet } from 'react-native';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const routes = [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
];

const UserProfile = () => {
  const theme = useTheme();
  const { bearGuide, setBearGuide, tools } = useBearGuide();
  const [name, setName] = useState('Name');
  const [faculty, setFaculty] = useState('Faculty');
  const [campus, setCampus] = useState('Preferred campus');

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: theme.colors.elevation['level5'],
      }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
      indicatorStyle={{
        backgroundColor: theme.colors.primary,
        height: 4,
        width: 50,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        left: (layout.width / 2 - 50) / 2,
      }}
    />
  );

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

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
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
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
