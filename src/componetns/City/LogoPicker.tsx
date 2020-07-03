import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, StyleSheet, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";

import { COLORS } from "../../styles/global";

const windowWidth = Dimensions.get('window').width;

interface LogoPickerProps {
  logo: string
  setInputsValue: any
}

export const LogoPicker: React.FC<LogoPickerProps> = ({ logo, setInputsValue }) => {

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Нужен доступ к просмотру галереи.");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setInputsValue((prev: any) => ({ ...prev, logo: result.uri }));
    }
  };

  return (
    <View>
      {!logo ? (
        <TouchableOpacity style={styles.btnAddLogo} onPress={pickImage}>
          <AntDesign name="addfile" size={48} color='white' />
        </TouchableOpacity>
      ) : (
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: logo }} style={styles.imgLogo} />
          </TouchableOpacity>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddLogo: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    backgroundColor: COLORS.MAIN,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgLogo: {
    resizeMode: 'stretch',
    width: windowWidth * 0.35,
    borderRadius: 5,
    height: windowWidth * 0.35,
  }
});
