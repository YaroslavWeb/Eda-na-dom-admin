import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { globalStyles } from "../styles/global";

export const About: React.FC = () => {
  const [license, setLicense] = React.useState<boolean>(false);
  const toggleLicense = () => {setLicense(prev=>!prev)}

  return (
    <ScrollView style={styles.container}>
      <Text style={globalStyles.textMedium}>Версии приложения</Text>
      <View style={globalStyles.hr} />
      <View style={{marginTop:5}}>
        <Text>v1.1.0</Text>
        <Text>- Доработка сортировки</Text>
        <Text>- Изменение функционала с учётом рейтинга доставок</Text>
      </View>
      <View style={{marginTop:5}}>
        <Text>v1.0.0</Text>
        <Text>- Добавление, удаление города</Text>
        <Text>- Добавление, удаление, изменение доставки</Text>
        <Text>- Добавление, удаление, изменение категории</Text>
        <Text>- Формирование банеров для города</Text>
      </View>

      <View style={globalStyles.hr} />

      <Text style={globalStyles.textMedium}>Разработчик: Татаринов Я.А.</Text>
      <View style={globalStyles.hr} />
      <TouchableOpacity
          style={[styles.btn, globalStyles.bgMain]}
          onPress={toggleLicense}
        >
          <Text style={styles.btnText}>ЛИЦЕНЗИЯ</Text>
        </TouchableOpacity>
      {license && (
        <>
          <Text style={globalStyles.textSmall}>Лицензия MIT</Text>
          <Text style={[globalStyles.textSmall, { marginBottom: 10 }]}>
            Copyright (c) 2020 YaroslavWeb
          </Text>
          <Text style={[globalStyles.textTiny, { marginBottom: 10 }]}>
            Данная лицензия разрешает лицам, получившим копию данного
            программного обеспечения и сопутствующей документации (в дальнейшем
            именуемыми «Программное Обеспечение»), безвозмездно использовать
            Программное Обеспечение без ограничений, включая неограниченное
            право на использование, копирование, изменение, слияние, публикацию,
            распространение, сублицензирование и/или продажу копий Программного
            Обеспечения, а также лицам, которым предоставляется данное
            Программное Обеспечение, при соблюдении следующих условий:
          </Text>
          <Text style={[globalStyles.textTiny, { marginBottom: 10 }]}>
            Указанное выше уведомление об авторском праве и данные условия
            должны быть включены во все копии или значимые части данного
            Программного Обеспечения.
          </Text>
          <Text style={[globalStyles.textTiny, { marginBottom: 10 }]}>
            ДАННОЕ ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ
            КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНО ВЫРАЖЕННЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ
            ГАРАНТИИ ТОВАРНОЙ ПРИГОДНОСТИ, СООТВЕТСТВИЯ ПО ЕГО КОНКРЕТНОМУ
            НАЗНАЧЕНИЮ И ОТСУТСТВИЯ НАРУШЕНИЙ, НО НЕ ОГРАНИЧИВАЯСЬ ИМИ. НИ В
            КАКОМ СЛУЧАЕ АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ПО
            КАКИМ-ЛИБО ИСКАМ, ЗА УЩЕРБ ИЛИ ПО ИНЫМ ТРЕБОВАНИЯМ, В ТОМ ЧИСЛЕ, ПРИ
            ДЕЙСТВИИ КОНТРАКТА, ДЕЛИКТЕ ИЛИ ИНОЙ СИТУАЦИИ, ВОЗНИКШИМ ИЗ-ЗА
            ИСПОЛЬЗОВАНИЯ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ ИЛИ ИНЫХ ДЕЙСТВИЙ С
            ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ.
          </Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  btn: {
    borderRadius: 5,
    padding: 10,
    marginBottom:10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
