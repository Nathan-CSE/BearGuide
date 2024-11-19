import * as React from 'react';
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import BearGuideColourScheme from '@/constants/ColourScheme';
import MapPage from './MapPage';
import UserProfile from './UserProfile';

const theme = {
  ...DefaultTheme,
  colors: BearGuideColourScheme.colors,
};

const MapRoute = () => <MapPage />;

const ProfileRoute = () => <UserProfile />;

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'map', title: 'Map', focusedIcon: 'map' },
    { key: 'profile', title: 'User Profile', focusedIcon: 'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    map: MapRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      style={styles.container}
    />
  );
};

export default function Index() {
  return <BottomNav />;
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontWeight: 'bold',
    margin: 'auto',
    marginTop: 50,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 'auto',
  },
  textField: {
    marginVertical: 10,
  },
  createModal: {
    borderWidth: 1,
    padding: 20,
    margin: 10,
  },
});
