<script setup lang="ts">
import { onMounted, ref } from "vue";

import { API_BASE } from "../subscribe-api";

type Mode = "subscribe" | "unsubscribe";
type Step = "email" | "code" | "done";

const mode = ref<Mode>("subscribe");
const step = ref<Step>("email");
const email = ref("");
const code = ref("");
const loading = ref(false);
const error = ref("");
const doneMessage = ref("");
const count = ref<number | null>(null);
const cooldown = ref(0);
let timer: number | undefined;

const stepIndex = () => (step.value === "email" ? 0 : step.value === "code" ? 1 : 2);

function msgOf(e: unknown): string {
  return e instanceof Error ? e.message : "网络异常，请稍后再试";
}

async function call(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as { code?: number; msg?: string; data?: any };
  if (!res.ok || data?.code !== 0) {
    throw new Error(data?.msg || `请求失败（HTTP ${res.status}）`);
  }
  return data.data;
}

function startCooldown(seconds: number) {
  cooldown.value = seconds;
  window.clearInterval(timer);
  timer = window.setInterval(() => {
    cooldown.value -= 1;
    if (cooldown.value <= 0) window.clearInterval(timer);
  }, 1000);
}

async function requestCode() {
  error.value = "";
  if (!email.value) {
    error.value = "请先填写邮箱";
    return;
  }
  loading.value = true;
  try {
    await call("/api/subscribe/request", { email: email.value, action: mode.value });
    step.value = "code";
    startCooldown(60);
  } catch (e) {
    error.value = msgOf(e);
  } finally {
    loading.value = false;
  }
}

async function confirm() {
  error.value = "";
  if (!code.value) {
    error.value = "请填写验证码";
    return;
  }
  loading.value = true;
  try {
    const data = await call("/api/subscribe/confirm", {
      email: email.value,
      code: code.value,
      action: mode.value,
    });
    doneMessage.value =
      mode.value === "subscribe"
        ? `订阅成功，现在共有 ${data?.subscribers ?? 0} 位读者`
        : "已取消订阅，不会再收到更新邮件";
    step.value = "done";
    await fetchCount();
  } catch (e) {
    error.value = msgOf(e);
  } finally {
    loading.value = false;
  }
}

function switchMode() {
  mode.value = mode.value === "subscribe" ? "unsubscribe" : "subscribe";
  reset();
}

function reset() {
  step.value = "email";
  code.value = "";
  error.value = "";
  doneMessage.value = "";
}

async function fetchCount() {
  try {
    const res = await fetch(`${API_BASE}/api/subscribers/count`);
    const data = await res.json();
    if (data?.code === 0) count.value = data.data?.count ?? null;
  } catch {
    // 后端没起来时静默失败，不打扰读者
  }
}

onMounted(fetchCount);
</script>

