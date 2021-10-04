import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { theme } from 'styles/theme';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
