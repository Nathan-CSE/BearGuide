import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useContext, useEffect } from "react";
import { FiltersContext, OverlayContext } from "../SearchContexts";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from "react-native-paper";
import FilterStyles from "./FilterStyles";
import EStyleSheet from 'react-native-extended-stylesheet';

const SpaceTypeFilter = () => {
  const [isStudyChecked, setStudyChecked] = useState(false);
  const [isBuildingChecked, setBuildingChecked] = useState(false);
  const [isCafeChecked, setCafeChecked] = useState(false);
  const [isCompLabChecked, setCompLabChecked] = useState(false);
  const [isLectureHallChecked, setLectureHallChecked] = useState(false);
  const [isTutorialChecked, setTutorialChecked] = useState(false);
  const [filters, setFilters] = useContext(FiltersContext);
  const [overlayContext, setOverlayContext] = useContext(OverlayContext);

  // Due to the overlay, this will adjust content to be within
  // the actual surface area based on screen offsets.
  const insets = useSafeAreaInsets();

  const filterMap = {
    'study': {
      isCheck: isStudyChecked,
      setCheck: setStudyChecked,
      name: 'Study Space'
    },
    'building': {
      isCheck: isBuildingChecked,
      setCheck: setBuildingChecked,
      name: 'Building'
    },
    'cafe': {
      isCheck: isCafeChecked,
      setCheck: setCafeChecked,
      name: 'Cafe'
    },
    'computerlab': {
      isCheck: isCompLabChecked,
      setCheck: setCompLabChecked,
      name: 'Computer Lab'
    },
    'lecture': {
      isCheck: isLectureHallChecked,
      setCheck: setLectureHallChecked,
      name: 'Lecture Hall'
    },
    'tutorial': {
      isCheck: isTutorialChecked,
      setCheck: setTutorialChecked,
      name: 'Tutorial Room'
    }
  }

  const applyFilter = (filterObj, setFilter = true) => {
    const filterParent = filters['space'] || {};

    if (setFilter) {
      filterParent[filterObj.type] = filterObj;
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
        filterMap[filterKey].setCheck(true);
      }
    }
  }, [filters]);

  return (
    <View style={{ paddingTop: insets.top - 16 }}>
      <View style={FilterStyles.filterHeader}>
        <Text style={FilterStyles.filterTitle}>Space Type Filter</Text>
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
                      return item.spaceType.includes(value.name)
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

export default SpaceTypeFilter;