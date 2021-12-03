初始化
```shell
$ create-react-app mobx-study
```

安装改变 `create-react-app` 中 `webpack` 配置插件
```shell
# react-app-rewired 用于修改 cra 创建的react项目的默认webpack配置项
# customize-cra 提供webpack配置插件 覆盖默认的webpack插件
# @babel/plugin-proposal-decorators 支持 Decorator 装饰器的插件
$ yarn add -D react-app-rewired customize-cra @babel/plugin-proposal-decorators
```

在根目录下创建 `config-overrides.js` 并写入以下内容
```js
const { override, addDecoratorsLegacy } = require('customize-cra')

module.exports = override{
  addDecoratorsLegacy()
}
```

修改 `package.json` 文件中的 `scripts` 启动脚本

```json
-  "start": "react-scripts start",
+  "start": "react-app-rewired start",
-  "build": "react-scripts build",
+  "build": "react-app-rewired start",
-  "test": "react-scripts test --env=jsdom",
+  "test": "react-app-rewired test --env=jsdom",
```
