import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "JHW的播客",
  description: "塔塔开！",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],


  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
