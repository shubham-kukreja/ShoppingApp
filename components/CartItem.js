import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.qunatity}>x{props.data.productQuantity}    </Text>
        <Text style={styles.title}>{props.data.productTitle}  </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>₹ {props.data.sum.toFixed(2)}</Text>
        {props.deletable && <TouchableOpacity style={styles.deleteItem} onPress={props.onRemove}>
          <Ionicons size={23} name="ios-trash" color={Colors.accent} />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent : "space-between"
  },
  qunatity: {
    color: "#888",
    fontSize: 16,
  },
  title: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
  deleteItem: {
    marginLeft: 20,
  },
});
export default CartItem;
