const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
  outputDir: "dist",
  lintOnSave: true,
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  devServer: {
    open: true,
    // host: "localhost",
    // port: "8800", // 前端服务端口
    proxy: {
      '/api': {
        target: "http://localhost:9999", // 后端url
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  chainWebpack: (config) => {
    // alias 配置
    config.resolve.alias.set("@", resolve("src"));
    // 热启动
    config.resolve.symlinks(true);
  },
};
