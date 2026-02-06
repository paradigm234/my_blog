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
          { text: "stl", icon: "mdi:language-cpp", link: "stl" },
        ],
      },
    ],
  },
  //计算机基础
  {
    text: "计算机牢四门",
    icon: "icon-park:code-computer",
    prefix: "/computer_base/",
    children: [
      {
        text: "408",
        children: [
          { text: "数据结构与算法", icon: "hugeicons:algorithm", link: "Data Structure" },
          { text: "计算机网络", icon: "ooui:network", link: "Computer Networking" },

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
          { text: "讯飞实习工作总结", icon: "streamline-freehand:office-work-wireless", link: "讯飞实习工作总结" },
          { text: "随便写写", icon: "emojione-monotone:fountain-pen", link: "随便写写" },

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
          { text: "2025-10-22", icon: "fa6-solid:blog", link: "2025-10-22" },
          { text: "2025-10-25", icon: "fa6-solid:blog", link: "2025-10-25" },
          { text: "2025-10-28", icon: "fa6-solid:blog", link: "2025-10-28" },
          { text: "2025-11-04", icon: "fa6-solid:blog", link: "2025-11-04" },
          { text: "2025-11-08", icon: "fa6-solid:blog", link: "2025-11-08" },
          { text: "2025-11-09", icon: "fa6-solid:blog", link: "2025-11-09" },
          { text: "2025-11-17", icon: "fa6-solid:blog", link: "2025-11-17" },
          { text: "2025-12-16", icon: "fa6-solid:blog", link: "2025-12-16" },
          { text: "2026-1-14", icon: "fa6-solid:blog", link: "2026-1-14" },
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
        text: "本科学习资料",
        icon: "emojione-v1:document",
        children: [
          { text: "人工智能基础", icon: "hugeicons:ai-book", link: "人工智能基础" },
          { text: "数字信号处理", icon: "streamline-plump:wave-signal-square-solid", link: "dsp_review" },
          { text: "高频电子线路", icon: "maki:communications-tower", link: "High-Frequency Electronic Circuits" },
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
          { text: "电影", icon: "icon-park-solid:movie", link: "movie" },
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