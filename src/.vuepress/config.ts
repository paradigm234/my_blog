import { defineUserConfig } from "vuepress";
import { execSync } from "node:child_process";

import theme from "./theme.js";

/**
 * 取本次构建对应的 commit，写进页面里。
 * 「通知订阅者」的 workflow 会轮询线上页面，直到这个值变成最新提交，
 * 以此确保邮件里链接指向的新内容已经真的上线，而不是还在构建中。
 */
function buildSha(): string {
  const fromEnv = [
    process.env.CF_PAGES_COMMIT_SHA, // Cloudflare Pages
    process.env.WORKERS_CI_COMMIT_SHA, // Cloudflare Workers 构建
    process.env.GITHUB_SHA, // GitHub Actions
  ].find((v) => v && v.trim() !== "");

  if (fromEnv) return fromEnv.trim();

  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "dev";
  }
}

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "JHW的播客",
  description: "塔塔开！",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    // 把本次构建的 commit 写进页面，供「通知订阅者」的 workflow 判断新版本是否已上线
    ["meta", { name: "build-sha", content: buildSha() }],
  ],


  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
