import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";

import { ICategory } from "../../interfaces";
import { globalStyles, COLORS } from "../../styles/global";
import { LogoPicker } from "./LogoPicker";
import { BanersPicker } from "./BanersPicker";

interface ModalAddCityProps {
  addModalVisible: boolean;
  toggleModal: () => void;
  categories: ICategory[];
  addDelivery: (data: any) => void
}

export const ModalAddDeliv: React.FC<ModalAddCityProps> = ({
  addModalVisible,
  toggleModal,
  categories,
  addDelivery
}) => {
  const [initialStateInputs] = React.useState({
    name: '',
    logo: '',
    categories: [],
    timeOpen: '',
    timeClose: '',
    delivFree: '',
    delivPrice: '',
    payment: [false, false, false],
    addresses: [],
    promocode: '',
    promoDesc: '',
    linkSite: '',
    linkAppGoogle: '',
    linkAppApple: '',
    linkInst: '',
    phoneNumber: '',
    baners: []
  })
  // Inputs value
  const [inputsValue, setInputsValue] = React.useState(initialStateInputs)

  const [addressInputValue, setAddressInputValue] = React.useState<string>('')

  const addActiveCategory = (id: string) => {
    setInputsValue((prev) => ({
      ...prev,
      categories: [...prev.categories, id]
    }));
  }
  const removeActiveCategory = (id: string) => {
    setInputsValue(prev => ({
      ...prev,
      categories: prev.categories.filter(item => item !== id)
    }))
  }
  const toggleActivePayment = (index: number) => {
    setInputsValue((prev) => {
      prev.payment[index] = !prev.payment[index]
      return { ...prev }
    });
  }

  const addAddress = () => {
    if(addressInputValue.trim()){
      setInputsValue(prev => ({ ...prev, addresses: [...prev.addresses, addressInputValue] }))
      setAddressInputValue('')
    }
    else{
      alert('Название адреса не может быть пустым.')
    }
  }

  const removeAddress = (val: string) => {
    setInputsValue(prev => ({ ...prev, addresses: prev.addresses.filter(address => address !== val) }))
  }

  const onAdd = () => {
    if (!inputsValue.name.trim()) {
      alert("Название доставки не может быть пустым.");
    }
    else if(!inputsValue.timeOpen.trim() && !inputsValue.timeClose.trim()){
      alert("Время открытия или закрытия не может быть пустым.");
    }
    else if(!inputsValue.delivFree.trim()){
      alert("Стоимость бесплатной доставки не может быть пустой.");
    }
    else if(!inputsValue.delivPrice.trim()){
      alert("Стоимость доставки не может быть пустой.");
    }
    else if(inputsValue.categories.length === 0){
      alert("Выберите хотя бы одну категорию для доставки.");
    }
    else if(inputsValue.addresses.length === 0){
      alert("Добавте хотя бы один адрес для доставки.");
    }
    else {
      addDelivery(inputsValue)
      toggleModal()
      setInputsValue(initialStateInputs)
    }
  }

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
            <Text style={globalStyles.textSmall}>Название*</Text>
            <TextInput
              onChangeText={(val) => { setInputsValue(prev => ({ ...prev, name: val })) }}
              value={inputsValue.name}
              style={[styles.input, globalStyles.textSmall]}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ alignSelf: 'center' }}>
              <Text style={globalStyles.textSmall}>Лого*</Text>
              <LogoPicker logo={inputsValue.logo} setInputsValue={setInputsValue} />
            </View>
            <View style={{ width: "60%" }}>
              <View style={[styles.field]}>
                <Text style={globalStyles.textSmall}>Время работы*</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    onChangeText={(val) => { setInputsValue(prev => ({ ...prev, timeOpen: val })) }}
                    value={inputsValue.timeOpen}
                    placeholder="09:00"
                    style={[styles.input, globalStyles.textSmall]}
                  />
                  <Octicons
                    name="dash"
                    size={12}
                    style={{ marginHorizontal: 8 }}
                    color="black"
                  />
                  <TextInput
                    onChangeText={(val) => { setInputsValue(prev => ({ ...prev, timeClose: val })) }}
                    value={inputsValue.timeClose}
                    placeholder="21:00"
                    style={[styles.input, globalStyles.textSmall]}
                  />
                </View>
              </View>

              <View style={[styles.field]}>
                <Text style={globalStyles.textSmall}>Бесплатная доставка от*</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    onChangeText={(val) => { setInputsValue(prev => ({ ...prev, delivFree: val })) }}
                    value={inputsValue.delivFree}
                    placeholder="500"
                    style={[styles.input, globalStyles.textSmall]}
                  />
                </View>
              </View>
              <View style={[styles.field]}>
                <Text style={globalStyles.textSmall}>Стоимость доставки*</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    onChangeText={(val) => { setInputsValue(prev => ({ ...prev, delivPrice: val })) }}
                    value={inputsValue.delivPrice}
                    placeholder="0 - 1500"
                    style={[styles.input, globalStyles.textSmall]}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={globalStyles.textSmall}>Категории*</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {categories.map((item) => (
                <TouchableOpacity
                  style={inputsValue.categories.includes(item.id) ? styles.itemActive : styles.item}
                  onPress={inputsValue.categories.includes(item.id) ? removeActiveCategory.bind(null, item.id) : addActiveCategory.bind(null, item.id)}
                  key={"category_" + item.id}
                >
                  <Text style={inputsValue.categories.includes(item.id) && { color: 'white' }}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={globalStyles.textSmall}>Способы оплаты*</Text>
            <TouchableOpacity
              style={inputsValue.payment[0] ? styles.itemActive : styles.item}
              onPress={toggleActivePayment.bind(null, 0)}
            >
              <Text style={inputsValue.payment[0] && { color: 'white' }}>Онлайн-оплата картой</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={inputsValue.payment[1] ? styles.itemActive : styles.item}
              onPress={toggleActivePayment.bind(null, 1)}
            >
              <Text style={inputsValue.payment[1] && { color: 'white' }}>Картой курьеру</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={inputsValue.payment[2] ? styles.itemActive : styles.item}
              onPress={toggleActivePayment.bind(null, 2)}
            >
              <Text style={inputsValue.payment[2] && { color: 'white' }}>Наличными курьеру</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.field}>
            <Text style={globalStyles.textSmall}>Координаты доставки</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="52.258953"
                style={[styles.input, globalStyles.textSmall]}
              />
              <Octicons
                name="dash"
                size={12}
                style={{ marginHorizontal: 8 }}
                color="black"
              />
              <TextInput
                placeholder="104.280270"
                style={[styles.input, globalStyles.textSmall]}
              />
            </View>
          </View> */}

          <View style={styles.field}>
            <Text style={globalStyles.textSmall}>Добавить адрес доставки*</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput
                value={addressInputValue}
                onChangeText={setAddressInputValue}
                placeholder="ул. Карла Маркса, 18, Иркутск"
                style={[styles.input, globalStyles.textSmall]}
              />
              <TouchableOpacity
                onPress={addAddress}
              >
                <Ionicons
                  name="md-add-circle-outline"
                  size={46}
                  color={COLORS.MAIN}
                />
              </TouchableOpacity>
            </View>
            <View style={{ borderWidth: 1, marginTop: 5, padding: 5, borderRadius: 5 }}>
              {inputsValue.addresses.map((address, index) => (
                <TouchableOpacity key={'address_' + index} onLongPress={removeAddress.bind(null, address)}>
                  <Text style={styles.item}>{address}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={globalStyles.textSmall}>Ссылка на сайт</Text>
            <TextInput
              onChangeText={(val) => { setInputsValue(prev => ({ ...prev, linkSite: val })) }}
              value={inputsValue.linkSite}
              placeholder="https://www.tenno-sushi.ru"
              style={[styles.input, globalStyles.textSmall]}
            />
            <Text style={globalStyles.textSmall}>Ссылка на инстаграм</Text>
            <TextInput
              onChangeText={(val) => { setInputsValue(prev => ({ ...prev, linkInst: val })) }}
              value={inputsValue.linkInst}
              placeholder="https://www.instagram.com/tenno_sushi38/"
              style={[styles.input, globalStyles.textSmall]}
            />
            <Text style={globalStyles.textSmall}>Ссылка на GooglPlay</Text>
            <TextInput
              onChangeText={(val) => { setInputsValue(prev => ({ ...prev, linkAppGoogle: val })) }}
              value={inputsValue.linkAppGoogle}
              placeholder="https://play.google.com/store/apps/..."
              style={[styles.input, globalStyles.textSmall]}
            />
            <Text style={globalStyles.textSmall}>Ссылка на AppStore</Text>
            <TextInput
              onChangeText={(val) => { setInputsValue(prev => ({ ...prev, linkAppApple: val })) }}
              value={inputsValue.linkAppApple}
              placeholder="https://apps.apple.com/ru/app/...."
              style={[styles.input, globalStyles.textSmall]}
            />
            <Text style={globalStyles.textSmall}>Номер доставки</Text>
            <TextInput
              onChangeText={(val) => { setInputsValue(prev => ({ ...prev, phoneNumber: val })) }}
              value={inputsValue.phoneNumber}
              placeholder="+7 (3952) 28-37-30"
              style={[styles.input, globalStyles.textSmall]}
            />
          </View>

          <View style={styles.field}>
            <Text style={globalStyles.textSmall}>Промокод</Text>
            <TextInput
              onChangeText={(val) => { setInputsValue(prev => ({ ...prev, promocode: val })) }}
              value={inputsValue.promocode}
              placeholder="edaNaDom"
              style={[styles.input, globalStyles.textSmall]}
            />
            <Text style={globalStyles.textSmall}>Описание промокода</Text>
            <TextInput
              onChangeText={(val) => { setInputsValue(prev => ({ ...prev, promoDesc: val })) }}
              value={inputsValue.promoDesc}
              placeholder="Бесплатна пицца 30см. "
              style={[styles.input, globalStyles.textSmall]}
            />
          </View>

          <View style={[styles.field]}>
            <Text style={globalStyles.textSmall}>Банеры</Text>
            <BanersPicker baners={inputsValue.baners} setInputsValue={setInputsValue} />
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
  item: {
    borderWidth: 1,
    padding: 7,
    margin: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 5,
  },
  itemActive: {
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
