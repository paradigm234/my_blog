<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";

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
const otpFocused = ref(false);
const otpRef = ref<HTMLInputElement | null>(null);
let timer: number | undefined;

const cells = [0, 1, 2, 3, 4, 5];
const canSubmitEmail = computed(() => email.value.length > 0 && !loading.value && cooldown.value <= 0);
const canSubmitCode = computed(() => code.value.length === 6 && !loading.value);

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
    error.value = "请先填写邮箱地址";
    return;
  }
  loading.value = true;
  try {
    await call("/api/subscribe/request", { email: email.value, action: mode.value });
    step.value = "code";
    startCooldown(60);
    await nextTick();
    otpRef.value?.focus();
  } catch (e) {
    error.value = msgOf(e);
  } finally {
    loading.value = false;
  }
}

async function confirm() {
  error.value = "";
  if (code.value.length !== 6) {
    error.value = "请输入 6 位验证码";
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

function onCodeInput(event: Event) {
  const el = event.target as HTMLInputElement;
  code.value = el.value.replace(/\D/g, "").slice(0, 6);
  el.value = code.value;
}

function focusOtp() {
  otpRef.value?.focus();
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
    // 后端异常时静默失败，不打扰读者
  }
}

onMounted(fetchCount);
</script>

<template>
  <section class="panel">
    <header class="panel__head">
      <div>
        <h3 class="panel__title">{{ mode === "subscribe" ? "订阅更新" : "取消订阅" }}</h3>
        <p class="panel__sub">
          {{
            mode === "subscribe"
              ? "留下邮箱，有新内容时收到一封简短的邮件"
              : "输入订阅时使用的邮箱，收验证码后即可退订"
          }}
        </p>
      </div>
      <span v-if="count !== null" class="panel__stat">
        <span class="panel__stat-dot" />
        {{ count }} 位读者
      </span>
    </header>

    <div v-if="step === 'done'" class="done">
      <span class="done__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      <p class="done__title">{{ doneMessage }}</p>
      <p class="done__hint">
        {{ mode === "subscribe" ? "以后有新内容会发邮件通知你，随时可以退订。" : "如果想再次订阅，随时回来就好。" }}
      </p>
      <button class="btn btn--outline" type="button" @click="reset">再操作一次</button>
    </div>

    <form v-else class="form" @submit.prevent="step === 'email' ? requestCode() : confirm()">
      <div class="field">
        <label class="field__label" for="sub-email">邮箱地址</label>
        <div class="field__row">
          <input
            id="sub-email"
            v-model.trim="email"
            class="input"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            :disabled="loading || step === 'code'"
          />
          <button v-if="step === 'email'" class="btn" type="submit" :disabled="!canSubmitEmail">
            {{ loading ? "发送中" : cooldown > 0 ? `${cooldown}s 后可重试` : "发送验证码" }}
          </button>
        </div>
      </div>

      <div v-if="step === 'code'" class="field">
        <label class="field__label" for="sub-code">
          验证码<span class="field__note">已发送至 {{ email }}</span>
        </label>
        <div class="otp" :class="{ 'is-disabled': loading }" @click="focusOtp">
          <input
            id="sub-code"
            ref="otpRef"
            class="otp__input"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="6"
            :value="code"
            :disabled="loading"
            @input="onCodeInput"
            @focus="otpFocused = true"
            @blur="otpFocused = false"
          />
          <span
            v-for="i in cells"
            :key="i"
            class="otp__cell"
            :class="{
              'is-filled': code.length > i,
              'is-active': otpFocused && code.length === i,
            }"
          >
            {{ code[i] ?? "" }}
          </span>
        </div>
        <button class="btn btn--block" type="submit" :disabled="!canSubmitCode">
          {{ loading ? "确认中" : mode === "subscribe" ? "确认订阅" : "确认退订" }}
        </button>
      </div>

      <p v-if="error" class="msg msg--error">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4.5M12 16h.01" />
        </svg>
        {{ error }}
      </p>
      <p v-else-if="step === 'code'" class="msg">
        验证码 5 分钟内有效；没收到就翻一下垃圾邮件。
      </p>
    </form>

    <footer class="panel__foot">
      <span>{{ mode === "subscribe" ? "不会用于任何其他用途" : "退订后名单立即移除" }}</span>
      <button class="link" type="button" @click="switchMode">
        {{ mode === "subscribe" ? "我想退订" : "回到订阅" }}
      </button>
    </footer>
  </section>
