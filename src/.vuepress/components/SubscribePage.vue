<script setup lang="ts">
import SubscribeBox from "./SubscribeBox.vue";

const features = [
  {
    icon: "🔔",
    title: "只发更新通知",
    desc: "写新笔记、补旧文章时才会发信，不会拿来做任何别的用途。",
  },
  {
    icon: "🔒",
    title: "邮箱不外泄",
    desc: "名单只存在我自己的数据库里，每封邮件单独发送，收件人之间互相不可见。",
  },
  {
    icon: "🚪",
    title: "随时一键退订",
    desc: "每封邮件底部都有一键退订链接，点一下立刻生效，不需要找我。",
  },
];

const faqs = [
  {
    q: "多久会收到一封邮件？",
    a: "不确定，取决于更新频率。一般是「本周写了新东西」才会发一次，没有更新就不会打扰你。",
  },
  {
    q: "为什么收不到验证码？",
    a: "先翻一下垃圾箱 / 广告邮件。发件人是 blog@send.junhaowang.cn，把它加到白名单之后就稳了。验证码 5 分钟内有效，超时可以重新发送。",
  },
  {
    q: "怎么退订？",
    a: "两种方式：邮件底部的「点此一键退订」，或者在上面把模式切换成「我想退订」，收验证码确认即可。",
  },
  {
    q: "会泄露我的邮箱吗？",
    a: "不会。邮件是逐封单独发送的，别人看不到收件人列表；名单也只有我这个博客后端能读到。",
  },
];
</script>

<template>
  <div class="sub-page">
    <section class="sub-hero">
      <span class="sub-hero__badge">📮 邮件订阅</span>
      <p class="sub-hero__title">有新的笔记，第一时间告诉你</p>
      <p class="sub-hero__desc">
        这个博客主要记录我的学习笔记、实习总结和一些随笔。<br />
        留下邮箱，更新时我发一封简短的邮件给你——不想看了，随时退订。
      </p>
    </section>

    <SubscribeBox />

    <section class="sub-features">
      <div v-for="f in features" :key="f.title" class="sub-feature">
        <div class="sub-feature__icon">{{ f.icon }}</div>
        <h3 class="sub-feature__title">{{ f.title }}</h3>
        <p class="sub-feature__desc">{{ f.desc }}</p>
      </div>
    </section>

    <section class="sub-faq">
      <h2 class="sub-faq__title">常见问题</h2>
      <details v-for="item in faqs" :key="item.q" class="sub-faq__item">
        <summary>{{ item.q }}</summary>
        <p>{{ item.a }}</p>
      </details>
    </section>
  </div>
</template>

<style scoped>
.sub-page {
  margin-top: 8px;
}

/* 顶部横幅 */
.sub-hero {
  position: relative;
  overflow: hidden;
  margin-bottom: 26px;
  padding: 34px 32px;
  border-radius: 18px;
  background: linear-gradient(135deg, #eaf3ff 0%, #f5f9ff 55%, #eef7f2 100%);
  border: 1px solid #dbeafe;
}

.sub-hero__badge {
  display: inline-block;
  margin-bottom: 14px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #096dd9;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid #c7ddff;
  border-radius: 999px;
}

.sub-hero__title {
  margin: 0 0 12px;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.35;
  color: #0f172a;
  border: none;
  padding: 0;
}

.sub-hero__desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.85;
  color: #475569;
}

/* 卖点 */
.sub-features {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 26px 0 6px;
}

.sub-feature {
  padding: 20px 20px 18px;
  border: 1px solid var(--vp-c-divider, #e8eef6);
  border-radius: 14px;
  background: var(--vp-c-bg, #fff);
}

.sub-feature__icon {
  font-size: 22px;
  margin-bottom: 10px;
}

.sub-feature__title {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1, #1f2937);
  border: none;
  padding: 0;
}

.sub-feature__desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-2, #64748b);
}

/* FAQ */
.sub-faq {
  margin-top: 30px;
}

.sub-faq__title {
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1, #1f2937);
  border: none;
  padding: 0;
}

.sub-faq__item {
  margin-bottom: 10px;
  padding: 14px 18px;
  border: 1px solid var(--vp-c-divider, #e8eef6);
  border-radius: 12px;
  background: var(--vp-c-bg-soft, #fbfdff);
}

.sub-faq__item summary {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1, #334155);
  cursor: pointer;
}

.sub-faq__item p {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.8;
  color: var(--vp-c-text-2, #64748b);
}

:global([data-theme="dark"]) .sub-hero {
  background: linear-gradient(135deg, #12233a 0%, #16213a 55%, #122a26 100%);
  border-color: #1e3a5f;
}

:global([data-theme="dark"]) .sub-hero__badge {
  color: #7cc0ff;
  background: rgba(255, 255, 255, 0.08);
  border-color: #2a4a72;
}

:global([data-theme="dark"]) .sub-hero__title {
  color: #f1f5f9;
}

:global([data-theme="dark"]) .sub-hero__desc {
  color: #a9b6c7;
}

:global([data-theme="dark"]) .sub-feature,
:global([data-theme="dark"]) .sub-faq__item {
  background: var(--vp-c-bg-soft, #1b1b1f);
  border-color: #2a2f3a;
}

@media (max-width: 720px) {
  .sub-features {
    grid-template-columns: 1fr;
  }

  .sub-hero {
    padding: 26px 22px;
  }

  .sub-hero__title {
    font-size: 22px;
  }
}
</style>
