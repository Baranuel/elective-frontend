import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProblemEntity } from "./problemEntity";
import { ProblemsAPI } from "./problemsAPI";

// First, create the thunk
export const fetchAllProblems = createAsyncThunk(
  "problems/fetchAllProblems", // This is a name for the thunk (must be unique) not the endpoint
  async (thunkAPI) => {
    const response = ProblemsAPI.fetchAllProblems();

    return response;
  }
);
export const createProblem = createAsyncThunk(
  "problems/create", // This is a name for the thunk (must be unique) not the endpoint
  async (problem: ProblemEntity, thunkAPI) => {
    const state = thunkAPI.getState() as any;

    const response = await ProblemsAPI.create(problem, state);
    console.log("response", response);
    return response;
  }
);

interface ProblemsState {
  problems: ProblemEntity[];
}

const initialState = {
  problems: [],
} as ProblemsState;

// Then, handle actions in your reducers:
const problemsSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllProblems.fulfilled, (state, action) => {
      // Add user to the state array

      state.problems = action.payload;
    });
    builder.addCase(createProblem.fulfilled, (state, action) => {
      // Add user to the state array
      state.problems.push(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function

export default problemsSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))
