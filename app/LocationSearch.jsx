import { useState, createContext, useContext, useEffect } from 'react';
import { View, Pressable, ScrollView, Text, Image } from 'react-native';
import { Button, Chip, List, Searchbar, Surface, Portal } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FilterChip from '../components/search/FilterChip';
import SpaceTypeFilter from '../components/search/filters/SpaceTypeFilter';
import { useBearGuide } from './BearGuideContext';
import { OverlayContext, FiltersContext } from '../components/search/SearchContexts';
import CapacityFilter from '../components/search/filters/CapacityFilter';

const LocationSearch = () => {
  const { bearGuide, setBearGuide, tools } = useBearGuide();

  const [searchField, setSearchField] = useState("");
  const [chipSelected, setChipSelected] = useState("");

  const [filters, setFilters] = useState({});
  const [overlayView, setOverlayView] = useState();

  const theme = useTheme();
  const router = useRouter();

  const [filteredList, setFilteredList] = useState(bearGuide.locations);

  useEffect(() => {
    handleSearch(null);
  }, [filters]);

  const handleSearch = (e) => {
    if (e === null) {
      e = searchField
    } else {
      setSearchField(e);
    }
    console.log("Search Refreshing")
    let newList = bearGuide.locations.filter((location) => {
      for (let filterCategory of Object.values(filters)) {
        for (let filterType of Object.values(filterCategory)) {
          if (filterType(location) === false) {
            return false;
          }
        }
      }
      if (!location.name.toLowerCase().includes(e.toLowerCase())) {
        return false;
      }
      return true;
    });

    setFilteredList(newList);
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
                onChangeText={handleSearch}
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
                    component={<SpaceTypeFilter />}
                  />
                  <FilterChip
                    id='capacity' 
                    label="Capacity" 
                    selected={chipSelected}
                    setSelected={setChipSelected}
                    component={<CapacityFilter />}
                  />
                  <Chip icon={"menu-down"} onPress={() => {}}>Amenities</Chip>
                  <Chip icon={"menu-down"} onPress={() => {}}>Access</Chip>
                  <Chip icon={"menu-down"} onPress={() => {}}>Accessibility</Chip>
              </ScrollView>
            </View>
        </OverlayContext.Provider>
      </SafeAreaView>
      <View style={{ width: '100%', height: '100%' }}>
        {overlayView && 
          <Surface elevation={3} style={{ 
            position: 'absolute',
            width: '100%', 
            height: '100%', 
            zIndex: 10
          }}>
            <Portal>
              <FiltersContext.Provider value={[ filters, setFilters ]}>
                <View style={{ top: 148 }}>
                  {overlayView}
                </View>
              </FiltersContext.Provider>
            </Portal>
          </Surface>
        }
        <FiltersContext.Provider value={[ filters, setFilters ]}>
          <View style={{ zIndex: -1 }}>
            <List.Section 
              title='Locations' 
              style={{ paddingHorizontal: 16 }}
              titleStyle={{ paddingHorizontal: 0 }}
            >
              {filteredList.map((location) => (
                <List.Item
                  key={location.id}
                  title={location.name}
                  description={location.address}
                  onPress={() => {console.log('Route to Location: ', location.name)}}
                  left={() => {
                    let leftElement = <List.Icon icon="map-marker" style={{ flexGrow: 1 }}/>
                    if (location.images.length > 0)
                      leftElement = <Image 
                        source={{ uri: location.images[0] }} 
                        style={{ width: 72, height: 72, borderRadius: 8 }} 
                      />
                    return (
                      <View style={{ width: 72, height: 72 }}>
                        {leftElement}
                      </View>
                    )
                  }}
                />
              ))}
            </List.Section>
          </View>
        </FiltersContext.Provider>
      </View>
    </View>
  );
}

export default LocationSearch;