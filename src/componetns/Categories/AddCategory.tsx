import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS, globalStyles } from "../../styles/global";

interface IAddCategoryProps {
  onSubmit: (name: string) => void;
}

export const AddCategory: React.FC<IAddCategoryProps> = ({ onSubmit }) => {
  const [value, setValue] = React.useState<string>("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue("");
    } else {
      Alert.alert("Название категории не может быть пустым.");
    }
  };

  return (
    <View style={styles.action}>
      <TextInput
        onChangeText={setValue}
        value={value}
        placeholder="Введите название категории..."
        style={[globalStyles.textSmall, styles.cityInput]}
      />
      <TouchableOpacity onPress={pressHandler}>
        <Ionicons
          name="md-add-circle-outline"
          size={46}
          style={{ marginRight: "5%" }}
          color={ COLORS.MAIN }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cityInput: {
    color: COLORS.FONT,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.MAIN,
    padding: 8,
    width: "80%",
  },
});
