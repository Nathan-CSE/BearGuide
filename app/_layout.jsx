import { Stack } from "expo-router";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import BearGuideColourScheme from '@/constants/ColourScheme';
import { BearGuideProvider } from './BearGuideContext';

const theme = {
  ...DefaultTheme,
  colors: BearGuideColourScheme.colors
};

export default function RootLayout() {
  return (
    <BearGuideProvider>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }}/>
          <Stack.Screen name="LocationSearch" options={{ headerShown: false }}/>
        </Stack>
      </PaperProvider>
    </BearGuideProvider>
  );
}

