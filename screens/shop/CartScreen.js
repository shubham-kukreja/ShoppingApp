import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import  Colors  from "../../constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import CartItem from "../../components/CartItem";
import * as orderActions from "../../store/actions/orders";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const cartProducts = useSelector((state) => {
    const tranformed = [];
    for (const key in state.cart.items) {
      tranformed.push({
        productId: key,
        productTitle: state.cart.items[key].prodTitle,
        productPrice: state.cart.items[key].prodPrice,
        productQuantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return tranformed.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });
  const sum = useSelector((state) => state.cart.totalAmount);
  const sendOrderHandler = async () => {
    setisLoading(true);
    await dispatch(orderActions.addOrder(cartProducts, sum));
    setisLoading(false);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total :{" "}
          <Text style={styles.amount}>
            ₹ {cartProducts.length === 0 ? 0.0 : sum.toFixed(2)}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            disabled={cartProducts.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </View>
      <View>
        <FlatList
          data={cartProducts}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              deletable
              data={itemData.item}
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
export default CartScreen;
