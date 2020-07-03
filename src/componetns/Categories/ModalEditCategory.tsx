import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { globalStyles, COLORS } from "../../styles/global";
import { ImgPicker } from "../../componetns/Categories/ImgPicker";
import { ICategory } from "../../interfaces";

interface ModalEditCityProps {
  modalVisible: boolean;
  toggleModal: () => void;
  category: ICategory
  updateCategory: (id: string, name: string, img: string) => void
  removeCategory: (id: string) => void
}

export const ModalEditCategory: React.FC<ModalEditCityProps> = ({
  modalVisible,
  toggleModal,
  category,
  removeCategory,
  updateCategory
}) => {

  const [inputName, setInputName] = React.useState<string>(category.name);
  const [inputImg, setInputImg] = React.useState<string>(category.image);

  const onRemove = () => {
    Alert.alert(
      "Предупреждение!",
      "Вы действительно хотите удалить категорию?",
      [
        { text: "Нет" },
        { text: "Да", onPress: () => {
          toggleModal();
          removeCategory(category.id);
         }},
      ],
      { cancelable: false }
    );
  };

  const onUpdate = () => {
    if (!inputName.trim()) {
      Alert.alert("Название категории не может быть пустым.");
    }
    else if (!inputImg) {
      Alert.alert("Выберите картинку для категории.");
    }
    else {
      toggleModal()
      updateCategory(category.id, inputName, inputImg)
    }
  };

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={toggleModal}
      animationType="slide"
    >
      <View style={styles.containerModal}>
        <View style={styles.title}>
          <Text style={[globalStyles.textBig]}>Измененине</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons name="md-close" size={36} color={COLORS.DANGER} />
          </TouchableOpacity>
        </View>
        <View style={globalStyles.hr} />
        <ScrollView>
          <View style={styles.field}>
            <Text style={globalStyles.textSmall}>Название</Text>
            <TextInput
              onChangeText={setInputName}
              value={inputName}
              style={[styles.input, globalStyles.textSmall]}
            />
          </View>
          <View style={styles.field}>
            <Text style={globalStyles.textSmall}>Картинка</Text>
            <ImgPicker image={inputImg} setImage={setInputImg} />
          </View>
          <View style={styles.field}>
            <TouchableOpacity onPress={onRemove} style={[styles.btn, globalStyles.bgDanger]}>
              <Text style={styles.textStyle}>Удалить категорию</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.action}>
          <TouchableOpacity
            style={[globalStyles.bgDanger, styles.btn]}
            onPress={toggleModal}
          >
            <Text style={styles.textStyle}>Закрыть</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[globalStyles.bgSuccess, styles.btn]}
            onPress={onUpdate.bind(null, category.id, category.name, category.image)}
          >
            <Text style={styles.textStyle}>Изменить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    height: "100%",
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  field: {
    marginVertical: 8,
  },
  category: {
    borderWidth: 1,
    padding: 7,
    margin: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 5,
  },
  categoryActive: {
    backgroundColor: COLORS.MAIN,
    borderRadius: 5,
    borderWidth: 1,
    margin: 1,
    padding: 7,
  },
  action: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    borderRadius: 5,
    width: "48%",
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    color: COLORS.FONT,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 5,
    padding: 5,
  },
});
