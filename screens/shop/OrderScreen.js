import React, { useState, useEffect } from "react";
import { FlatList, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import OrderItem from "../../components/OrderItem";
import * as orderActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const loadOrders = async () => {
      setisLoading(true);
      await dispatch(orderActions.setOrder());
      setisLoading(false);
    };
    loadOrders();
  }, [dispatch]);
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton} size={25}>
          <Item
            title="Drawer"
            iconName="ios-menu"
            onPress={() => props.navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
  });
  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount.toFixed(2)}
          date={itemData.item.date}
          data={itemData.item.items}
        />
      )}
    />
  );
};

export default OrderScreen;
