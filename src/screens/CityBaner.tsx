import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, Text, ScrollView } from "react-native";

import { IDelivery } from "../interfaces";
import { globalStyles, COLORS } from "../styles/global";
import { getDeliveriesFB, updateBanersCityFB } from "../firebase/queries";

interface CityBanerProps {
  route: any
}

export const CityBaner: React.FC<CityBanerProps> = ({ route }) => {

  const [deliveries, setDeliveries] = React.useState<IDelivery[]>([])
  React.useEffect(() => {
    getDeliveriesFB(setDeliveries, route.params.city.id)
  }, [])
  const [activeBaners, setActiveBaners] = React.useState<{deliveryID: string, uri: string}[]>([])

  const addBaner = (deliveryID: string, uri: string) => {
    setActiveBaners(prev => [
      ...prev,
      { deliveryID, uri }
    ])
  }

  const removeBaner = (uri: string) => {
    setActiveBaners(prev => prev.filter(item => item.uri !== uri))
  }
  const updateBanersCity = () => {
    updateBanersCityFB(route.params.city, activeBaners)
  }
  return (
    <ScrollView>
      <View style={styles.banersContainer}>
        <TouchableOpacity onPress={updateBanersCity} style={[styles.btn, globalStyles.bgSuccess]}>
          <Text style={styles.textStyle}>Сохранить</Text>
        </TouchableOpacity>
        {deliveries.map(delivery => (
          <View key={'delivery' + delivery.id}>
            <View style={globalStyles.hr} />
            <Text>{delivery.name}</Text>
            <ScrollView horizontal={true} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {delivery.baners.map((baner, jndex) => {
                return (
                  <TouchableOpacity
                    style={activeBaners.some(item => item.uri === baner) ? styles.itemActive : styles.item}
                    onPress={() => { activeBaners.some(item => item.uri === baner) ? removeBaner(baner) : addBaner(delivery.id, baner) }}
                    key={'baner_' + jndex + '_' + delivery.id}
                  >
                    <Image source={{ uri: baner }} style={styles.imgBaner} />
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View >
        ))
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  banersContainer: {
    padding: 10
  },
  btn: {
    borderRadius: 5,
    width: "98%",
    padding: 10,

    // Android
    elevation: 2,
    
    // IOS
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
  imgBaner: {
    resizeMode: 'stretch',
    width: 150,
    height: 110,
  },
  item: {
    borderWidth: 3,
    borderColor: COLORS.BORDER,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  itemActive: {
    borderWidth: 3,
    borderColor: COLORS.MAIN,
    borderRadius: 5,
    marginHorizontal: 4,
  }
});

