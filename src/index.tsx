import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { theme } from './styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
