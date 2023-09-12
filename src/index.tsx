import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ConfigProvider
          theme={{
 
            components: {
              Tabs: {
                /* here is your component tokens */
                itemActiveColor: "#f5621e",
                itemHoverColor: "#f5621e",
                itemSelectedColor: "#f5621e"
              },
              Timeline: {
                dotBg: "black",
              },
              Menu: {
                itemHoverColor:"#f5621e",
                colorPrimary: "#f5621e"
              }
            },
            
          }}
        >
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
