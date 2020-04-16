import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { Colors } from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import { useSelector, useDispatch } from "react-redux";

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.setDidtryAl());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiresIn } = transformedData;
      const expirationDate = new Date(expiresIn);
      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(authActions.setDidtryAl());
        return;
      }
      dispatch(authActions.authenticate(userId, token));
    };
    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StartupScreen;
