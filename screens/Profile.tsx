import { View, Text, Dimensions, Button, TouchableOpacity } from "react-native";
import React from "react";
import { Problems } from "../features/problems/problems";
import { useGetUser } from "../features/users/user-hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logout } from "../features/users/usersSlice";
import * as SecureStore from "expo-secure-store";
import { QueryCache, useQueryClient } from "@tanstack/react-query";

const Profile = ({ navigation }: any) => {
  const { data: user } = useGetUser();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    dispatch(logout());
    queryClient.clear();
    const token = await SecureStore.getItemAsync("token");
    if (!token) navigation.navigate("Login");
  };

  return (
    <View style={{ height: "100%" }}>
      <Text>Welcome:{user?.username} </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 42,
          margin: 4,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24 }}>Your Issues</Text>
        <View style={{}}>
          <Button
            title="Logout"
            onPress={() => {
              handleLogout();
            }}
          />
        </View>
      </View>
      <Problems />
      <Button
        title="Create an issue"
        onPress={() => {
          navigation.navigate("CreateIssue");
        }}
      />
    </View>
  );
};

export default Profile;
