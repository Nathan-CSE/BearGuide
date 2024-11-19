import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Button, Text, useTheme } from 'react-native-paper';
import a from '@/assets/images/Expanded Logo.png';

const index = () => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={a}
        style={{
          resizeMode: 'contain',
          maxHeight: '100%',
          maxWidth: '100%',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '50%',
          paddingVertical: 48,
          paddingHorizontal: 48,
          gap: 32,
          backgroundColor: 'white',
          alignItems: 'center',
          padding: 20,
          borderTopEndRadius: 50,
          borderTopStartRadius: 50,
        }}
      >
        <View style={{ alignItems: 'flex-start' }}>
          <Text
            variant="displayMedium"
            style={{ fontWeight: 'bold', color: theme.colors.onTertiary }}
          >
            Welcome to
          </Text>
          <Text
            variant="displayLarge"
            style={{ fontWeight: 'bold', color: theme.colors.primaryContainer }}
          >
            BearGuide
          </Text>
        </View>
        <View style={{ width: '100%', gap: 16 }}>
          <Button
            mode="contained"
            onPress={() => console.log('go to starting guide')}
          >
            Get Started
          </Button>
          <Link href={'/LoginPage'}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Text
                variant="bodyLarge"
                style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}
              >
                Skip to Login/Register
              </Text>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
