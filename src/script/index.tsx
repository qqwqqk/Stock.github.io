import * as React from "react";
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import configureStore from "./store";

import Main from "./component/main";

const mountNode = document.getElementById('root');

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Main />
    </HashRouter>
  </Provider>
)

ReactDOM.render(<Root />, mountNode);