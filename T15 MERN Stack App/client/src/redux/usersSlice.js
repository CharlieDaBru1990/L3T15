import { createSlice } from "@reduxjs/toolkit";

// The code starts by importing the createSlice function from the @reduxjs/toolkit package.
// This function is used to create a slice of state.

// Next, the usersSlice constant is defined using the createSlice function.
// It takes an object as an argument, which contains the configuration for the slice.
// The configuration includes the name of the slice and the initialState object that defines the initial state of the slice.

// Inside the reducers property of the configuration object, there are three reducer functions:
// SetUser, SetAllUsers, and SetNotifications.
// These functions are responsible for updating the state when corresponding actions are dispatched.

// Finally, the usersSlice.actions object is exported, which contains the action creators for the defined reducers.
// These action creators can be used to dispatch actions to update the state.

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    allUsers: [],
    notifications: [],
  },
  reducers: {
    SetUser(state, action) {
      state.user = action.payload;
    },
    SetAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    SetNotifications(state, action) {
      state.notifications = action.payload;
    },
  },
});

export const { SetUser, SetAllUsers, SetNotifications } = usersSlice.actions;

export default usersSlice.reducer;
