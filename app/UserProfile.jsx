import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Avatar, Button, Surface, Text } from 'react-native-paper';

import { useBearGuide } from './BearGuideContext';
import { StyleSheet } from 'react-native';
import UserProfileTab from './UserProfileTab';

const UserProfile = () => {
  const { bearGuide } = useBearGuide();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // finds current user using userId
    setUser(bearGuide.users.find((x) => x.id === bearGuide.currentUserId));
  }, []);

  return (
    <View style={styles.profileContainer}>
      <Surface elevation={5} style={styles.headerContainer}>
        <SafeAreaView>
          <View style={styles.userInfo}>
            <Avatar.Icon size={80} icon="account" />
            <View style={{ maxWidth: 150 }}>
              <Text variant="headlineLarge" style={{ fontWeight: 'bold' }}>
                {user ? user.name : 'Name'}
              </Text>
              <Text variant="labelLarge" numberOfLines={2}>
                {user ? user.faculty : 'Faculty'}
              </Text>
              <Text variant="labelLarge">{user ? user.campus : 'Campus'}</Text>
            </View>
            <Button
              mode="contained"
              onPress={() => console.log('show modal for editing')}
            >
              Edit
            </Button>
          </View>
        </SafeAreaView>
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
    gap: 24,
  },
});

export default UserProfile;
