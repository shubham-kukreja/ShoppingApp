import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import HeaderButton from "../../UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";

const ProductOverview = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadProducts = async () => {
      setisLoading(true);
      await dispatch(productActions.fetchProducts());
      setisLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={"ios-cart"}
            onPress={() => {
              props.navigation.navigate("CartScreen");
            }}
          />
        </HeaderButtons>
      ),
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
  }, [props.navigation]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          data={itemData.item}
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              product: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
        >
          <Button
            title="View Details"
            onPress={() => {
              props.navigation.navigate("ProductDetail", {
                product: itemData.item.id,
                productTitle: itemData.item.title,
              });
            }}
            color={Colors.primary}
          />
          <Button
            title="Add To Cart"
            onPress={() => {
              dispatch(cartActions.addtoCart(itemData.item));
            }}
            color={Colors.accent}
          />
        </ProductItem>
      )}
    />
  );
};
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductOverview;
