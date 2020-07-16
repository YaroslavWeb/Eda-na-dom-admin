import React from "react";
import "./src/firebase/connection";
import { TouchableOpacity, View } from "react-native";
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { YellowBox } from "react-native";
import _ from "lodash";

import { Home } from "./src/screens/Home";
import { City } from "./src/screens/City";
import { Categories } from "./src/screens/Categories";
import { CityBaner } from "./src/screens/CityBaner";
import { About } from "./src/screens/About";

import { COLORS } from "./src/styles/global";

// Cleane firebase connection warning
YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message: string) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.MAIN
          },
          headerTintColor: '#FFFFFF'
        }}
      >
        <Stack.Screen
          name="Cities"
          component={Home}
          options={({ navigation }: any) => ({
            title: 'Города',
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Categories') }} style={{ marginRight: 10 }}>
                  <Feather name="list" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('About') }} style={{ marginRight: 10 }}>
                  <AntDesign name="questioncircleo" size={32} color="white" />
                </TouchableOpacity>
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="City"
          component={City}
          options={({ route, navigation }: any) => ({
            title: route.params.name,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('CityBanner', { city: route.params }) }} style={{ marginRight: 10 }}>
                  <Entypo name="images" size={32} color="white" />
                </TouchableOpacity>
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="Categories"
          component={Categories}
          options={() => ({
            title: 'Категории'
          })}
        />

        <Stack.Screen
          name="CityBanner"
          component={CityBaner}
          options={() => ({
            title: 'Баннеры города'
          })}
        />

        <Stack.Screen
          name="About"
          component={About}
          options={() => ({
            title: 'О программе'
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
