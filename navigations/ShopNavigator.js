import React, { useState } from "react";

import COLORS from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";

import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import ProductDetail from "../screens/shop/ProductDetail";
import ProductOverview from "../screens/shop/ProductOverview";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import StartupScreen from "../screens/StartupScreen";
import AuthScreen from "../screens/user/AuthScreen";

import {
  createStackNavigator,
  createSwitchNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View } from "react-native";

const Stack = createStackNavigator();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProductsOverview">
      <Stack.Screen
        name="ProductsOverview"
        component={ProductOverview}
        options={{ title: "All Products" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ route }) => ({ title: route.params.productTitle })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: "Your Cart" }}
      />
    </Stack.Navigator>
  );
};

const OrderStack = createStackNavigator();
const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator initialRouteName="Orders">
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{ title: "Orders" }}
      />
    </OrderStack.Navigator>
  );
};

const UserOrderStack = createStackNavigator();
const UserOrderStackNavigator = () => {
  return (
    <UserOrderStack.Navigator initialRouteName="UserOrder">
      <Stack.Screen
        name="UserOrder"
        component={UserProductsScreen}
        options={{ title: "Your Orders" }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{ title: "Edit Orders" }}
      />
    </UserOrderStack.Navigator>
  );
};

const AuthStack = createStackNavigator();
export const UserAuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={AuthScreen}
        options={{ title: "Login" }}
      />
    </AuthStack.Navigator>
  );
};
const StartScreen = createStackNavigator();
export const StartScreenNavigator = () => {
  return (
    <StartScreen.Navigator initialRouteName="start">
      <Stack.Screen
        name="start"
        component={StartupScreen}
        options={{ title: "STARTUPSCREEN" }}
      />
    </StartScreen.Navigator>
  );
};
const LogoutButton = () => {
  const dispatch = useDispatch(authActions)
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="LOGOUT" onPress={() => dispatch(authActions.logout())}/>
    </View>
  );
};
const Drawer = createDrawerNavigator();
export const DrawerMain = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={MainStackNavigator} />
    <Drawer.Screen name="Orders" component={OrderStackNavigator} />
    <Drawer.Screen name="UserOrders" component={UserOrderStackNavigator} />
    <Drawer.Screen name="Logout" component={LogoutButton} />
  </Drawer.Navigator>
);

// const MainStack = createStackNavigator();
export const MainNavigator = () => {
  const isAuth = useSelector((state) => state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  return (
    <NavigationContainer>
      {isAuth && <DrawerMain />}
      {!isAuth && didTryAutoLogin && <UserAuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartScreenNavigator />}
    </NavigationContainer>
  );
};
