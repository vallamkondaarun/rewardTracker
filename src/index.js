import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reportWebVitals from './reportWebVitals';
import customerReducer from './store/reducers/customer.reducer'
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  customerReducer: customerReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
      <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
