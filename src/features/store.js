// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./budgetSlice";

// Load state from localStorage
function loadState() {
  try {
    const serializedState = localStorage.getItem("budgetState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
}

// Save state to localStorage
function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("budgetState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
}

const preloadedState = loadState();

// Create the store
const store = configureStore({
  reducer: {
    budget: budgetReducer,
  },
  preloadedState,
});

// Subscribe to store changes
store.subscribe(() => {
  saveState({
    budget: store.getState().budget,
  });
});

export default store;
