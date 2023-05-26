import { View, Text } from "react-native";
import React from "react";
import { Problems } from "../features/problems/problems";
import { Login } from "../features/users/login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../features/dashboard/Dashboard";
import Profile from "./Profile";
import { useGetUser } from "../features/users/user-hooks";

const Home = () => {
  const Tab = createBottomTabNavigator();
  const { data: user } = useGetUser();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
    </Tab.Navigator>
  );
};

export default Home;
