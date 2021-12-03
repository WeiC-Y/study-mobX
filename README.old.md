初始化
```shell
$ create-react-app mobx-study
```

安装改变 `create-react-app` 中 `webpack` 配置插件
```shell
$ yarn add -D react-app-rewired customize-cra @babel/plugin-proposal-decorators
```

在根目录下创建 `config-overrides.js` 并写入以下内容
```js
const { override, addDecoratorsLegacy } = require('customize-cra')

module.exports = override{
  addDecoratorsLegacy()
}

修改 `package.json文件中的 scripts 启动脚本
```
修改