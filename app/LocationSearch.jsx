import { useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { Button, Chip, Searchbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const LocationSearch = () => {
  const [searchField, setSearchField] = useState("");
  const theme = useTheme();
  const router = useRouter();

  return (
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
          <Chip icon={"menu-down"} onPress={() => {}}>Sort By</Chip>
        </View>
        <ScrollView horizontal contentContainerStyle={{gap: 16, paddingLeft: 8, paddingVertical: 8}}>
          <Chip icon={"menu-down"} onPress={() => {}}>Space Type</Chip>
          <Chip icon={"menu-down"} onPress={() => {}}>Capacity</Chip>
          <Chip icon={"menu-down"} onPress={() => {}}>Amenities</Chip>
          <Chip icon={"menu-down"} onPress={() => {}}>Access</Chip>
          <Chip icon={"menu-down"} onPress={() => {}}>Accessibility</Chip>
        </ScrollView>
      </View>
      <View>

      </View>
    </SafeAreaView>
  );
}

export default LocationSearch;