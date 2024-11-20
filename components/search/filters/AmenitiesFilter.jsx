import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useContext, useEffect } from "react";
import { FiltersContext, OverlayContext } from "../SearchContexts";
import EStyleSheet from 'react-native-extended-stylesheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FilterStyles from "./FilterStyles";
import { Icon } from "react-native-paper";

const AmenitiesFilter = () => {
  const [isPowerChecked, setPowerChecked] = useState(false);
  const [filters, setFilters] = useContext(FiltersContext);
  const [overlayContext, setOverlayContext] = useContext(OverlayContext);

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
    <View style={{ paddingTop: insets.top - 16 }}>
      <View style={FilterStyles.filterHeader}>
        <Text style={FilterStyles.filterTitle}>Amenities Filter</Text>
        <Pressable style={FilterStyles.filterPressableClose}
          onPress={() => {
            setOverlayContext(null);
          }}
        >
          <Icon source="close" size={32} color="black" />
        </Pressable>
      </View>
      <View style={FilterStyles.filterList}>
        {
          Object.entries(filterMap).map(([key, value]) => {
            return (
              <Pressable key={key} style={[
                FilterStyles.filterPressable,
                EStyleSheet.child(FilterStyles, 'filterList', key)
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

export default AmenitiesFilter;