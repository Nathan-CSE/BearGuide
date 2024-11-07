import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const LocationSearch = () => {
  const [searchField, setSearchField] = useState("");
  const theme = useTheme();

  return (
    <View>
      <Button icon={"arrow-left"} onPress={() => console.log("Search button pressed")}>
      </Button>
      <Searchbar
        placeholder="Search nearby locations"
        onChangeText={setSearchField}
        value={searchField}
        theme={theme}
      />
    </View>
  );
}

export default LocationSearch;