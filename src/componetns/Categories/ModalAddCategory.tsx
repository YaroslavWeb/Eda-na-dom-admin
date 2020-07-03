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

interface ModalAddCityProps {
  addModalVisible: boolean;
  toggleModal: () => void;
  addCategory: (name: string, img: string) => void
}

export const ModalAddCategory: React.FC<ModalAddCityProps> = ({
  addModalVisible,
  toggleModal,
  addCategory
}) => {

  const [inputName, setInputName] = React.useState<string>("");
  const [inputImg, setInputImg] = React.useState<string>(null);

  const onAdd = () => {
    if (!inputName.trim()) {
      Alert.alert("Название категории не может быть пустым.");
    } 
    else if(!inputImg){
      Alert.alert("Выберите картинку для категории.");
    }
    else {
      addCategory(inputName.trim(), inputImg);
      toggleModal()
      setInputName("");
      setInputImg(null);
    }
  };

  return (
    <Modal
      visible={addModalVisible}
      onRequestClose={toggleModal}
      animationType="slide"
    >
      <View style={styles.containerModal}>
        <View style={styles.title}>
          <Text style={[globalStyles.textBig]}>Добавление</Text>
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
            <ImgPicker image={inputImg} setImage={setInputImg}/>
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
            onPress={onAdd}
          >
            <Text style={styles.textStyle}>Добавить</Text>
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
