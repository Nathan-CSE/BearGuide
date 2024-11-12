import { useState, createContext, useContext } from 'react';
import { View, Pressable, ScrollView, Text } from 'react-native';
import { Button, Chip, Searchbar, Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FilterChip from '../components/search/FilterChip';
import SpaceTypeFilter from '../components/search/filters/SpaceTypeFilter';

export const OverlayContext = createContext(null);
export const FiltersContext = createContext(null);

const LocationSearch = () => {
  const [searchField, setSearchField] = useState("");
  const [chipSelected, setChipSelected] = useState("");

  const [filterFns, setFilterFns] = useState([null, null]);
  const [overlayView, setOverlayView] = useState();

  const theme = useTheme();
  const router = useRouter();

  const openMenu = (type) => {
    // Open a menu based on the type of menu

  }

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
      <FiltersContext.Provider value={[ filterFns, setFilterFns ]}>
        <View style={{ width: '100%', height: '100%' }}>
          {overlayView && <Surface elevation={3} style={{ 
            position: 'absolute',
            width: '100%', 
            height: '100%', 
            zIndex: 1
          }}>
            {overlayView}
          </Surface>}
          <View><Text>LOCATION LIST</Text></View>
        </View>
      </FiltersContext.Provider>
    </View>
  );
}

export default LocationSearch;