<template>
  <div class="sub-card">
    <div class="sub-steps" aria-hidden="true">
      <template v-for="(label, i) in ['填写邮箱', '输入验证码', '完成']" :key="label">
        <div class="sub-step" :class="{ active: stepIndex() >= i, current: stepIndex() === i }">
          <span class="sub-step__dot">{{ stepIndex() > i ? "✓" : i + 1 }}</span>
          <span class="sub-step__label">{{ label }}</span>
        </div>
        <div v-if="i < 2" class="sub-step__line" :class="{ active: stepIndex() > i }" />
      </template>
    </div>

    <div v-if="step === 'done'" class="sub-done">
      <div class="sub-done__icon">✓</div>
      <p class="sub-done__text">{{ doneMessage }}</p>
      <p class="sub-done__hint">
        {{ mode === "subscribe" ? "以后有新内容我会发邮件通知你，随时可退订。" : "如果这是误操作，可以再订阅一次。" }}
      </p>
      <button class="sub-btn sub-btn--ghost" type="button" @click="reset">再操作一次</button>
    </div>

    <form v-else class="sub-form" @submit.prevent="step === 'email' ? requestCode() : confirm()">
      <label class="sub-field">
        <span class="sub-field__label">邮箱地址</span>
        <input
          v-model.trim="email"
          class="sub-input"
          type="email"
          placeholder="your@email.com"
          :disabled="loading || step === 'code'"
          required
        />
      </label>

      <label v-if="step === 'code'" class="sub-field">
        <span class="sub-field__label">验证码（已发到 {{ email }}）</span>
        <input
          v-model.trim="code"
          class="sub-input sub-input--code"
          inputmode="numeric"
          maxlength="6"
          placeholder="6 位数字"
          :disabled="loading"
          autofocus
        />
      </label>

      <button class="sub-btn" type="submit" :disabled="loading || (step === 'email' && cooldown > 0)">
        {{
          loading
            ? "处理中…"
            : step === "email"
              ? cooldown > 0
                ? `${cooldown}s 后可重试`
                : mode === "subscribe"
                  ? "发送验证码"
                  : "发送退订验证码"
              : mode === "subscribe"
                ? "确认订阅"
                : "确认退订"
        }}
      </button>

      <p v-if="error" class="sub-msg sub-msg--error">{{ error }}</p>
      <p v-else-if="step === 'code'" class="sub-msg">验证码 5 分钟内有效，收不到就翻翻垃圾箱。</p>
    </form>

    <div class="sub-foot">
      <span v-if="count !== null" class="sub-count">已有 {{ count }} 位读者订阅</span>
      <span v-else />
      <a class="sub-link" href="#" @click.prevent="switchMode">
        {{ mode === "subscribe" ? "我想退订" : "回到订阅" }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.sub-card {
  padding: 28px 30px 22px;
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 16px;
  background: var(--vp-c-bg, #fff);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
}

/* 步骤条 */
.sub-steps {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.sub-step {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: var(--vp-c-text-3, #9ca3af);
  white-space: nowrap;
}

.sub-step.active {
  color: #096dd9;
}

.sub-step__dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: #cbd5e1;
  transition: background 0.2s;
}

.sub-step.active .sub-step__dot {
  background: #096dd9;
}

.sub-step.current .sub-step__dot {
  box-shadow: 0 0 0 4px rgba(9, 109, 217, 0.15);
}

.sub-step__line {
  flex: 1 1 auto;
  height: 2px;
  border-radius: 2px;
  background: #e5e7eb;
}

.sub-step__line.active {
  background: #096dd9;
}

/* 表单 */
.sub-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sub-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sub-field__label {
  font-size: 13px;
  color: var(--vp-c-text-2, #6b7280);
}

.sub-input {
  width: 100%;
  padding: 13px 15px;
  font-size: 15px;
  border: 1px solid var(--vp-c-divider, #d1d5db);
  border-radius: 10px;
  background: var(--vp-c-bg-soft, #f8fafc);
  color: var(--vp-c-text-1, #111827);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.sub-input:focus {
  border-color: #096dd9;
  box-shadow: 0 0 0 3px rgba(9, 109, 217, 0.12);
}

.sub-input--code {
  letter-spacing: 6px;
  font-weight: 700;
  font-size: 18px;
}

.sub-btn {
  padding: 13px 22px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #1677ff, #096dd9);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
  box-shadow: 0 6px 16px rgba(9, 109, 217, 0.25);
}

.sub-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(9, 109, 217, 0.32);
}

.sub-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}

.sub-btn--ghost {
  color: var(--vp-c-text-1, #1f2937);
  background: transparent;
  border: 1px solid var(--vp-c-divider, #d1d5db);
  box-shadow: none;
}

.sub-msg {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2, #6b7280);
}

.sub-msg--error {
  color: #dc2626;
}

/* 完成态 */
.sub-done {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 6px 0 14px;
  text-align: center;
}

.sub-done__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 26px;
  color: #059669;
  background: #d1fae5;
}

.sub-done__text {
  margin: 4px 0 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1, #111827);
}

.sub-done__hint {
  margin: 0 0 6px;
  font-size: 13px;
  color: var(--vp-c-text-2, #6b7280);
}

/* 底部 */
.sub-foot {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider, #eef2f7);
  font-size: 12px;
  color: var(--vp-c-text-3, #9ca3af);
}

.sub-link {
  color: var(--vp-c-text-2, #6b7280);
  text-decoration: underline;
}

:global([data-theme="dark"]) .sub-card {
  background: var(--vp-c-bg-soft, #1b1b1f);
  box-shadow: none;
}

@media (max-width: 520px) {
  .sub-card {
    padding: 20px 18px 16px;
  }

  .sub-step__label {
    display: none;
  }
}
</style>
