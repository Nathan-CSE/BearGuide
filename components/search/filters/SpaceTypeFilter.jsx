import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useContext, useEffect } from "react";
import { FiltersContext } from "../SearchContexts";

const SpaceTypeFilter = () => {
  const [isStudyChecked, setStudyChecked] = useState(false);
  const [filters, setFilters] = useContext(FiltersContext);

  const filterCheckMap = {
    'study': setStudyChecked,
  }

  const applyFilter = (filterObj, setFilter = true) => {
    const filterParent = filters['space'] || {};

    if (setFilter) {
      filterParent[filterObj.type] = filterObj.filter;
    } else {
      delete filterParent[filterObj.type]
    }
    
    setFilters({...filters, 'space': filterParent});
  };
 
  useEffect(() => {
    // Only focus on this filter type
    let filterTypes = filters['space'];

    // If there are filters, set the state of the checkboxes
    if (filterTypes) {
      for (let filterKey in filterTypes) {
        filterCheckMap[filterKey](true);
      }
    }
  }, [filters]);

  return (
    <View>
      <Text style={styles.filterTitle}>Space Type Filter</Text>
      <View style={{ paddingHorizontal: 32, paddingVertical: 16 }}>
        <Pressable style={styles.filterPressable} 
          onPress={() => {
            setStudyChecked((prev) => {
              applyFilter({ type: 'study', filter: (item) => {
                return false;
              }}, !prev);
            });
          }}
        >
          <Checkbox 
            value={isStudyChecked}
          />
          <Text style={{ fontSize: 18 }}>Study Spaces</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterTitle: {
    fontSize: 20, 
    fontWeight: '600',
    alignItems: 'center',
    textAlign: 'center',
    padding: 16
  },
  filterPressable: { 
    flexDirection: 'row', 
    gap: 16, 
    alignItems: 'center'
  }
});

export default SpaceTypeFilter;