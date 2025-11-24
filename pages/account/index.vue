<script setup lang="ts">
import { useAuthStore } from "~/stores/auth"

const auth = useAuthStore()

// если не авторизован → на страницу входа/регистрации
if (!auth.isAuth) {
  navigateTo("/auth")
} else {
  // перенаправляем на основную вкладку — "Заказы"
  navigateTo("/account/orders")
}
</script>

<template>
  <div />
</template>

