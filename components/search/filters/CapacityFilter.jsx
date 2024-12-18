import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState, useContext, useEffect } from "react";
import { FiltersContext, OverlayContext } from "../SearchContexts";
import EStyleSheet from 'react-native-extended-stylesheet'
import Slider from "@react-native-community/slider";
import { TextInput } from "react-native-paper";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FilterStyles from "./FilterStyles";
import { Icon } from "react-native-paper";

const MIN_CAPACITY = 0;
const MAX_CAPACITY = 400;
let timeout = null;

const CapacityFilter = () => {
  // Due to the overlay, this will adjust content to be within
  // the actual surface area based on screen offsets.
  const insets = useSafeAreaInsets();

  const [minCapacity, setMinCapacity] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(400);
  const [filters, setFilters] = useContext(FiltersContext);
  const [overlayContext, setOverlayContext] = useContext(OverlayContext);

  const filterMap = {
    'minCapacity': {
      capacity: minCapacity,
      setCapacity: setMinCapacity,
      name: 'Min Capacity'
    },
    'maxCapacity': {
      capacity: maxCapacity,
      setCapacity: setMaxCapacity,
      name: 'Max Capacity'
    },
  };

  const applyFilters = (filterArr, setFilter = true) => {
    const filterParent = filters['capacity'] || {};

    if (setFilter) {
      for (let filterObj of filterArr) {
        filterParent[filterObj.type] = filterObj;
      }
    } else {
      for (let filterObj of filterArr) {
        delete filterParent[filterObj.type];
      }
    }
    
    setFilters({...filters, 'capacity': filterParent});
  };

  const debounce = (fn, wait) => {
    return function(...args) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
        fn(...args);
      }, wait);
    }
  }
 
  useEffect(() => {
    // Only focus on this filter type
    let filterTypes = filters['capacity'];

    // console.log(filterTypes)

    // If there are filters, set the states
    if (filterTypes) {
      filterMap['minCapacity'].setCapacity(filterTypes['minCapacity']?.capacity ?? MIN_CAPACITY);
      filterMap['maxCapacity'].setCapacity(filterTypes['maxCapacity']?.capacity ?? MAX_CAPACITY);
    }
  }, [filters]);

  const handleMinChange = (value) => {
    setMinCapacity(value);

    if (value > maxCapacity) {
      value = maxCapacity;
      setTimeout(() => {
        setMinCapacity(value);
        applyBothFilters();
      }, 5);
    } 

    debounce(() => {applyBothFilters(value, maxCapacity)}, 100)();
  };

  const handleMaxChange = (value) => {
    setMaxCapacity(value);

    if (value < minCapacity) {
      value = minCapacity;
      setTimeout(() => {
        setMaxCapacity(value);
      }, 5);
    }

    debounce(() => {applyBothFilters(minCapacity, value)}, 100)();
  };

  const applyBothFilters = (min, max) => {
    applyFilters([{ 
      type: 'minCapacity', 
      capacity: min, 
      filter: 
        (item) => item.capacity >= min
    },{ 
      type: 'maxCapacity', 
      capacity: max, 
      filter: 
        (item) => item.capacity <= max 
    }])
  }

  return (
    <View style={{ paddingTop: insets.top - 16 }}>
      <View style={FilterStyles.filterHeader}>
        <Text style={FilterStyles.filterTitle}>Capacity Filter</Text>
        <Pressable style={FilterStyles.filterPressableClose}
          onPress={() => {
            setOverlayContext(null);
          }}
        >
          <Icon source="close" size={32} color="black" />
        </Pressable>
      </View>
      <View style={{...FilterStyles.filterList, gap: 64}}>
        <View>
          <Text style={{ fontSize: 16 }}>Minimum Capacity</Text>
          <Slider
            minimumValue={MIN_CAPACITY}
            maximumValue={MAX_CAPACITY}
            value={minCapacity}
            onValueChange={handleMinChange}
            onSlidingComplete={handleMinChange}
            step={1}
          />
          <View style={{
            justifyContent: 'space-between', 
            flexDirection: 'row', 
          }}>
            <Text>{MIN_CAPACITY}</Text>
            <Text style={{ textAlign: 'right' }}>{MAX_CAPACITY}</Text>
          </View>
          <TextInput
            value={String(minCapacity)}
            onChangeText={(text) => { 
              let parsedText = parseInt(text.replace(/[^0-9]/g, ''));
              handleMinChange(parsedText);
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Maximum Capacity</Text>
          <Slider
            minimumValue={MIN_CAPACITY}
            maximumValue={MAX_CAPACITY}
            value={maxCapacity}
            onValueChange={handleMaxChange}
            onSlidingComplete={handleMaxChange}
            step={1}
          />
          <View style={{
            justifyContent: 'space-between', 
            flexDirection: 'row', 
          }}>
            <Text>{MIN_CAPACITY}</Text>
            <Text style={{ textAlign: 'right' }}>{MAX_CAPACITY}</Text>
          </View>
          <TextInput
            value={String(maxCapacity)}
            onChangeText={(text) => { 
              let parsedText = parseInt(text.replace(/[^0-9]/g, ''));
              handleMaxChange(parsedText);
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default CapacityFilter;