import { View, Pressable, ScrollView } from 'react-native';
import { Button, Chip, Searchbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const FilterChip = ({ label, selected, setSelected, id, view }) => {
  return (
    <Chip 
      icon={(selected === id && "menu-right-outline") || "menu-down"} 
      selected={selected === id} 
      showSelectedOverlay={true}
      onPress={() => {
        setSelected((prev) => {
          if(prev === id) {
            view.setFilterView(null);
            return '';
          } else {
            view.setFilterView(view.view);
            return id;
          }
        });
      }}
    >
      {label}
    </Chip>
  )
};

export default FilterChip;