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
    setSortOption({ type: type, fn: fn });
  };

  const sortMap = {
    'alphabetical': {
      name: 'Alphabetical [A-Z]',
      fn: (a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
    },
    'rev_alphabetical': {
      name: 'Reverse Alphabetical [Z-A]',
      fn: (a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      }
    },
    'reviews': {
      name: 'Reviews (High to Low)',
      fn: (a, b) => {
        return b.reviews.summary.overall - a.reviews.summary.overall
      }
    },
    'rev_reviews': {
      name: 'Reviews (Low to High)',
      fn: (a, b) => {
        return a.reviews.summary.overall - b.reviews.summary.overall
      }
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
                  applySort(key, value.fn);
                }}
              >
                <Checkbox 
                  value={sortOption.type == key}
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