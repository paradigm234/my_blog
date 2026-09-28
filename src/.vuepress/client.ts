import { defineClientConfig } from "vuepress/client";

import SubscribeBox from "./components/SubscribeBox.vue";

// 把订阅组件注册成全局组件，这样任何 md 里都能直接写 <SubscribeBox />
export default defineClientConfig({
  enhance({ app }) {
    app.component("SubscribeBox", SubscribeBox);
  },
});
