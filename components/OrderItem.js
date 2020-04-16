import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  let newDate = new Date(props.date);
  newDate = (newDate.toLocaleDateString())
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={{ fontSize: 16 }}>{props.amount}</Text>
        <Text style={{ fontSize: 16, color: "#888" }}>{newDate}</Text>
      </View>
      <View>
        <Button
          title={showDetails ? "Hide Details" : "Show Details"}
          color={Colors.primary}
          onPress={() => {
            setShowDetails((prev) => !prev);
          }}
        />
      </View>
      {showDetails && props.data.map((item) => <CartItem data={item} key={item.productId} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
export default OrderItem;
