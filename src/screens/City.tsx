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
  // данные из firebase
  const [categoriesFB, setCategoriesFB] = React.useState<ICategory[]>([]);
  
  // Все доставки по городу
  const [deliveriesFB, setDeliveriesFB] = React.useState<IDelivery[]>([]);
  
  // Локальные данные
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  // видимые доставки
  const [deliveries, setDeliveries] = React.useState<IDelivery[]>([]);

  // фильтры для отображения
  const [filters, setFilters] = React.useState({
    activeCategoryId: null,
  });

  // получение данных из firebase
  React.useEffect(() => {
    getDeliveriesFB(setDeliveriesFB, route.params.id);
    getCategoriesFB(setCategoriesFB)
  }, []);

  // Обновление локальных данных по изменению базы данны
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

    setDeliveries(() => {
      let deliveriesList: IDelivery[] = [];
      deliveriesFB.forEach((item) => {
        if (item.categories.includes(filters.activeCategoryId)) {
          deliveriesList.push(item);
        }
      });
      deliveriesList.sort((a, b) => {
        let indexA: number, indexB: number
        indexA = a.place.findIndex((item: any) => item.categoryID === filters.activeCategoryId);
        indexB = b.place.findIndex((item: any) => item.categoryID === filters.activeCategoryId);

        if (a.place[indexA].point < 4 && b.place[indexB].point < 4) {
          // Обе доставки входят в топ 3, сортируем их по месту
          return a.place[indexA].point - b.place[indexB].point
        }
        else if (a.place[indexA].point < 4 && b.place[indexB].point >= 4) {
          return -1
        }
        else if (a.place[indexA].point >= 4 && b.place[indexB].point < 4) {
          return 1
        }
        else {
          // Обе доставки не топ 3, соритруем по весу.
          const coefficient = (point: number) => {
            if(point <= 1) return 0.2 * Number(point)
            if(point <= 2) return 0.4 * Number(point)
            if(point <= 3) return 0.6 * Number(point)
            if(point <= 4) return 0.8 * Number(point)
            return point
          }
          const w1 = Number(a.rating.votes) * coefficient(a.rating.points)
          const w2 = Number(b.rating.votes) * coefficient(b.rating.points)
          return w2 - w1
        }
      })
      return deliveriesList;
    });
  }, [categoriesFB, deliveriesFB]);

  // Обновление список доставок
  React.useEffect(() => {
    setDeliveries(() => {
      let deliveriesList: IDelivery[] = [];
      deliveriesFB.forEach((item) => {
        if (item.categories.includes(filters.activeCategoryId)) {
          deliveriesList.push(item);
        }
      });
      deliveriesList.sort((a, b) => {
        let indexA: number, indexB: number
        indexA = a.place.findIndex((item: any) => item.categoryID === filters.activeCategoryId);
        indexB = b.place.findIndex((item: any) => item.categoryID === filters.activeCategoryId);

        if (a.place[indexA].point < 4 && b.place[indexB].point < 4) {
          // Обе доставки входят в топ 3, сортируем их по месту
          return a.place[indexA].point - b.place[indexB].point
        }
        else if (a.place[indexA].point < 4 && b.place[indexB].point >= 4) {
          return -1
        }
        else if (a.place[indexA].point >= 4 && b.place[indexB].point < 4) {
          return 1
        }
        else {
          // Обе доставки не топ 3, соритруем по весу.
          const coefficient = (point: number) => {
            if(point <= 1) return 0.2 * Number(point)
            if(point <= 2) return 0.4 * Number(point)
            if(point <= 3) return 0.6 * Number(point)
            if(point <= 4) return 0.8 * Number(point)
            return point
          }
          const w1 = Number(a.rating.votes) * coefficient(a.rating.points)
          const w2 = Number(b.rating.votes) * coefficient(b.rating.points)
          return w2 - w1
        }
      })
      return deliveriesList
    });
  }, [filters.activeCategoryId]);

  // Модальное окно на добавление доставки
  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const toggleModal = () => setAddModalVisible((prev) => !prev);

  // Перетягивание в драг листе
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
    data.rating = {points:0, votes: 0}
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
