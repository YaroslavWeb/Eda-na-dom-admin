import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const Options: React.FC = () => {
  return (
    <View style={styles.container}>
        <Text>Редактирование пользоватлей</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});
