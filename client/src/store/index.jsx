// src/store/index.js
import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
