import { Text, View } from "react-native";
import FilterChip from "../FilterChip";

const SpaceTypeFilter = ({selected, setSelected, setFilterView}) => {
  const viewGroup = (
    <View>
      <Text>Space Type Filter</Text>
    </View>
  )

  return (
    <FilterChip 
      id="space" 
      label="Space Type" 
      selected={selected}
      setSelected={setSelected}
      view={{
        setFilterView: setFilterView,
        view: viewGroup
      }}
    />
  );
}

export default SpaceTypeFilter;