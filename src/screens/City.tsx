import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { ICategory, IDelivery } from "../interfaces";
import { COLORS, globalStyles } from "../styles/global";
import { DeliveriesList } from "../componetns/City/DeliveriesList";
import { ModalAddDeliv } from "../componetns/City/ModalAddDeliv";
import {
  getDeliveriesFB,
  getCategoriesFB,
  addDeliveryFB,
  removeDeliveryFB,
  updateDeliveryFB,
  updatePlaceDeliveriesFB,
} from "../firebase/queries";

interface CityProps {
  route: any;
}

export const City: React.FC<CityProps> = ({ route }) => {
  const [categoriesFB, setCategoriesFB] = React.useState<ICategory[]>([]);
  const [deliveriesFB, setDeliveriesFB] = React.useState<IDelivery[]>([]);

  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [deliveries, setDeliveries] = React.useState<IDelivery[]>([]);
  const [filters, setFilters] = React.useState({
    activeCategoryId: null,
  });

  React.useEffect(() => {
    getDeliveriesFB(setDeliveriesFB, route.params.id);
    getCategoriesFB(setCategoriesFB)
  }, []);

  React.useEffect(() => {
    let categoriesListID: string[] = [];
    let categoriesList: ICategory[] = [];
    setCategories(() => {
      deliveriesFB.forEach((item) => {
        item.categories.forEach((category) => {
          if (!categoriesListID.includes(category)) {
            categoriesListID.push(category);
          }
        });
      });
      categoriesFB.forEach((item) => {
        if (categoriesListID.includes(item.id)) {
          categoriesList.push(item);
        }
      });
      return categoriesList;
    });
    // setFilters(prev => ({ ...prev, activeCategoryId: categoriesListID[0] }))

    setDeliveries(() => {
      let deliveriesList: IDelivery[] = [];
      deliveriesFB.forEach((item) => {
        if (item.categories.includes(filters.activeCategoryId)) {
          deliveriesList.push(item);
        }
      });
      deliveriesList.sort((a, b) => {
        let indexA:number, indexB:number
        a.place.forEach(item=> {if(item.categoryID === filters.activeCategoryId) indexA = item.categoryID.indexOf(filters.activeCategoryId)});
        b.place.forEach(item=> {if(item.categoryID === filters.activeCategoryId) indexB = item.categoryID.indexOf(filters.activeCategoryId)});
        return a.place[indexA].point - b.place[indexB].point;
      });
      return deliveriesList;
    });
  }, [categoriesFB, deliveriesFB]);


  React.useEffect(() => {
    setDeliveries(() => {
      let deliveriesList: IDelivery[] = [];
      deliveriesFB.forEach((item) => {
        if (item.categories.includes(filters.activeCategoryId)) {
          deliveriesList.push(item);
        }
      });
      deliveriesList.sort((a, b) => {
        let indexA:number, indexB:number
        a.place.forEach(item=> {if(item.categoryID === filters.activeCategoryId) indexA = item.categoryID.indexOf(filters.activeCategoryId)});
        b.place.forEach(item=> {if(item.categoryID === filters.activeCategoryId) indexB = item.categoryID.indexOf(filters.activeCategoryId)});
        return a.place[indexA].point - b.place[indexB].point;
      });
      return deliveriesList;
    });
  }, [filters.activeCategoryId]);


  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const toggleModal = () => setAddModalVisible((prev) => !prev);

  const dragDeliveries = (data: IDelivery[]) => {
    data.forEach((delivery, index) => {
      if (index === 0) {
        deliveriesFB.forEach((item) => {
          if (delivery.id === item.id) {
            item.place.forEach((categoryPlace) => {
              if (categoryPlace.categoryID === filters.activeCategoryId) {
                categoryPlace.point = 1;
              }
            });
          }
        });
      } else if (index === 1) {
        deliveriesFB.forEach((item) => {
          if (delivery.id === item.id) {
            item.place.forEach((categoryPlace) => {
              if (categoryPlace.categoryID === filters.activeCategoryId) {
                categoryPlace.point = 2;
              }
            });
          }
        });
      } else if (index === 2) {
        deliveriesFB.forEach((item) => {
          if (delivery.id === item.id) {
            item.place.forEach((categoryPlace) => {
              if (categoryPlace.categoryID === filters.activeCategoryId) {
                categoryPlace.point = 3;
              }
            });
          }
        });
      } else {
        deliveriesFB.forEach((item) => {
          if (delivery.id === item.id) {
            item.place.forEach((categoryPlace) => {
              if (categoryPlace.categoryID === filters.activeCategoryId) {
                categoryPlace.point = 4;
              }
            });
          }
        });
      }
    });
    updatePlaceDeliveriesFB(setDeliveriesFB, deliveriesFB);
    setDeliveries(data)
  };

  const handlerFilter = (id: string) => {
    setFilters((prev) => ({ ...prev, activeCategoryId: id }));
  };

  const addDelivery = (data: IDelivery) => {
    data.city = route.params.id;
    data.place = data.categories.map((item) => ({
      categoryID: item,
      point: 4,
    }));
    data.place.sort()
    addDeliveryFB(setDeliveriesFB, data);
  };
  const removeDelivery = (delivID: string) => {
    removeDeliveryFB(setDeliveriesFB, delivID, route.params.id);
  };
  const updateDelivery = (data: IDelivery) => {
    data.place.filter((item) => data.categories.includes(item.categoryID));
    data.place.sort()
    updateDeliveryFB(setDeliveriesFB, data);
  };

  return (
    <View style={styles.container}>
      <Text style={globalStyles.textBig}>Категории</Text>
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {categories.length !== 0 ? (
          categories.map((item) => (
            <TouchableOpacity
              disabled={filters.activeCategoryId === item.id}
              style={
                filters.activeCategoryId === item.id
                  ? styles.categoryActive
                  : styles.category
              }
              key={"category_" + item.id}
              onPress={handlerFilter.bind(null, item.id)}
            >
              <Text
                style={[
                  globalStyles.textSmall,
                  filters.activeCategoryId === item.id &&
                  styles.categoryActiveText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
            <Text>Подождите...</Text>
          )}
      </View>

      <View style={globalStyles.hr} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 2,
        }}
      >
        <Text style={globalStyles.textBig}>Доставки</Text>
        <TouchableOpacity
          style={[styles.addDelivBtn, globalStyles.bgMain]}
          onPress={toggleModal}
        >
          <Text style={styles.btnTextStyle}>Добавить доставку</Text>
        </TouchableOpacity>
      </View>
      <DeliveriesList
        deliveries={deliveries}
        dragDeliveries={dragDeliveries}
        categories={categoriesFB}
        removeDelivery={removeDelivery}
        updateDelivery={updateDelivery}
      />
      <ModalAddDeliv
        addModalVisible={addModalVisible}
        toggleModal={toggleModal}
        categories={categoriesFB}
        addDelivery={addDelivery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
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
  categoryActiveText: {
    color: "white",
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
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  btnTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
