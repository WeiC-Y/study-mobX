const { override, addDecoratorsLegacy } = require("customize-cra")

module.exports = override(
  // 配置babel的decorates插件
  addDecoratorsLegacy()
)