<script setup lang="ts">
import { computed } from "vue"
import { clearError } from "#app"

const props = defineProps<{
  error: { statusCode?: number; statusMessage?: string }
}>()

const is404 = computed(() => props.error?.statusCode === 404)

const title = computed(() =>
  is404.value ? "404 ошибка" : "Что‑то пошло не так"
)

const description = computed(() =>
  is404.value
    ? "Страница не найдена, попробуйте перейти на главную страницу."
    : "На сервере произошла ошибка. Попробуйте обновить страницу или вернуться на главную."
)

function goHome() {
  clearError({ redirect: "/" })
}
</script>

<template>
  <!-- Оборачиваем в NuxtLayout, чтобы был тот же header + footer -->
  <NuxtLayout>
    <div class="error-page">
      <h1 class="error-title">{{ title }}</h1>
      <p class="error-text">
        {{ description }}
      </p>

      <button
        type="button"
        class="error-btn"
        @click="goHome"
      >
        Главная страница
      </button>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  max-width: 1248px;
  margin: 80px auto 120px;
  padding: 0 16px;
  text-align: center;
}

.error-title {
  font-size: 28px;
  margin-bottom: 16px;
}

.error-text {
  color: #777;
  font-size: 15px;
  max-width: 360px;
  margin: 0 auto 24px;
  line-height: 1.6;
}

.error-btn {
  display: inline-block;
  padding: 12px 28px;
  border-radius: 4px;
  border: 1px solid #000;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
}

.error-btn:hover {
  background: #000;
  color: #fff;
}

/* Мобилка */
@media (max-width: 768px) {
  .error-page {
    margin-top: 48px;
    margin-bottom: 80px;
  }

  .error-title {
    font-size: 22px;
  }
}
</style>
