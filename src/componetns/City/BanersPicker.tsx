import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import { COLORS } from "../../styles/global";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface BanersPickerProps {
  baners: string[]
  setInputsValue: any
}

export const BanersPicker: React.FC<BanersPickerProps> = ({ baners, setInputsValue }) => {

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
      quality: 1,
    });


    if (!result.cancelled) {
      setInputsValue((prev: any) => ({ ...prev, baners: [...prev.baners, result.uri] }));
    }
  };
  const removeImage = (uri: string) => {
    setInputsValue((prev: any) => ({
      ...prev,
      baners: prev.baners.filter((baner: any) => {
        if (baner !== uri)
          return (baner)
      })
    }))
  }

  return (
    <View style={styles.banersContainer}>
      <ScrollView horizontal={true}>
        <TouchableOpacity style={styles.btnAddBaner} onPress={pickImage}>
          <AntDesign name="addfile" size={48} color="white" />
        </TouchableOpacity>
        {baners &&
          baners.map((image, index) => (
            <TouchableOpacity onLongPress={removeImage.bind(null, image)} key={'baner_' + index}>
              <Image source={{ uri: image }} style={styles.imgBaner} />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banersContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  btnAddBaner: {
    width: windowWidth * 0.4 - 10,
    height: windowHeight * 0.17 - 10,
    backgroundColor: COLORS.MAIN,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgBaner: {
    resizeMode: 'stretch',
    borderRadius: 5,
    marginHorizontal: 4,
    width: windowWidth * 0.4 - 10,
    height: windowHeight * 0.17 - 10,
  }
});
