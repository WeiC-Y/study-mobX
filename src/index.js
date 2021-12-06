import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'

import App from './App.jsx'
// 引入rootStore
import rootStore from './stores'

// Provider 就是利用了 React框架的Context上下文对象传递参数
ReactDOM.render(
  <Provider {...new rootStore()}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

