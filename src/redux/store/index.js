import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //for redux-tools (browser)

export default createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);
