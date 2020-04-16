import React from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";
import Colors from "../constants/Colors";


const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      title="Star"
      IconComponent={Ionicons}
      iconSize={22}
      color={Colors.primary}
    />
  );
};

const styles = StyleSheet.create({});
export default CustomHeaderButton;
