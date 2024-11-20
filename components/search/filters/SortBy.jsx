import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useContext, useEffect } from "react";
import { SortContext, OverlayContext } from "../SearchContexts";
import EStyleSheet from 'react-native-extended-stylesheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from "react-native-paper";
import FilterStyles from "./FilterStyles";

const SortBy = () => {
  const [sortOption, setSortOption] = useContext(SortContext);
  const [overlayContext, setOverlayContext] = useContext(OverlayContext);

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
      <View style={FilterStyles.filterHeader}>
        <Text style={FilterStyles.filterTitle}>Sort By</Text>
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
          Object.entries(sortMap).map(([key, value]) => {
            return (
              <Pressable key={key} style={[
                FilterStyles.filterPressable,
                EStyleSheet.child(FilterStyles, 'filterList', key)
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

export default SortBy;