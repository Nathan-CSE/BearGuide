import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { useBearGuide } from './BearGuideContext';
import { StyleSheet } from 'react-native';
import UserProfileTab from './UserProfileTab';
import ProfileIcon from '@/components/profile/ProfileIcon';
import { useRouter } from 'expo-router';

const UserProfile = () => {
  const { bearGuide } = useBearGuide();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // finds current user using userId
    setUser(bearGuide.users.find((x) => x.id === bearGuide.currentUserId));
  }, [bearGuide]);

  return (
    <View style={styles.profileContainer}>
      <Surface elevation={5} mode="flat" style={styles.headerContainer}>
        <SafeAreaView>
          <View style={styles.userInfo}>
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
              <Text variant="labelLarge">{user ? user.campus : 'Campus'}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
  },
  userInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 24,
  },
});

export default UserProfile;
