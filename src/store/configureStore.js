import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// const middlewares = [thunk];
const middlewares = [];

const configureStore = function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
    ),
  );
};

export default configureStore;