</template>

<style scoped>
/* 中性色令牌：亮色 / 暗色各一套，其余样式只引用变量 */
.panel {
  --ui-bg: #ffffff;
  --ui-fg: #0a0a0a;
  --ui-muted: #737373;
  --ui-subtle: #fafafa;
  --ui-border: #e5e5e5;
  --ui-input: #e0e0e0;
  --ui-accent: #096dd9;
  --ui-accent-dark: #0757ac;
  --ui-ring: rgba(9, 109, 217, 0.18);
  --ui-danger: #dc2626;

  padding: 24px;
  border: 1px solid var(--ui-border);
  border-radius: 12px;
  background: var(--ui-bg);
  color: var(--ui-fg);
}

:global([data-theme="dark"]) .panel {
  --ui-bg: #141414;
  --ui-fg: #fafafa;
  --ui-muted: #a3a3a3;
  --ui-subtle: #1c1c1c;
  --ui-border: rgba(255, 255, 255, 0.12);
  --ui-input: rgba(255, 255, 255, 0.16);
  --ui-accent: #3b82f6;
  --ui-accent-dark: #2563eb;
  --ui-ring: rgba(59, 130, 246, 0.25);
  --ui-danger: #f87171;
}

/* 卡片头 */
.panel__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.panel__title {
  margin: 0 0 6px;
  padding: 0;
  border: none;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.panel__sub {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--ui-muted);
}

.panel__stat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  padding: 4px 10px;
  font-size: 12px;
  color: var(--ui-muted);
  border: 1px solid var(--ui-border);
  border-radius: 999px;
  white-space: nowrap;
}

.panel__stat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
}

/* 表单 */
.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field__label {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
}

.field__note {
  font-size: 12px;
  font-weight: 400;
  color: var(--ui-muted);
}

.field__row {
  display: flex;
  gap: 8px;
}

.input {
  flex: 1 1 auto;
  min-width: 0;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  font-family: inherit;
  color: var(--ui-fg);
  background: transparent;
  border: 1px solid var(--ui-input);
  border-radius: 6px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.input::placeholder {
  color: var(--ui-muted);
}

.input:focus {
  border-color: var(--ui-accent);
  box-shadow: 0 0 0 3px var(--ui-ring);
}

.input:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* 验证码 6 格 */
.otp {
  position: relative;
  display: flex;
  gap: 6px;
}

.otp.is-disabled {
  opacity: 0.55;
}

.otp__input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  opacity: 0;
  cursor: text;
}

.otp__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 46px;
  font-size: 18px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  border: 1px solid var(--ui-input);
  border-radius: 6px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.otp__cell.is-active {
  border-color: var(--ui-accent);
  box-shadow: 0 0 0 3px var(--ui-ring);
}

.otp__cell.is-filled {
  border-color: var(--ui-fg);
}

/* 按钮 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  color: #fff;
  background: var(--ui-accent);
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, opacity 0.15s, border-color 0.15s;
}

.btn:hover:not(:disabled) {
  background: var(--ui-accent-dark);
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.btn--block {
  width: 100%;
}

.btn--outline {
  color: var(--ui-fg);
  background: transparent;
  border-color: var(--ui-border);
}

.btn--outline:hover:not(:disabled) {
  background: var(--ui-subtle);
}

.link {
  padding: 0;
  font-size: 13px;
  font-family: inherit;
  color: var(--ui-muted);
  background: none;
  border: none;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.link:hover {
  color: var(--ui-fg);
}

/* 提示 */
.msg {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 13px;
  color: var(--ui-muted);
}

.msg--error {
  color: var(--ui-danger);
}

.msg svg {
  width: 15px;
  height: 15px;
  flex: none;
}

/* 完成态 */
.done {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 0 2px;
}

.done__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
  border-radius: 50%;
  color: #16a34a;
  background: rgba(34, 197, 94, 0.12);
}

.done__icon svg {
  width: 18px;
  height: 18px;
}

.done__title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.done__hint {
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--ui-muted);
}

/* 卡片脚 */
.panel__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  font-size: 12px;
  color: var(--ui-muted);
  border-top: 1px solid var(--ui-border);
}

@media (max-width: 560px) {
  .panel {
    padding: 18px;
  }

  .field__row {
    flex-direction: column;
  }

  .otp__cell {
    width: 100%;
    height: 44px;
  }
}
</style>
