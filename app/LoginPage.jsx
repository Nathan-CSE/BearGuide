import { StyleSheet, View } from 'react-native';
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
import { Link, useRouter } from 'expo-router';
import { useBearGuide } from './BearGuideContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { bearGuide, setBearGuide } = useBearGuide();

  const handleLogin = () => {
    const validUser = bearGuide.users.find(
      (user) =>
        user.email.toLowerCase() == email.toLowerCase() &&
        user.password == password
    );
    if (validUser) {
      setBearGuide({ ...bearGuide, currentUserId: validUser.id });
      router.push('/home');
    } else {
      setVisible(true);
    }
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
              Login
            </Text>
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.tertiary, textAlign: 'center' }}
            >
              Welcome back! We&#39;ve missed you
            </Text>
          </View>
          <View style={{ gap: 32 }}>
            <View style={{ gap: 16 }}>
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
            </View>
            <Button mode="contained" onPress={handleLogin}>
              Login
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
          <Link href={'/RegisterPage'}>
            <Text
              variant="bodyLarge"
              style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}
            >
              Create an account
            </Text>
          </Link>
          <Link href={'/LoginPage'}>
            <Text
              variant="bodyLarge"
              style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}
            >
              Or continue without signing in
            </Text>
          </Link>
        </View>
      </SafeAreaView>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>
          <Text>Error</Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text>Email or Password doesn&#39;t match our system</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Surface>
  );
};

export default LoginPage;

const styles = StyleSheet.create({});
