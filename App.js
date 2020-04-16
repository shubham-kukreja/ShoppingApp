import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Navigation Imoprts
import "react-native-gesture-handler";
import { MainNavigator } from "./navigations/ShopNavigator";
// Redux Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import productsReducer from "./store/reducers/products";
import orderReducer from "./store/reducers/orders";
import cartReducer from "./store/reducers/cart";
import authReducer from "./store/reducers/auth";
import * as authActions from "./store/actions/auth";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {


  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
