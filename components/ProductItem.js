import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import Colors from "../constants/Colors";
import Card from "../UI/Card";

const ProductItem = (props) => {
  let Touchable = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  }
  return (
    <Touchable onPress={props.onViewDetail}>
      <View style={styles.product}>
        <Image style={styles.image} source={{ uri: props.data.imageUrl }} />
        <View style={styles.details}>
          <Text style={styles.title}>{props.data.title}</Text>
          <Text style={styles.price}>₹ {props.data.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>{props.children}</View>
      </View>
    </Touchable>
  );
};
const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
});
export default ProductItem;
