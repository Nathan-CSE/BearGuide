import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useContext, useEffect } from "react";
import { FiltersContext } from "../SearchContexts";
import EStyleSheet from 'react-native-extended-stylesheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SpaceTypeFilter = () => {
  const [isStudyChecked, setStudyChecked] = useState(false);
  const [isBuildingChecked, setBuildingChecked] = useState(false);
  const [isCafeChecked, setCafeChecked] = useState(false);
  const [isCompLabChecked, setCompLabChecked] = useState(false);
  const [isLectureHallChecked, setLectureHallChecked] = useState(false);
  const [isTutorialChecked, setTutorialChecked] = useState(false);
  const [filters, setFilters] = useContext(FiltersContext);

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
        filterMap[filterKey].setCheck(true);
      }
    }
  }, [filters]);

  return (
    <View style={{ paddingTop: insets.top - 32 }}>
      <Text style={styles.filterTitle}>Space Type Filter</Text>
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

export default SpaceTypeFilter;