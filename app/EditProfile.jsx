import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  IconButton,
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useBearGuide } from './BearGuideContext';
import ProfileIcon from '@/components/profile/ProfileIcon';
import { Dropdown } from 'react-native-element-dropdown';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

const campuses = [
  { label: 'UNSW Kensington', value: 'UNSW Kensington' },
  { label: 'UNSW Canberra', value: 'UNSW Canberra' },
  { label: 'UNSW Paddington', value: 'UNSW Paddington' },
  { label: 'UNSW CBD', value: 'UNSW CBD' },
];

const faculties = [
  {
    label: 'Arts, Design & Architecture',
    value: 'UNSW Faculty of Arts, Design & Architecture',
  },
  { label: 'Business', value: 'UNSW Faculty of Business' },
  { label: 'Engineering', value: 'UNSW Faculty of Engineering' },
  { label: 'Law & Justice', value: 'UNSW Faculty of Law and Justice' },
  { label: 'Medicine & Health', value: 'UNSW Faculty of Medicine & Health' },
  { label: 'Science', value: 'UNSW Faculty of Science' },
  { label: 'ADFA', value: 'UNSW Canberra at ADFA' },
];

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const { bearGuide, setBearGuide } = useBearGuide();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [localInfo, setLocalInfo] = useState({
    name: '',
    email: '',
    faculty: '',
    campus: '',
    password: '',
    profile_image: null,
  });

  useEffect(() => {
    // finds current user using userId
    const currUser = bearGuide.users.find(
      (x) => x.id === bearGuide.currentUserId
    );
    setUser(currUser);
  }, []);

  useEffect(() => {
    if (user) {
      setLocalInfo({
        name: user.name,
        email: user.email,
        faculty: user.faculty,
        campus: user.campus,
        password: user.password,
        profile_image: user.profile_image,
      });
    }
  }, [user]);

  const handleChange = (field) => (value) => {
    setLocalInfo((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      handleChange('profile_image')(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Portal>
        <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <Dialog.Title>
            <Text>Your profile has been saved successfully</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text>Press anywhere to dismiss.</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <Surface elevation={5} mode="flat">
        <SafeAreaView>
          <View style={styles.header}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => router.dismiss(1)}
            />
            <Text variant="titleMedium">Edit Profile</Text>
            <View style={{ width: 56 }} />
          </View>
        </SafeAreaView>
      </Surface>
      <View style={styles.mainContent}>
        <ProfileIcon user={localInfo} />
        <Button onPress={pickImage}>Change Picture</Button>
        <Dropdown
          style={styles.dropdown}
          data={campuses}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={localInfo.campus}
          onChange={(item) => handleChange('campus')(item.value)}
          renderLeftIcon={() => (
            <Entypo style={{ paddingRight: 16 }} name="location" size={20} />
          )}
        />
        <Dropdown
          style={styles.dropdown}
          data={faculties}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={localInfo.faculty}
          onChange={(item) => handleChange('faculty')(item.value)}
          renderLeftIcon={() => (
            <Ionicons style={{ paddingRight: 16 }} name="school" size={20} />
          )}
        />
        <TextInput
          style={{ maxHeight: 56, width: '100%' }}
          label="Name"
          maxLength={15}
          value={localInfo.name}
          onChangeText={handleChange('name')}
          mode="outlined"
        />
        <TextInput
          style={{ maxHeight: 56, width: '100%' }}
          label={'Email'}
          value={localInfo.email}
          onChangeText={handleChange('email')}
          mode="outlined"
        />
        <TextInput
          style={{ maxHeight: 56, width: '100%' }}
          label="Password"
          secureTextEntry={!showPassword}
          value={localInfo.password}
          onChangeText={handleChange('password')}
          mode="outlined"
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              size={24}
              onPress={() => setShowPassword((prev) => !prev)}
            />
          }
        />
        <Button
          style={{ marginTop: 16 }}
          mode="contained"
          onPress={() => {
            // combine updated data with stored data
            const userData = { ...user, ...localInfo };
            // remove old user data
            const updatedUsers = bearGuide.users.filter(
              (u) => u.id !== user.id
            );
            // add new user data
            updatedUsers.push(userData);
            setBearGuide({ ...bearGuide, users: updatedUsers });
            setIsVisible(true);
          }}
        >
          Save Changes
        </Button>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  mainContent: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 48,
    gap: 8,
  },
  userInput: {
    maxHeight: 56,
    width: '100%',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 56,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
  },
});
