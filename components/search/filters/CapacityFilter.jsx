import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState, useContext, useEffect } from "react";
import { FiltersContext } from "../SearchContexts";
import EStyleSheet from 'react-native-extended-stylesheet'
import Slider from "@react-native-community/slider";
import { TextInput } from "react-native-paper";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MIN_CAPACITY = 0;
const MAX_CAPACITY = 400;

const CapacityFilter = () => {
  // Due to the overlay, this will adjust content to be within
  // the actual surface area based on screen offsets.
  const insets = useSafeAreaInsets();

  const [minCapacity, setMinCapacity] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(400);
  const [filters, setFilters] = useContext(FiltersContext);

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

  const applyFilter = (filterObj, setFilter = true) => {
    const filterParent = filters['capacity'] || {};

    if (setFilter) {
      filterParent[filterObj.type] = filterObj.filter;
    } else {
      delete filterParent[filterObj.type]
    }
    
    setFilters({...filters, 'capacity': filterParent});
  };
 
  useEffect(() => {
    // Only focus on this filter type
    let filterTypes = filters['capacity'];

    // If there are filters, set the state of the checkboxes
    if (filterTypes) {
      filterMap['minCapacity'].setCapacity(filterMap['minCapacity'].capacity);
      filterMap['maxCapacity'].setCapacity(filterMap['maxCapacity'].capacity);
    }
  }, [filters]);

  const handleMinChange = (value) => {
    setMinCapacity(value);

    if (value > maxCapacity) {
      value = maxCapacity;
      setTimeout(() => {
        setMinCapacity(value);
      }, 5);
    } 
  };

  const handleMaxChange = (value) => {
    setMaxCapacity(value);

    if (value < minCapacity) {
      value = minCapacity;
      setTimeout(() => {
        setMaxCapacity(value);
      }, 5);
    }
  };

  const applyBothFilters = () => {
    applyFilter({ type: 'minCapacity', filter: 
      (item) => item.capacity >= minCapacity
    });
    applyFilter({ type: 'maxCapacity', filter: 
      (item) => item.capacity <= maxCapacity 
    });
  }

  return (
    <View style={{ paddingTop: insets.top - 32 }}>
      <Text style={styles.filterTitle}>Capacity Filter</Text>
      <View style={styles.filterList}>
        <View>
          <Text style={{ fontSize: 16 }}>Minimum Capacity</Text>
          <Slider
            minimumValue={MIN_CAPACITY}
            maximumValue={MAX_CAPACITY}
            value={minCapacity}
            onValueChange={handleMinChange}
            onSlidingComplete={() => {
              setTimeout(() => {
                applyBothFilters();
              }, 25);
            }}
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
              setTimeout(() => {
                applyBothFilters();
              }, 25);
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
            onSlidingComplete={() => {
              setTimeout(() => {
                applyBothFilters();
              }, 25);
            }}
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
              setTimeout(() => {
                applyBothFilters();
              }, 25);
            }}
          />
        </View>
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
    gap: 64,
  },
  'filterList:nth-child-even': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default CapacityFilter;