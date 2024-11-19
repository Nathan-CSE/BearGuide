import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useContext, useEffect } from "react";
import { FiltersContext } from "../SearchContexts";
import EStyleSheet from 'react-native-extended-stylesheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AmenitiesFilter = () => {
  const [isPowerChecked, setPowerChecked] = useState(false);
  const [filters, setFilters] = useContext(FiltersContext);

  // Due to the overlay, this will adjust content to be within
  // the actual surface area based on screen offsets.
  const insets = useSafeAreaInsets();

  const filterMap = {
    'power': {
      isCheck: isPowerChecked,
      setCheck: setPowerChecked,
      name: 'Power'
    },
  }

  const applyFilter = (filterObj, setFilter = true) => {
    const filterParent = filters['amenities'] || {};

    if (setFilter) {
      filterParent[filterObj.type] = filterObj;
    } else {
      delete filterParent[filterObj.type]
    }
    
    setFilters({...filters, 'amenities': filterParent});
  };
 
  useEffect(() => {
    // Only focus on this filter type
    let filterTypes = filters['amenities'];

    // If there are filters, set the state of the checkboxes
    if (filterTypes) {
      for (let filterKey in filterTypes) {
        filterMap[filterKey].setCheck(true);
      }
    }
  }, [filters]);

  return (
    <View style={{ paddingTop: insets.top - 32 }}>
      <Text style={styles.filterTitle}>Amenities Filter</Text>
      <View style={styles.filterList}>
        {
          Object.entries(filterMap).map(([key, value]) => {
            return (
              <Pressable key={key} style={[
                styles.filterPressable,
                EStyleSheet.child(styles, 'filterList', key)
              ]} 
                onPress={() => {
                  value.setCheck((prev) => {
                    applyFilter({ type: key, filter: (item) => {
                      return item.amenities.some((amenity) => amenity.category.toLowerCase() == key)
                    }}, !prev);
                  });
                }}
              >
                <Checkbox 
                  value={value.isCheck}
                />
                <Text style={{ fontSize: 18 }}>{value.name}</Text>
              </Pressable>
              )
          })
        }
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  filterTitle: {
    fontSize: 20, 
    fontWeight: '600',
    alignItems: 'center',
    textAlign: 'center',
    padding: 16
  },
  filterPressable: { 
    flexDirection: 'row', 
    gap: 8, 
    alignItems: 'center',
    paddingVertical: 16,
  },
  filterList: { 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    gap: 12,
  },
  'filterList:nth-child-even': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default AmenitiesFilter;