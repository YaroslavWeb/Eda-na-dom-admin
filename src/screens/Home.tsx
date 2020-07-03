import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { getCitiesFB, addCityFB, removeCityFB } from "../firebase/queries";
import { ICity } from "../interfaces";
import { FlatList } from "react-native-gesture-handler";
import { AddCity } from "../componetns/Home/AddCity";
import { CityCard } from '../componetns/Home/CityCard'

export const Home: React.FC = () => {
  const [cities, setCities] = React.useState<ICity[]>([]);

  React.useEffect(() => {
    getCitiesFB(setCities)
  }, [])

  const addCity = (name: string) => {
    addCityFB(name, setCities)
  }

  const removeCity = (id: string) => {
    removeCityFB(id, setCities)
  }

  return (
    <View style={styles.container}>
      <AddCity onSubmit={addCity} />
      {cities.length !== 0
        ? (
          <FlatList
            data={cities}
            keyExtractor={(item) => "city_" + item.id}
            renderItem={({ item }) => <CityCard removeCity={removeCity} city={item} />}
          />
        )
        : (<Text>Подождите...</Text>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});
