import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import {
  IconButton,
  Surface,
  TextInput,
  Text,
  useTheme,
  Button,
  Dialog,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useBearGuide } from './BearGuideContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const { bearGuide, setBearGuide } = useBearGuide();

  const handleRegister = () => {
    const newUser = {
      id: bearGuide.users.length,
      name: userName,
      email: email,
      password: password,
      faculty: 'UNSW Faculty of Engineering',
      campus: 'UNSW Kensington',
      profile_image: null,
      reviews: [],
      favourites: [],
      recents: [],
    };
    if (password === password2) {
      if (userExists) {
        setVisible2(true);
      } else {
        setBearGuide({
          ...bearGuide,
          users: [...bearGuide.users, newUser],
          currentUserId: newUser.id,
        });
        router.push('/home');
      }
    } else {
      setVisible(true);
    }
  };

  const userExists = () => {
    return bearGuide.users.find(
      (user) =>
        user.email.toLowerCase() == email.toLowerCase() &&
        user.password == password
    );
  };

  return (
    <Surface
      elevation={3}
      mode="flat"
      style={{ flex: 1, alignItems: 'center' }}
    >
      <SafeAreaView style={{ width: 330, height: '100%', gap: 32 }}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.dismiss(1)}
        />
        <View style={{ gap: 32 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text variant="displayMedium" style={{ fontWeight: 'bold' }}>
              Create Account{' '}
            </Text>
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.tertiary, textAlign: 'center' }}
            >
              Create an account so you can access all our features
            </Text>
          </View>
          <View style={{ gap: 32 }}>
            <View style={{ gap: 16 }}>
              <TextInput
                style={{ maxHeight: 56, width: '100%' }}
                label={'Name'}
                value={userName}
                onChangeText={setUserName}
                mode="outlined"
              />
              <TextInput
                style={{ maxHeight: 56, width: '100%' }}
                label={'Email'}
                value={email}
                onChangeText={setEmail}
                mode="outlined"
              />
              <TextInput
                style={{ maxHeight: 56, width: '100%' }}
                label="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    onPress={() => setShowPassword((prev) => !prev)}
                  />
                }
              />
              <TextInput
                style={{ maxHeight: 56, width: '100%' }}
                label="Password"
                secureTextEntry={!showPassword2}
                value={password2}
                onChangeText={setPassword2}
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={showPassword2 ? 'eye-off' : 'eye'}
                    size={24}
                    onPress={() => setShowPassword2((prev) => !prev)}
                  />
                }
              />
            </View>
            <Button mode="contained" onPress={handleRegister}>
              Register
            </Button>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 128,
            width: '100%',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Pressable onPress={() => router.dismiss()}>
            <Text
              variant="bodyLarge"
              style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}
            >
              Already have an account
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>
          <Text>Error</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>
            Passwords don&#39;t match. Please make sure they are the same.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={visible2} onDismiss={() => setVisible2(false)}>
        <Dialog.Title>
          <Text>Error</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>Account already exists with this email</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible2(false)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Surface>
  );
};

export default LoginPage;

const styles = StyleSheet.create({});
