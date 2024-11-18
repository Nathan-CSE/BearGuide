import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';
import a from '@/assets/images/Expanded Logo.png';

const index = () => {
  return (
    <SafeAreaView>
      <Image source={a} style={{ maxWidth: '100%', height: '100%' }} />
      <Text>index</Text>
      <Link href={'/home'}>
        <Button>Go to Home</Button>
      </Link>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
