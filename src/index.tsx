import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import { store, persistor } from './state-management/redux/store';

import App from './App';
import './theme/swiper-styles.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Roboto Mono', 'monospace'].join(','),
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// @ts-ignore
module.hot.accept();
