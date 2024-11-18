import * as React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ReviewList from './ReviewList';
import FavouriteList from './FavouriteList';

const routes = [
  { key: 'first', title: 'Reviews' },
  { key: 'second', title: 'Favourites' },
];

export default function UserProfileTab() {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);
  const navigationState = { index, routes };

  const renderScene = SceneMap({
    first: ReviewList,
    second: FavouriteList,
  });

  // Render custom tab bar
  const renderTabBar = (props) => {
    const { navigationState, ...restProps } = props;

    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: theme.colors.elevation['level5'],
        }}
      >
        <TabBar
          {...restProps}
          navigationState={navigationState} // Ensure correct navigationState is passed
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            width: 320,
          }}
          activeColor={theme.colors.primary}
          inactiveColor={theme.colors.onSurfaceVariant}
          indicatorStyle={{
            backgroundColor: theme.colors.primary,
            height: 4,
            width: 50,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            marginHorizontal: 55,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={navigationState}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}
