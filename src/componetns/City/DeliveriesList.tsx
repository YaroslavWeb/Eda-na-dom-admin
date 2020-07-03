import React from "react";
import { View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

import { IDelivery, ICategory } from "../../interfaces";
import { DeliveryItem } from "./DeliveryItem";


interface IDeliveriesListProps {
  deliveries: IDelivery[]
  dragDeliveries: (data: IDelivery[]) => void
  categories: ICategory[]
  removeDelivery: (delivID: string)=>void
  updateDelivery: (data:any) => void
}

export const DeliveriesList: React.FC<IDeliveriesListProps> = ({deliveries, dragDeliveries, categories, removeDelivery, updateDelivery}) => {

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={deliveries}
        renderItem={({item, drag, isActive})=> <DeliveryItem item={item} drag={drag} isActive={isActive} removeDelivery={removeDelivery} categories={categories} updateDelivery={updateDelivery}/>}
        keyExtractor={(item: any) => `delivety_${item.id}`}
        onDragEnd={({ data }) => dragDeliveries(data)}
      />
    </View>
  );
}


