import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  IconButton,
  Menu,
  Searchbar,
  Button,
  useTheme,
  Text,
  Modal,
} from 'react-native-paper';
import { useBearGuide } from './BearGuideContext';
import MapView, { Marker, Heatmap } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';
import BearPage1 from '@/assets/images/bearPage1.png';
import BearPage2 from '@/assets/images/bearPage2.png';
import BearPage3 from '@/assets/images/bearPage3.png';
import { Image } from 'react-native';

const MapPage = ({ navigation }) => {
  const router = useRouter();
  const theme = useTheme();
  const { bearGuide, setBearGuide, tools } = useBearGuide();
  const [debugMenuVisible, setDebugMenuVisible] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [page1, setPage1] = useState(true);
  const [page2, setPage2] = useState(false);
  const [page3, setPage3] = useState(false);

  const addLocation = () => {
    const newLocation = {
      id: bearGuide.locations.length,
      coordinates: { long: 10, lat: 20 },
      name: 'New Location',
      reviews: {
        summary: { accessibility: 0, cleanliness: 0, noisiness: 0, overall: 0 },
        list: [],
        amenities: [],
        capacity: 0,
        popularTimes: {
          sunday: [],
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
        },
        images: [],
        openingHours: { type: 0, data: {} },
        description: '',
      },
    };

    setBearGuide((prev) => ({
      ...prev,
      locations: [...prev.locations, newLocation],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Debug Menu */}
      <View style={styles.debugMenu}>
        <Menu
          visible={debugMenuVisible}
          onDismiss={() => setDebugMenuVisible(false)}
          anchor={
            <Button
              icon="cog-outline"
              size={24}
              onPress={() => setDebugMenuVisible(true)}
              mode="contained"
            >
              Debug Menu
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              addLocation;
              setDebugMenuVisible(false);
            }}
            title={
              <View style={styles.menuItem}>
                <IconButton icon="plus-circle" size={20} />
                <Text>Add Location</Text>
              </View>
            }
          />
          <Menu.Item
            onPress={() => {
              tools.resetData;
              setDebugMenuVisible(false);
            }}
            title={
              <View style={styles.menuItem}>
                <IconButton icon="reload" size={20} />
                <Text>Reset Data</Text>
              </View>
            }
          />
          <Menu.Item
            onPress={() => {
              tools.dumpData;
              setDebugMenuVisible(false);
            }}
            title={
              <View style={styles.menuItem}>
                <IconButton icon="file-export" size={20} />
                <Text>Dump Data</Text>
              </View>
            }
          />
          <Menu.Item
            onPress={() => {
              router.push(
                {
                  pathname: '/LocationSearch',
                },
                {}
              );
            }}
            title={
              <View style={styles.menuItem}>
                <IconButton icon="magnify" size={20} />
                <Text>Go to Search</Text>
              </View>
            }
          />
        </Menu>
      </View>
      {/* Heatmap Toggle Button */}
      <View style={styles.heatmapToggle}>
        <Button
          mode="contained"
          onPress={() => setShowHeatmap((prev) => !prev)}
          icon={showHeatmap ? 'eye-off' : 'eye'}
        >
          {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
        </Button>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity
          style={styles.searchInput}
          activeOpacity={1}
          onPress={() => {
            router.push({
              pathname: '/LocationSearch',
            });
          }}
        >
          <View style={styles.searchContent}>
            <IconButton icon="magnify" size={25} style={styles.iconButton} />
            <Text style={styles.placeholderText}>Search nearby locations</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <MapView
        style={styles.map}
        // onMapReady={() => console.log("Map is ready")}
        // provider={PROVIDER_GOOGLE} // commented out because ios doesn't like google maps api, so by default ios will use apple maps
        initialRegion={{
          latitude: -33.916669653790876,
          longitude: 151.2279911954,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }}
        showsUserLocation={true}
      >
        {/* Markers */}
        {bearGuide.locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.coordinates.lat,
              longitude: location.coordinates.long,
            }}
            title={location.name}
            description={location.address}
            onPress={() =>
              navigation.navigate('LocationDetail', { locationId: location.id })
            }
          />
        ))}
      </MapView>

      <Modal visible={page1} dismissable={false}>
        <View style={{ alignItems: 'flex-end' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              gap: 20,
              paddingHorizontal: 30,
              width: '100%',
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.elevation['level3'],
                padding: 15,
                borderRadius: 20,
                width: 250,
              }}
            >
              <Text variant="titleLarge">Welcome to Bearguide</Text>
              <Text style={{ textAlign: 'center' }}>
                The BEST way to find a place to facilitate collaborative
                meetings, events, and study groups ON CAMPUS!
              </Text>
            </View>
            <IconButton
              mode="contained-tonal"
              icon="arrow-right"
              size={30}
              onPress={() => {
                setPage1(false);
                setPage2(true);
              }}
            />
          </View>

          <Image source={BearPage1} />
        </View>
      </Modal>
      <Modal visible={page2} dismissable={false}>
        <View style={{ alignItems: 'flex-start' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={BearPage2} />
            <IconButton
              mode="contained-tonal"
              icon="arrow-right"
              size={30}
              onPress={() => {
                setPage2(false);
                setPage3(true);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.elevation['level3'],
                padding: 15,
                borderRadius: 20,
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                Search and filter for the type of space you are looking for!{' '}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  debugMenu: {
    position: 'absolute',
    top: 190,
    left: 10,
    zIndex: 10,
  },
  heatmapToggle: {
    position: 'absolute',
    top: 140,
    left: 10,
    zIndex: 10,
  },
  searchBar: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  searchInput: {
    backgroundColor: '#fdf3ee',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    margin: 0,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  placeholderText: {
    color: '#5a5a5a',
    fontSize: 17,
    fontWeight: '400',
    marginVertical: 'auto',
  },
  heatmapPoint: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    zIndex: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MapPage;
