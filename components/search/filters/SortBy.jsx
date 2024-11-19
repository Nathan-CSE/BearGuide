import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useContext, useEffect } from "react";
import { SortContext } from "../SearchContexts";
import EStyleSheet from 'react-native-extended-stylesheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SortBy = () => {
  const [sortOption, setSortOption] = useContext(SortContext);

  // Due to the overlay, this will adjust content to be within
  // the actual surface area based on screen offsets.
  const insets = useSafeAreaInsets();

  const applySort = (type, fn) => {
    setSortOption( {type: type, fn: fn} );
  };

  const sortMap = {
    'alphabetical': {
      name: 'Alphabetical',
      fn: (a, b) => {}
    },
    'rev_alphabetical': {
      name: 'Reverse Alphabetical',
      fn: (a, b) => {}
    },
  }

  return (
    <View style={{ paddingTop: insets.top - 16 }}>
      <Text style={styles.filterTitle}>Sort By</Text>
      <View style={styles.filterList}>
        {
          Object.entries(sortMap).map(([key, value]) => {
            return (
              <Pressable key={key} style={[
                styles.filterPressable,
                EStyleSheet.child(styles, 'filterList', key)
              ]} 
                onPress={() => {
                    applySort({ type: key, filter: value.fn });
                }}
              >
                <Checkbox 
                  value={sortOption.type === key}
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

export default SortBy;