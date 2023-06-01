import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { Problems } from "./features/problems/problems";
import { Login } from "./features/users/login";
import { Signup } from "./features/users/signup";
import { store } from "./store";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import BottomTabs from "./navigation/BottomTabs";
import Home from "./screens/Home";
import CreateIssue from "./screens/CreateIssue";
import { signup } from "./features/users/usersSlice";
import React from "react";

// Create a client
const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: "Home", headerShown: false }}
              />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen name="CreateIssue" component={CreateIssue} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
});
