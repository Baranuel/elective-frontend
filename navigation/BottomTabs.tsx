import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Problems } from "../features/problems/problems";
import { Login } from "../features/users/login";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Problems" component={Problems} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
