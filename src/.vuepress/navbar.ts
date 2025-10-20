// navbar.ts
import { navbar } from "vuepress-theme-hope";

// 直接用默认导出（export default），与 theme.ts 的默认导入匹配
export default navbar([
  // 首页（对应根目录 README.md）
  "/",

  // 编程分类
  {
    text: "编程",
    icon: "laptop-code",
    prefix: "/coding/",
    children: [
      {
        text: "学习笔记",
        icon: "pen-to-square",
        children: [
          { text: "python", icon: "ant-design:python-outlined", link: "python1" },
          { text: "javase", icon: "streamline-ultimate:java", link: "javase" },
          { text: "数据结构", icon: "hugeicons:algorithm", link: "Data Structure" },
        ],
      },
    ],
  },

  // 随笔分类
  {
    text: "随笔",
    icon: "pen-to-square",
    prefix: "/something_inside/",
    children: [
      {
        text: "随便写写",
        icon: "pen-to-square",
        children: [
          { text: "随笔1", icon: "pen-to-square", link: "1" },
          { text: "随笔2", icon: "pen-to-square", link: "2" },
        ],
      },
    ],
  },

  // 关于博客分类
  {
    text: "关于博客",
    icon: "book",
    prefix: "/about_blog/",
    children: [
      {
        text: "博客开发日志",
        icon: "fa6-solid:blog",
        children: [
          { text: "日志1", icon: "fa6-solid:blog", link: "1" },
        ],
      },
    ],
  },

  // 学习分类
  {
    text: "学习",
    icon: "copy",
    prefix: "/study/",
    children: [
      {
        text: "有用的学习资料",
        icon: "emojione-v1:document",
        children: [
          { text: "资料1", icon: "emojione-v1:document", link: "1" },
        ],
      },
    ],
  },

  // 个人爱好分类
  {
    text: "个人爱好",
    icon: "gravity-ui:face-fun",
    prefix: "/hobby/",
    children: [
      {
        text: "兴趣爱好",
        children: [
          { text: "游戏", icon: "streamline-plump:controller-1-remix", link: "game" },
          { text: "动漫", icon: "streamline-ultimate:video-call", link: "anime" },
          { text: "围棋", icon: "pixelarticons:chess", link: "go" },
          { text: "音乐", icon: "iconoir:music-double-note-plus", link: "music" },
        ],
      }
    ]
  },

  // // 主题文档链接（可选）
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);