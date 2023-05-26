import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { signup } from "./usersSlice";
import { UsersEntity } from "./usersEntity";

export function Signup() {
  const error: string | undefined = useSelector(
    (state: RootState) => state.users.error
  );
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = (event: any) => {
    event.preventDefault();

    dispatch(signup({ username, password, name, email }));
  };

  return (
    <View>
      <Text>Signup</Text>
      <TextInput
        placeholder="usernam"
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        placeholder="name"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <TextInput
        placeholder="email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <Button title="Signup" onPress={handleSignup} />

      <Text>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
});
