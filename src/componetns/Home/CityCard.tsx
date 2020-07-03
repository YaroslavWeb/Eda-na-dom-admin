import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { globalStyles, COLORS } from "../../styles/global";
import { ICity } from "../../interfaces";

interface ICityItemProps {
  city: ICity;
  removeCity: (id: string) => void
}

export const CityCard: React.FC<ICityItemProps> = ({ city, removeCity }) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    Alert.alert(
      "Предупреждение!",
      "Вы действительно хотите удалить город?",
      [
        { text: "Нет" },
        { text: "Да", onPress: () => removeCity(city.id) },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity
      delayLongPress={4000}
      onLongPress={pressHandler}
      onPress={() => {
        navigation.navigate("City", city);
      }}
    >
      <View style={styles.card}>
        <Text style={[globalStyles.textSmall, styles.name]}>{city.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 5,
    marginBottom: 10,
  },
  name: {
    color: COLORS.FONT,
  },
});
