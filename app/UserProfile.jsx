import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Surface, Text } from 'react-native-paper';
import { useBearGuide } from './BearGuideContext';
import { StyleSheet } from 'react-native';
import UserProfileTab from './UserProfileTab';
import ProfileIcon from '@/components/profile/ProfileIcon';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfile = () => {
  const { bearGuide } = useBearGuide();
  const [user, setUser] = useState(null);
  const [guest, setGuest] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (bearGuide.currentUserId === null) {
      setGuest(true);
    } else {
      // finds current user using userId
      const currUser = bearGuide.users.find(
        (x) => x.id === bearGuide.currentUserId
      );
      setUser(currUser);
    }
  }, [bearGuide]);

  return (
    <View style={styles.profileContainer}>
      <Surface elevation={5} mode="flat" style={styles.headerContainer}>
        <SafeAreaView>
          <View style={styles.userInfo}>
            <View style={{ flexDirection: 'row', gap: 24 }}>
              <ProfileIcon user={user} />
              <View style={{ maxWidth: 150 }}>
                <Text
                  variant="headlineLarge"
                  style={{ fontWeight: 'bold' }}
                  numberOfLines={1}
                >
                  {user ? user.name : 'Name'}
                </Text>
                <Text variant="labelLarge" numberOfLines={2}>
                  {user ? user.faculty : 'Faculty'}
                </Text>
                <Text variant="labelLarge">
                  {user ? user.campus : 'Campus'}
                </Text>
              </View>
            </View>
            <Button
              mode="contained"
              onPress={() => router.push('/EditProfile')}
            >
              Edit
            </Button>
          </View>
        </SafeAreaView>
      </Surface>
      <UserProfileTab />
      <Dialog visible={guest} dismissable={false}>
        <Dialog.Title>Notice</Dialog.Title>
        <Dialog.Content>
          <Text>Login to access these features</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => router.push('/LoginPage')}>
            Go to Login/Register
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  userInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default UserProfile;
