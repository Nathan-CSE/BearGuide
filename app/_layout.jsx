import { Stack } from 'expo-router';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import BearGuideColourScheme from '@/constants/ColourScheme';
import { BearGuideProvider } from './BearGuideContext';
import EStyleSheet from 'react-native-extended-stylesheet';

const theme = {
  ...DefaultTheme,
  colors: BearGuideColourScheme.colors,
};

EStyleSheet.build({});

export default function RootLayout() {
  return (
    <BearGuideProvider>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="LoginPage" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" options={{ headerShown: false }} />
          <Stack.Screen
            name="LocationSearch"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </PaperProvider>
    </BearGuideProvider>
  );
}
