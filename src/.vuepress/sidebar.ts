
import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // 编程分类：/coding/ 路径下的侧边栏
  "/coding/": [
    {
      text: "Java基础",
      icon: "ri:java-fill",
      expanded: true,
      // 手动列出Java基础的子项（如果有多个文件，逐个添加）
      children: [
        {
          text: "JavaSE核心",
          icon: "ri:java-fill",
          link: "javase.md"  // 对应 /coding/javase.md
        },
        // 若有更多Java相关文件，继续添加子项
        // { text: "Java进阶", icon: "ri:java-fill", link: "java-advance.md" }
      ]
    },
    {
      text: "数据结构与算法",
      icon: "hugeicons:algorithm",
      expanded: true,
      children: [
        {
          text: "核心数据结构",
          icon: "hugeicons:algorithm",
          link: "Data Structure.md"  // 对应 /coding/Data Structure.md
        }
      ]
    },
    {
      text: "Python",
      icon: "ant-design:python-outlined",
      expanded: true,
      children: [
        {
          text: "Python入门",
          icon: "ant-design:python-outlined",
          link: "python1.md"  // 对应 /coding/python1.md
        }
      ]
    }
  ],

  // 博客开发日志：/zh/posts/about_blog/ 路径下的侧边栏
  "/about_blog/": [
    {
      text: "开发日志",
      icon: "mdi:timeline-clock",
      expanded: true,
      children: [
        {
          text: "Acwing相关记录",
          icon: "mdi:timeline-clock",
          link: "develop_log"  // 对应 /about_blog/develop_log.md
        }
      ]
    }
  ],

  // 个人爱好：/hobby/ 路径下的侧边栏
  "/hobby/": [
    {
      text: "兴趣爱好",
      icon: "gravity-ui:face-fun",
      expanded: true,
      children: [
        {
          text: "音乐",
          icon: "iconoir:music-double-note-plus",
          link: "music.md"  // 对应 /hobby/music.md
        },
        {
          text: "围棋",
          icon: "pixelarticons:chess",
          link: "go.md"  // 对应 /hobby/go.md
        },
        {
          text: "动漫",
          icon: "streamline-ultimate:video-call",
          link: "anime.md"  // 对应 /hobby/anime.md
        },
        {
          text: "游戏",
          icon: "streamline-plump:controller-1-remix",
          link: "anime.md"  // 对应 /hobby/game.md
        }
      ]
    }
  ],

  // 学习资料：/study/ 路径下的侧边栏
  "/study/": [
    {
      text: "学习资料汇总",
      icon: "emojione-v1:document",
      expanded: true,
      children: [
        {
          text: "资料1",
          icon: "emojione-v1:document",
          link: "1.md"  // 对应 /study/1.md
        }
      ]
    }
  ],

  // 随笔：/something_inside/ 路径下的侧边栏
  "/something_inside/": [
    {
      text: "随笔记录",
      icon: "pen-to-square",
      expanded: true,
      children: [
        {
          text: "随笔1",
          icon: "pen-to-square",
          link: "1.md"  // 对应 /something_inside/1.md
        }
      ]
    }
  ]
});