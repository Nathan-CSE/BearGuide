import { Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState, useContext } from "react";
import { FiltersContext } from "../../../app/LocationSearch";

const SpaceTypeFilter = () => {
  const [isStudyChecked, setStudyChecked] = useState(false);
  const [filterFns, setFilterFns] = useContext(FiltersContext);

  return (
    <View>
      <Text>Space Type Filter</Text>
      <Checkbox color={isStudyChecked ? '#FF0000' : undefined} value={isStudyChecked} onValueChange={setStudyChecked} />
    </View>
  );
}

export default SpaceTypeFilter;