import { Stack } from 'expo-router';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import BearGuideColourScheme from '@/constants/ColourScheme';
import { BearGuideProvider } from './BearGuideContext';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

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
          <Stack.Screen name="index" options={{ headerShown: false }} />
          {/* <Stack.Screen
            name="index"
            options={{
              headerStyle: {
                backgroundColor: theme.colors.elevation['level5'],
              },
            }}
          /> */}
          <Stack.Screen
            name="LocationSearch"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar 
          translucent={true}
          hidden={false}
        />
      </PaperProvider>
    </BearGuideProvider>
    
  );
}
