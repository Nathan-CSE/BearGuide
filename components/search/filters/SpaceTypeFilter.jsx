import { Pressable, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useContext, useEffect } from "react";
import { FiltersContext } from "../../../app/LocationSearch";

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
        console.log(filterKey)
        filterCheckMap[filterKey](true);
      }
    }
  }, [filters]);

  return (
    <View>
      <Text style={{ 
        fontSize: 20, 
        fontWeight: 600,
        alignItems: 'center',
        textAlign: 'center',
        padding: 16
      }}>
        Space Type Filter
      </Text>
      <View style={{ paddingHorizontal: 32, paddingVertical: 16 }}>
        <Pressable style={{ 
            flexDirection: 'row', 
            gap: 16, 
            alignItems: 'center'
          }} 
          onPress={() => {
            setStudyChecked((prev) => {
              applyFilter({ type: 'study', filter: (item) => {
              } }, !prev);
              return !prev;
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

export default SpaceTypeFilter;