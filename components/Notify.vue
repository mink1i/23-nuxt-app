<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="notify">
    <div
      v-for="n in notifications.list"
      :key="n.id"
      class="notify__item"
      :class="`notify__${n.type}`"
    >
      <span class="notify__dot" />
      <span class="notify__text">{{ n.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotifyStore } from "~/stores/notify"
const notifications = useNotifyStore()
</script>

<style scoped>
.notify {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* сама карточка */
.notify__item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  max-width: 360px;
  padding: 12px 16px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e5e5e5;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  font-size: 14px;
  color: #222;
  animation: slide 0.25s ease-out;
}

.notify__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}


.notify__success .notify__dot {
  background: #57b26a;
}

.notify__error .notify__dot {
  background: #d9534f;
}

.notify__info .notify__dot {
  background: #c9a36b;
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* адаптив */
@media (max-width: 768px) {
  .notify {
    right: 16px;
    left: 16px;
    bottom: 16px;
    align-items: stretch;
  }

  .notify__item {
    max-width: none;
  }
}
</style>
