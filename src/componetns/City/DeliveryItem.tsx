import React from "react";
import { COLORS, globalStyles } from "../../styles/global";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ModalEditDeliv } from "./ModalEditDeliv";
import { IDelivery, ICategory } from "../../interfaces";

interface IDeliveryProps {
  item: IDelivery
  drag: any
  isActive: boolean
  categories: ICategory[]
  removeDelivery: (delivID: string) => void
  updateDelivery: (data: any) => void
}

export const DeliveryItem: React.FC<IDeliveryProps> = ({ item, drag, isActive, categories, removeDelivery, updateDelivery}) => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const toggleModal = () => setModalVisible(prev => !prev);
    return (
      <>
        <TouchableOpacity
          style={[
            { backgroundColor: isActive ? COLORS.MAIN : "white" },
            styles.delivery,
          ]}
          onPress={toggleModal}
          onLongPress={drag}
        >
          <Text
            style={[
              globalStyles.textSmall,
              isActive ? { color: "white" } : false,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
        <ModalEditDeliv delivery={item} modalVisible={modalVisible} toggleModal={toggleModal} categories={categories} removeDelivery={removeDelivery} updateDelivery={updateDelivery}/>

        </>
    );
  };

  const styles = StyleSheet.create({
    delivery: {
      marginVertical: 2,
      padding: 10,
      borderWidth: 1,
      borderColor: COLORS.BORDER,
      borderRadius: 5,
    },
  });