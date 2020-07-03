import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Dimensions, Image } from "react-native";

import { globalStyles, COLORS } from "../../styles/global";
import { ICategory } from "../../interfaces";
import { ModalEditCategory } from "./ModalEditCategory";

const windowWidth = Dimensions.get("window").width;

interface ICategoryItemProps {
  category: ICategory;
  updateCategory:(id:string, name: string, img: string) => void
  removeCategory: (id: string) => void
}

export const CategoryCard: React.FC<ICategoryItemProps> = ({ category, updateCategory, removeCategory }) => {

  const [modalVisible, setModalVisible] = React.useState<boolean>(false)
  const toggleModal = () => setModalVisible(prev => !prev)

  return (
    <>
      <TouchableOpacity
        onPress={toggleModal}
      >
        <View style={styles.card}>
          <Text style={[globalStyles.textSmall, styles.title]}>{category.name}</Text>
          <Image style={styles.image} source={{ uri: category.image }} />
        </View>
      </TouchableOpacity>
      <ModalEditCategory modalVisible={modalVisible} toggleModal={toggleModal} category={category} updateCategory={updateCategory} removeCategory={removeCategory}/>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.33 - 15,
    height: windowWidth * 0.33 - 15,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "dashed",
    borderColor: COLORS.BORDER,
    flexDirection: "column",
    padding: 5,
  },
  title: {
    color: COLORS.FONT,
    fontSize: 16,
    textAlign: 'center'
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: windowWidth * 0.33 - 60,
    height: windowWidth * 0.33 - 60,
  }
});
