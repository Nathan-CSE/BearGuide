import { useState, createContext, useContext, useEffect } from 'react';
import { View, Pressable, ScrollView, Text, Image, FlatList } from 'react-native';
import { Button, Chip, List, Searchbar, Surface, Portal } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FilterChip from '../components/search/FilterChip';
import SpaceTypeFilter from '../components/search/filters/SpaceTypeFilter';
import { useBearGuide } from './BearGuideContext';
import { 
  OverlayContext, FiltersContext, SortContext 
} from '../components/search/SearchContexts';
import CapacityFilter from '../components/search/filters/CapacityFilter';
import AmenitiesFilter from '../components/search/filters/AmenitiesFilter';
import SortBy from '../components/search/filters/SortBy';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LocationSearch = () => {
  const { bearGuide, setBearGuide, tools } = useBearGuide();

  const [searchField, setSearchField] = useState("");
  const [chipSelected, setChipSelected] = useState("");

  const [filters, setFilters] = useState({});
  const [overlayView, setOverlayView] = useState();
  const [sortOption, setSortOption] = useState({});

  const theme = useTheme();
  const router = useRouter();

  // Due to the overlay, this will adjust content to be within
  // the actual surface area based on screen offsets.
  const insets = useSafeAreaInsets();

  const [filteredList, setFilteredList] = useState(bearGuide.locations);

  useEffect(() => {
    handleSearch(null);
  }, [filters, sortOption]);

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
          if (filterType.filter(location) === false) {
            return false;
          }
        }
      }
      if (!location.name.toLowerCase().includes(e.toLowerCase())) {
        return false;
      }
      return true;
    });

    if (sortOption) {
      newList.sort(sortOption.fn);
    }

    setFilteredList(newList);
  }

  return (
    <View style={{  }}>
      <SafeAreaView style={{paddingHorizontal: 16, marginBottom: 0 }}>
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
                <FilterChip
                  id='sort' 
                  label="Sort By" 
                  selected={chipSelected}
                  setSelected={setChipSelected}
                  component={<SortBy />}
                />
              </View>
              <ScrollView horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 16, 
                  paddingLeft: 8, 
                  paddingVertical: 8
                }}
              >
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
                  <FilterChip
                    id='amenities' 
                    label="Amenities" 
                    selected={chipSelected}
                    setSelected={setChipSelected}
                    component={<AmenitiesFilter />}
                  />
              </ScrollView>
            </View>
        </OverlayContext.Provider>
        <View style={{ width: '100%', height: '100%' }}>
          {overlayView && 
            <Surface elevation={3} style={{ 
              position: 'absolute',
              width: '200%', 
              height: '100%', 
              marginHorizontal: '-50%',
              zIndex: 10
            }}>
              <Portal>
                <SortContext.Provider value={[ sortOption, setSortOption ]}>
                  <FiltersContext.Provider value={[ filters, setFilters ]}>
                    <View style={{ top: 148 }}>
                      {overlayView}
                    </View>
                  </FiltersContext.Provider>
                </SortContext.Provider>
              </Portal>
            </Surface>
          }
          <SortContext.Provider value={[ sortOption, setSortOption ]}>
            <FiltersContext.Provider value={[ filters, setFilters ]}>
              <View style={{ zIndex: -1, height: '65%' }}>
                <List.Section 
                  title='Locations' 
                  style={{ paddingHorizontal: 0 }}
                  titleStyle={{ paddingHorizontal: 0 }}
                >
                  <FlatList
                    data={filteredList}
                    style={{ height: '90%' }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <List.Item
                        key={item.id}
                        title={item.name}
                        description={item.address}
                        style={{ paddingHorizontal: 0 }}
                        onPress={() => {
                          router.push({
                            pathname: '/Location/LocationDetail',
                            params: { id: item.id }
                          }, {})
                        }}

                        left={() => {
                          let leftElement = <List.Icon icon="map-marker" style={{ flexGrow: 1 }}/>
                          if (item.images.length > 0)
                            leftElement = <Image 
                              source={{ uri: item.images[0] }} 
                              style={{ width: 72, height: 72, borderRadius: 8 }} 
                            />
                          return (
                            <View style={{ width: 72, height: 72 }}>
                              {leftElement}
                            </View>
                          )
                        }}
                      />
                    )}
                  />
                </List.Section>
              </View>
            </FiltersContext.Provider>
          </SortContext.Provider>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default LocationSearch;