import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native';
import { useBearGuide } from './BearGuideContext';

const UserProfile = () => {
  const { bearGuide, setBearGuide, tools } = useBearGuide();

  return (
    <View>
      <Text>Header with user information</Text>
      <Text>
        Reviews/Favourites section with component that contains two flatlists
        which displays the corresponding list.
      </Text>
    </View>
  );
};

export default UserProfile;
