import { useState } from 'react';
import { View, Pressable, ScrollView, Text } from 'react-native';
import { Button, Chip, Searchbar, Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FilterChip from '../components/search/FilterChip';
import SpaceTypeFilter from '../components/search/filters/SpaceTypeFilter';

const LocationSearch = () => {
  const [searchField, setSearchField] = useState("");
  const [chipSelected, setChipSelected] = useState("");
  const [filterView, setFilterView] = useState();
  const [filterFn, setFilterFn] = useState();
  const theme = useTheme();
  const router = useRouter();

  const openMenu = (type) => {
    // Open a menu based on the type of menu

  }

  return (
    <View>

      <SafeAreaView style={{paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>        
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
          <View style={{ paddingVertical: 8, paddingRight: 8, borderRightWidth: 1, borderRightColor: 'grey'}}>
            <Chip 
              icon={(chipSelected === 'sort' && "menu-right-outline") || "menu-down"} 
              selected={chipSelected === 'sort'} 
              showSelectedOverlay={true}
              onPress={() => {}}
            >
              Sort By
            </Chip>
          </View>
          <ScrollView horizontal contentContainerStyle={{gap: 16, paddingLeft: 8, paddingVertical: 8}}>
            <SpaceTypeFilter 
              selected={chipSelected}
              setSelected={setChipSelected}
              setFilterView={setFilterView}
            />
            <FilterChip
              id='capacity' 
              label="Capacity" 
              selected={chipSelected}
              setSelected={setChipSelected}
            />
            <Chip icon={"menu-down"} onPress={() => {}}>Capacity</Chip>
            <Chip icon={"menu-down"} onPress={() => {}}>Amenities</Chip>
            <Chip icon={"menu-down"} onPress={() => {}}>Access</Chip>
            <Chip icon={"menu-down"} onPress={() => {}}>Accessibility</Chip>
          </ScrollView>
        </View>
      </SafeAreaView>
      <View style={{ width: '100%', height: '100%' }}>
        {filterView && <Surface elevation={3} style={{ 
          position: 'absolute',
          width: '100%', 
          height: '100%', 
          zIndex: 1
        }}>
          {filterView}
        </Surface>}
        <View><Text>LOCATION LIST</Text></View>
      </View>
    </View>
  );
}

export default LocationSearch;