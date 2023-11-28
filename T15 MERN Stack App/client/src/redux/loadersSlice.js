import { createSlice } from "@reduxjs/toolkit";

// The code provided consists of a single file that exports a Redux slice. Here's a breakdown of its structure:

// Import Statement: The code begins with an import statement that imports the
// createSlice function from the @reduxjs/toolkit package. This function is used to create a Redux slice.

// createSlice Function: The createSlice function is invoked with an object as its argument.
// This object defines the name of the slice (loaders), the initial state of the slice, and the reducers.

// Initial State: The initialState property of the object defines the initial state of the loaders slice.
// In this case, it contains two properties: loading and buttonLoading, both set to false.

// Reducers: The reducers property of the object defines the actions that can be dispatched to modify the state.
// In this code, there are two reducers: SetLoading and SetButtonLoading. These reducers update the
// loading and buttonLoading properties of the state, respectively.

// Export Statements: The code exports the action creators (SetLoading and SetButtonLoading)
// and the reducer function (loadersSlice.reducer) from the slice.

export const loadersSlice = createSlice({
  name: "loaders",
  initialState: {
    loading: false,
    buttonLoading: false,
  },
  reducers: {
    SetLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetButtonLoading: (state, action) => {
      state.buttonLoading = action.payload;
    },
  },
});

export const { SetLoading, SetButtonLoading } = loadersSlice.actions;

export default loadersSlice.reducer;
