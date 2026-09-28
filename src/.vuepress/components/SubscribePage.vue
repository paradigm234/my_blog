<script setup lang="ts">
import SubscribeBox from "./SubscribeBox.vue";

const points = [
  {
    title: "只发更新通知",
    desc: "写新笔记或补旧文章时才发信。没有更新，就不会打扰你。",
    icon: "mail",
  },
  {
    title: "邮箱不外泄",
    desc: "名单只存在这个博客自己的数据库里，邮件逐封发送，收件人之间互相不可见。",
    icon: "shield",
  },
  {
    title: "随时可以退订",
    desc: "每封邮件底部都有一键退订，也可以在本页切换成退订模式，即时生效。",
    icon: "logout",
  },
];

const faqs = [
  {
    q: "多久会收到一封邮件？",
    a: "取决于更新频率。通常是我写了新东西才会发一次，没有更新就没有邮件。",
  },
  {
    q: "收不到验证码怎么办？",
    a: "先看垃圾邮件和广告邮件。发件人是 blog@send.junhaowang.cn，加入白名单后就不会再被拦。验证码 5 分钟内有效，过期可以重新发送。",
  },
  {
    q: "怎么退订？",
    a: "两种方式：点邮件底部的「一键退订」，或者在页面右上把模式切换成退订，收验证码确认即可。",
  },
  {
    q: "会泄露我的邮箱吗？",
    a: "不会。邮件逐封单独投递，其他订阅者看不到你的地址；名单也只有我的后端能读取，不会交给第三方。",
  },
];
</script>

<template>
  <div class="wrap">
    <header class="intro">
      <p class="intro__kicker">邮件订阅</p>
      <h2 class="intro__title">第一时间读到新的笔记</h2>
      <p class="intro__desc">
        这里记录我的学习笔记、实习总结和一些随笔。留下邮箱，更新时你会收到一封简短的邮件；
        不想看了，随时退订。
      </p>
    </header>

    <SubscribeBox />

    <section class="points">
      <div v-for="p in points" :key="p.title" class="point">
        <span class="point__icon">
          <svg
            v-if="p.icon === 'mail'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="M3.5 7.5l8.5 6 8.5-6" />
          </svg>
          <svg
            v-else-if="p.icon === 'shield'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3.5l7 3v5.2c0 4.3-2.9 7.4-7 8.8-4.1-1.4-7-4.5-7-8.8V6.5z" />
            <path d="M9.2 12.1l2 2 3.6-3.9" />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 17l5-5-5-5" />
            <path d="M20 12H9" />
            <path d="M12.5 4H6a2 2 0 00-2 2v12a2 2 0 002 2h6.5" />
          </svg>
        </span>
        <div class="point__body">
          <p class="point__title">{{ p.title }}</p>
          <p class="point__desc">{{ p.desc }}</p>
        </div>
      </div>
    </section>

    <section class="faq">
      <h2 class="faq__heading">常见问题</h2>
      <details v-for="item in faqs" :key="item.q" class="faq__item">
        <summary>
          <span>{{ item.q }}</span>
          <span class="faq__mark" />
        </summary>
        <p class="faq__answer">{{ item.a }}</p>
      </details>
    </section>

    <p class="footnote">邮件由 Resend 投递 · 名单存放于我自己的数据库 · 不用于任何其他用途</p>
  </div>
</template>

<style scoped>
.wrap {
  --ui-fg: #0a0a0a;
  --ui-muted: #737373;
  --ui-subtle: #fafafa;
  --ui-border: #e5e5e5;
  --ui-accent: #096dd9;
}

:global([data-theme="dark"]) .wrap {
  --ui-fg: #fafafa;
  --ui-muted: #a3a3a3;
  --ui-subtle: #1a1a1a;
  --ui-border: rgba(255, 255, 255, 0.12);
  --ui-accent: #3b82f6;
}

/* 开头 */
.intro {
  margin: 4px 0 22px;
}

.intro__kicker {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--ui-accent);
}

.intro__title {
  margin: 0 0 12px;
  padding: 0;
  border: none;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: var(--ui-fg);
}

.intro__desc {
  margin: 0;
  max-width: 46em;
  font-size: 14px;
  line-height: 1.9;
  color: var(--ui-muted);
}

/* 说明列表 */
.points {
  margin-top: 26px;
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  overflow: hidden;
}

.point {
  display: flex;
  gap: 14px;
  padding: 18px 20px;
  background: var(--ui-subtle);
}

.point + .point {
  border-top: 1px solid var(--ui-border);
}

.point__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  color: var(--ui-accent);
  background: rgba(9, 109, 217, 0.08);
}

.point__icon svg {
  width: 18px;
  height: 18px;
}

:global([data-theme="dark"]) .point__icon {
  background: rgba(59, 130, 246, 0.14);
}

.point__body {
  min-width: 0;
}

.point__title {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ui-fg);
}

.point__desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.75;
  color: var(--ui-muted);
}

/* FAQ */
.faq {
  margin-top: 32px;
}

.faq__heading {
  margin: 0 0 6px;
  padding: 0;
  border: none;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ui-fg);
}

.faq__item {
  border-bottom: 1px solid var(--ui-border);
}

.faq__item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 15px 2px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ui-fg);
  cursor: pointer;
  list-style: none;
}

.faq__item summary::-webkit-details-marker {
  display: none;
}

.faq__mark {
  position: relative;
  flex: none;
  width: 12px;
  height: 12px;
}

.faq__mark::before,
.faq__mark::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 12px;
  height: 1.5px;
  border-radius: 2px;
  background: var(--ui-muted);
  transition: transform 0.2s ease;
}

.faq__mark::after {
  transform: rotate(90deg);
}

.faq__item[open] .faq__mark::after {
  transform: rotate(0deg);
}

.faq__answer {
  margin: 0;
  padding: 0 2px 16px;
  max-width: 52em;
  font-size: 13px;
  line-height: 1.85;
  color: var(--ui-muted);
}

.footnote {
  margin: 28px 0 0;
  font-size: 12px;
  color: var(--ui-muted);
  opacity: 0.85;
}

@media (max-width: 560px) {
  .intro__title {
    font-size: 21px;
  }

  .point {
    padding: 16px;
  }
}
</style>
