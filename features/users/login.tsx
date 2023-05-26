import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { login, signup, updateToken } from "./usersSlice";
import { UsersEntity } from "./usersEntity";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "@tanstack/react-query";

export function Login({ navigation }: { navigation: any }) {
  const token: string | undefined | null = useSelector(
    (state: RootState) => state.users.token
  );
  const error: string | undefined = useSelector(
    (state: RootState) => state.users.error
  );

  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = (event: any) => {
    event.preventDefault();
    console.log("loging in");
    dispatch(login(new UsersEntity(username, password))).then((res) => {
      res.meta.requestStatus === "fulfilled" && navigation.navigate("Home");
    });
  };

  const queryClient = useQueryClient();
  useEffect(() => {
    const asyncFunc = async () => {
      const token = await SecureStore.getItemAsync("token");
      console.log("logged in", token);
      if (!token) return;
      queryClient.invalidateQueries(["problems"]);
      queryClient.invalidateQueries(["all-problems"]);
      dispatch(updateToken(token));
      navigation.navigate("Home");
    };
    asyncFunc();
  }, [token]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: 12,
        gap: 6,
      }}
    >
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <View style={{ width: "50%" }}>
        <Button onPress={(e) => handleLoginSuccess(e)} title="Login" />
      </View>

      <View style={{ marginTop: 12 }}>
        <Text>Don't have an account ? </Text>
        <Text
          onPress={() => navigation.navigate("Signup")}
          style={{ fontWeight: "bold", color: "blue", fontSize: 16 }}
        >
          Create an Account
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});
