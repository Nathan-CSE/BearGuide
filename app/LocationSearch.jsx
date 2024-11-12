import { useState, createContext, useContext } from 'react';
import { View, Pressable, ScrollView, Text, Image } from 'react-native';
import { Button, Chip, List, Searchbar, Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FilterChip from '../components/search/FilterChip';
import SpaceTypeFilter from '../components/search/filters/SpaceTypeFilter';
import { useBearGuide } from './BearGuideContext';
import { OverlayContext, FiltersContext } from '../components/search/SearchContexts';

const LocationSearch = () => {
  const { bearGuide, setBearGuide, tools } = useBearGuide();

  const [searchField, setSearchField] = useState("");
  const [chipSelected, setChipSelected] = useState("");

  const [filters, setFilters] = useState({});
  const [overlayView, setOverlayView] = useState();

  const theme = useTheme();
  const router = useRouter();

  return (
    <View>
      <SafeAreaView style={{paddingHorizontal: 16 }}>
        <OverlayContext.Provider value={[ overlayView, setOverlayView ]}>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>        
              <Searchbar
                placeholder="Search nearby locations"
                onChangeText={setSearchField}
                value={searchField}
                theme={theme}
                icon={"arrow-left"}
                onIconPress={() => {router.dismiss(1)}}
                style={{ flexGrow: 1 }}
              />
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 8}}>
              <View style={{ 
                paddingVertical: 8, 
                paddingRight: 8, 
                borderRightWidth: 1, 
                borderRightColor: 'grey'
              }}>
                <Chip 
                  icon={(chipSelected === 'sort' && "menu-right-outline") || "menu-down"} 
                  selected={chipSelected === 'sort'} 
                  showSelectedOverlay={true}
                  onPress={() => {}}
                >
                  Sort By
                </Chip>
              </View>
              <ScrollView horizontal contentContainerStyle={{
                gap: 16, 
                paddingLeft: 8, 
                paddingVertical: 8
              }}>
                  <FilterChip
                    id='space' 
                    label="Space Type" 
                    selected={chipSelected}
                    setSelected={setChipSelected}
                    component={<SpaceTypeFilter/>}
                  />
                  <Chip icon={"menu-down"} onPress={() => {console.log(overlayView)}}>Capacity</Chip>
                  <Chip icon={"menu-down"} onPress={() => {}}>Amenities</Chip>
                  <Chip icon={"menu-down"} onPress={() => {}}>Access</Chip>
                  <Chip icon={"menu-down"} onPress={() => {}}>Accessibility</Chip>
              </ScrollView>
            </View>
        </OverlayContext.Provider>
      </SafeAreaView>
      <FiltersContext.Provider value={[ filters, setFilters ]}>
        <View style={{ width: '100%', height: '100%' }}>
          {overlayView && <Surface elevation={3} style={{ 
            position: 'absolute',
            width: '100%', 
            height: '100%', 
            zIndex: 1
          }}>
            {overlayView}
          </Surface>}
          <View>
            <List.Section 
              title='Locations' 
              style={{ paddingHorizontal: 24 }}
              titleStyle={{ paddingHorizontal: -8 }}
            >
              {bearGuide.locations.filter((location) => {
                for (let filterCategory of Object.values(filters)) {
                  for (let filterType of Object.values(filterCategory)) {
                    if (filterType(location) === false) {
                      return false;
                    }
                  }
                }
                return true;
              }).map((location) => (
                <List.Item
                  title={location.name}
                  description={location.address}
                  onPress={() => {console.log('Route to Location: ', location.name)}}
                  left={() => {
                    let leftElement = <List.Icon icon="map-marker" style={{ flexGrow: 1 }}/>
                    if (location.images.length > 0)
                      leftElement = <Image 
                        source={{ uri: location.images[0] }} 
                        style={{ width: 64, height: 64, borderRadius: 8 }} 
                      />
                    return (
                      <View style={{ width: 64, height: 64 }}>
                        {leftElement}
                      </View>
                    )
                  }}
                />
              ))}
            </List.Section>
          </View>
        </View>
      </FiltersContext.Provider>
    </View>
  );
}

export default LocationSearch;