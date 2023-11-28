// Key Concepts

// Redux is a predictable state container for JavaScript applications.
// It helps manage the state of an application in a predictable and centralized manner.
// Redux follows a unidirectional data flow, making it easier to understand and debug complex applications.

// Store
// The store is the central hub of a Redux application.
// It holds the state of the application and provides methods to update and access the state.
// The store is created using the createStore function provided by Redux.

// Reducer
// Reducers are pure functions that specify how the application's state changes in response to actions.
// They take the current state and an action as input and return a new state. Reducers are combined to create the root reducer,
// which is passed to the store during configuration.

// The configureStore function is imported from the @reduxjs/toolkit library.
// This function simplifies the process of creating a Redux store by providing sensible defaults and enabling additional features.

// Two reducers, usersReducer and loadersReducer, are imported from separate files.
// These reducers define how the state should be updated in response to specific actions related to users and loaders.

// The configureStore function is called with an object as its argument.
// This object contains a reducer property, which is an object that maps the state slices to their respective reducers.
// In this case, the users slice is associated with the usersReducer, and the loaders slice is associated with the loadersReducer.

// The configureStore function returns a Redux store, which is assigned to the store constant.

// Finally, the store is exported as the default export of the module.

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import loadersReducer from "./loadersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    loaders: loadersReducer,
  },
});

export default store;
