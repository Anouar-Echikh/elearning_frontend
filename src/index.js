import React from "react";
import ReactDOM from "react-dom";
import "./assets/vendors/style";
import "./styles/app.scss";
import '@uppy/core/dist/style.css'
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '@uppy/dashboard/dist/style.css'
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { onLodingSignIn } from "./redux/actions/authActions";
import {
  MuiPickersUtilsProvider,
  
} from '@material-ui/pickers';
import frLocale from "date-fns/locale/fr";
import PickerDateFns from '@date-io/date-fns';
import { SnackbarProvider } from 'notistack';

store.dispatch(onLodingSignIn());

ReactDOM.render(
  <Provider store={store}>
  
   <MuiPickersUtilsProvider utils={PickerDateFns} locale={frLocale}>
   <SnackbarProvider>
      <App />
    </SnackbarProvider>
   </MuiPickersUtilsProvider>
 
   </Provider>
  ,

  document.getElementById("root")
);
