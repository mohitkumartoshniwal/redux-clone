// import { legacy_createStore as createStore } from "redux";
import { createStore } from "../customRedux";

import counterReducer from "./reducers/counterReducer";

const initialState = {
  count: 0,
};

const store = createStore(counterReducer, initialState);

export default store;
