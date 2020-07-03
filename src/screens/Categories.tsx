import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from "react-native";

import { ICategory } from "../interfaces";
import { globalStyles } from "../styles/global";
import { CategoryCard } from "../componetns/Categories/CategoryCard";
import { ModalAddCategory } from "../componetns/Categories/ModalAddCategory";
import { getCategoriesFB, updateCategoryFB, addCategoyFB, removeCategoryFB } from "../firebase/queries";

export const Categories: React.FC = () => {
  const [categories, setCategories] = React.useState<ICategory[]>([])
  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const toggleModal = () => setAddModalVisible(prev => !prev)

  React.useEffect(() => {
    getCategoriesFB(setCategories)
  }, [])

  const addCategory = (name: string, img: string) => {
    addCategoyFB(name, img, setCategories)
  }
  const removeCategory = (id: string) => {
    removeCategoryFB(id, setCategories)
  }
  const updateCategory = (id:string, name: string, img: string) =>{
    updateCategoryFB(id, name, img, setCategories)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={[styles.addDelivBtn, globalStyles.bgMain]}>
        <Text style={styles.btnTextStyle}>Добавить категорию</Text>
      </TouchableOpacity>
      <View style={globalStyles.hr} />
      {categories.length !== 0
        ? (<FlatList
          data={categories}
          keyExtractor={(item) => "category_" + item.id}
          horizontal={false}
          numColumns={3}
          renderItem={({ item }) => <CategoryCard category={item} updateCategory={updateCategory} removeCategory={removeCategory} />}
        />)
        : (<Text>Подождите...</Text>)
      }
      <ModalAddCategory addModalVisible={addModalVisible} toggleModal={toggleModal} addCategory={addCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  addDelivBtn: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },
  btnTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});
