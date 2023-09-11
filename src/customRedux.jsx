import { createContext, useContext, useEffect, useState } from "react";

let ReduxContext = createContext();

export const Provider = ({ store, children }) => (
  <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
);

export const useDispatch = () => {
  const store = useContext(ReduxContext);
  return store.dispatch;
};

export const useSelector = (selector) => {
  const store = useContext(ReduxContext);
  const [state, setState] = useState(selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newState = selector(store.getState());
      setState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, [store, selector]);

  return state;
};

export const createStore = (reducers, initialState) => {
  let state = initialState; // setting our initial state

  let listeners = []; // array of functions that'll hold the subscribe callbacks

  function getState() {
    // will return the current state
    return state;
  }

  function dispatch(action) {
    // will dispatch an action
    state = reducers(state, action);
    listeners.forEach((listener) => listener(state));
  }

  function subscribe(fn) {
    // will hold the listeners
    listeners.push(fn);

    return () => {
      let index = listeners.indexOf(fn);

      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
};
