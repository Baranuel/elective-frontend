import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersAPI } from "./usersAPI";
import { UsersEntity } from "./usersEntity";
import * as SecureStore from "expo-secure-store";

// First, create the thunk
export const login = createAsyncThunk(
  "auth/login", // This is a name for the thunk (must be unique) not the endpoint
  async (user: UsersEntity, thunkAPI) => {
    console.log("running login");
    const response = await UsersAPI.login(user);
    // save to secure store
    await SecureStore.setItemAsync("token", response.access_token);
    console.log(response);
    return response;
  }
);

export const logout = createAsyncThunk(
  "auth/logout", // This is a name for the thunk (must be unique) not the endpoint
  async () => {
    console.log("running logout");
    await SecureStore.deleteItemAsync("token");
  }
);
export const signup = createAsyncThunk(
  "auth/signup", // This is a name for the thunk (must be unique) not the endpoint
  async (user: UsersEntity, thunkAPI) => {
    const response = UsersAPI.signup(user);

    return response;
  }
);

interface UsersState {
  token: string | undefined | null;
  error: string | undefined;
}

const initialState = {
  token: undefined,
  error: undefined,
} as UsersState;

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("running signup fulfilled");
      state.error = undefined;
      if (action.payload.id != undefined) {
        state.error = "Signup success";
      }
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("running login fulfilled");
      state.error = undefined;
      state.token = action.payload?.access_token;
    });

    builder.addCase(login.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 401") {
        state.error = "Invalid login";
        state.token = undefined;
      }

      builder.addCase(logout.fulfilled, (state, action) => {
        state.error = undefined;
        state.token = undefined;
      });

      console.log("error in slice", action.error);
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateToken } = usersSlice.actions;

export default usersSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))
