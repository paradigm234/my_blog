import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "JHW的播客",
  description: "塔塔开！",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    // 把本次构建的 commit 写进页面，供「通知订阅者」的 workflow 判断新版本是否已上线
    ["meta", { name: "build-sha", content: process.env.CF_PAGES_COMMIT_SHA ?? "dev" }],
  ],


  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
