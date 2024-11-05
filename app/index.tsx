import * as React from 'react';
import { AppRegistry } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { BottomNavigation, Text } from 'react-native-paper';
import { View, StyleSheet, Image, ScrollView } from "react-native";
import BearGuideColourScheme from '@/constants/ColourScheme';

// This theme doesnt seem to fucking work
const theme = {
  ...DefaultTheme,
  colors: BearGuideColourScheme.colors
};

const MapRoute = () => <Text>Map</Text>;

const ProfileRoute = () => <Text>User Profile</Text>;

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'map', title: 'Map', focusedIcon: 'map'},
    { key: 'profile', title: 'User Profile', focusedIcon: 'account-outline' }
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
      theme={theme}
    />
  );

}

export default function Index() {
  return (
    <PaperProvider theme={theme}>
      <BottomNav />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontWeight: 'bold',
    margin: 'auto',
    marginTop: 50
  },
  button: {
    marginTop: 20,
    marginHorizontal: 'auto'
  },
  textField: {
    marginVertical: 10
  },
  createModal: {
    borderWidth: 1,
    padding: 20,
    margin: 10
  }
});