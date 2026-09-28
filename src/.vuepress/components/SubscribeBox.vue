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
        ? `订阅成功，现在共有 ${data?.subscribers ?? 0} 位读者。`
        : "已取消订阅，不会再收到更新邮件。";
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
  <div class="subscribe-card">
    <div class="subscribe-head">
      <span class="subscribe-icon">✉️</span>
      <div>
        <h3 class="subscribe-title">{{ mode === "subscribe" ? "订阅更新" : "取消订阅" }}</h3>
        <p class="subscribe-desc">
          {{
            mode === "subscribe"
              ? "留下邮箱，博客有新内容时我会发邮件通知你，不会用于其他用途。"
              : "输入邮箱收验证码，确认后即停止接收更新邮件。"
          }}
        </p>
      </div>
    </div>

    <div v-if="step === 'done'" class="subscribe-done">
      <p class="subscribe-ok">✅ {{ doneMessage }}</p>
      <button class="subscribe-btn ghost" type="button" @click="reset">再操作一次</button>
    </div>

    <form v-else class="subscribe-form" @submit.prevent="step === 'email' ? requestCode() : confirm()">
      <div class="subscribe-row">
        <input
          v-model.trim="email"
          class="subscribe-input"
          type="email"
          placeholder="your@email.com"
          :disabled="loading || step === 'code'"
          required
        />
        <button
          v-if="step === 'email'"
          class="subscribe-btn"
          type="submit"
          :disabled="loading || cooldown > 0"
        >
          {{ loading ? "发送中…" : cooldown > 0 ? `${cooldown}s 后可重试` : "发送验证码" }}
        </button>
      </div>

      <div v-if="step === 'code'" class="subscribe-row">
        <input
          v-model.trim="code"
          class="subscribe-input"
          inputmode="numeric"
          maxlength="6"
          placeholder="6 位验证码"
          :disabled="loading"
        />
        <button class="subscribe-btn" type="submit" :disabled="loading">
          {{ loading ? "提交中…" : "确认" }}
        </button>
      </div>

      <p v-if="error" class="subscribe-error">{{ error }}</p>
      <p v-else-if="step === 'code'" class="subscribe-hint">
        验证码已发送到 {{ email }}，5 分钟内有效（收不到就翻翻垃圾箱）。
      </p>

      <div class="subscribe-foot">
        <span v-if="count !== null">已有 {{ count }} 位读者订阅</span>
        <span v-else />
        <a class="subscribe-link" href="#" @click.prevent="switchMode">
          {{ mode === "subscribe" ? "我想退订" : "回到订阅" }}
        </a>
      </div>
    </form>
  </div>
</template>

<style scoped>
.subscribe-card {
  margin: 32px 0;
  padding: 22px 24px;
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 12px;
  background: var(--vp-c-bg-soft, #f8fafc);
  color: var(--vp-c-text-1, #1f2937);
}

.subscribe-head {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.subscribe-icon {
  font-size: 22px;
  line-height: 1.4;
}

.subscribe-title {
  margin: 0 0 6px;
  font-size: 17px;
  font-weight: 600;
  border: none;
  padding: 0;
}

.subscribe-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2, #4b5563);
}

.subscribe-form,
.subscribe-done {
  margin-top: 16px;
}

.subscribe-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.subscribe-input {
  flex: 1 1 220px;
  min-width: 0;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid var(--vp-c-divider, #d1d5db);
  border-radius: 8px;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-1, #111827);
  outline: none;
}

.subscribe-input:focus {
  border-color: #096dd9;
}

.subscribe-btn {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: #096dd9;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.subscribe-btn:hover {
  opacity: 0.9;
}

.subscribe-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.subscribe-btn.ghost {
  color: var(--vp-c-text-1, #1f2937);
  background: transparent;
  border: 1px solid var(--vp-c-divider, #d1d5db);
}

.subscribe-error {
  margin: 0 0 8px;
  font-size: 13px;
  color: #dc2626;
}

.subscribe-hint {
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--vp-c-text-2, #6b7280);
}

.subscribe-ok {
  margin: 0 0 14px;
  font-size: 15px;
  color: #059669;
}

.subscribe-foot {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-3, #9ca3af);
}

.subscribe-link {
  color: var(--vp-c-text-2, #6b7280);
  text-decoration: underline;
}
</style>
