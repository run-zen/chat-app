import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import {store, persistor} from "./redux/store.js";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import SnackbarProvider from 'react-simple-snackbar'
import {AlertsContextProvider} from "./context/snackbarContext";


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SnackbarProvider>
                <AlertsContextProvider>
                    <App persistor={persistor}/>
                </AlertsContextProvider>
            </SnackbarProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
