<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useAuthStore } from "~/stores/auth"
import { useOrderStore } from "~/stores/order"

const auth = useAuthStore()
const orderStore = useOrderStore()
const route = useRoute()

if (!auth.isAuth) {
  navigateTo("/auth")
}

// все заказы из истории
const orders = computed(() => orderStore.history ?? [])
const hasOrders = computed(() => orders.value.length > 0)

// активность вкладок
const isOrdersTabActive = computed(() => route.path === "/account/orders")
const isLogoutTabActive = computed(() => route.path === "/account/logout")

const formatMoney = (v: number) =>
  `$ ${v.toFixed(2)}`
</script>

<template>
  <div class="orders-page">
    <h1 class="page-title">Мой аккаунт</h1>

    <!-- вкладки -->
    <div class="account-tabs">
      <NuxtLink
        to="/account/orders"
        class="account-tab"
        :class="{ 'account-tab--active': isOrdersTabActive }"
      >
        Заказы
      </NuxtLink>

      <NuxtLink
        to="/account/logout"
        class="account-tab"
        :class="{ 'account-tab--active': isLogoutTabActive }"
      >
        Выход
      </NuxtLink>
    </div>

    <!-- если заказов нет -->
    <div
      v-if="!hasOrders"
      class="orders-empty"
    >
      У вас пока нет заказов.
    </div>

    <!-- если заказы есть -->
    <table
      v-else
      class="orders-table"
    >
      <thead>
        <tr>
          <th>Номер заказа</th>
          <th>Дата</th>
          <th>Статус</th>
          <th>Итог</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in orders"
          :key="order.id ?? index"
        >
          <td class="thin">#{{ order.id ?? index + 1 }}</td>
          <td class="thin">{{ order.date }}</td>
          <td class="thin">Оформлен</td>
          <td class="bold">
           {{ formatMoney(order.total) }}
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.orders-page {
  max-width: 1248px;
  margin: 40px auto 80px;
  padding: 0 16px;
}

.page-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 40px;
}

/* вкладки */
.account-tabs {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 32px;
}

.account-tab {
  padding-bottom: 10px;
  font-size: 14px;
  text-decoration: none;
  color: #777;
}

.account-tab--active {
  color: #000;
  border-bottom: 1px solid #000;
}

/* таблица */
/* таблица */
.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th {
  text-align: left;
  font-weight: 500;
  padding: 14px 20px 14px 0;
  border-bottom: 1px solid #e5e5e5;
  font-size: 13px;
}

.orders-table td {
  padding: 14px 20px 14px 0;
  font-size: 14px;
  border-bottom: 1px solid #f3f3f3;
}

/* последний столбец — "Итог" — всегда по правому краю */
.orders-table th:last-child,
.orders-table td:last-child {
  text-align: right;
  padding-right: 0;
}

.thin {
  font-weight: 400;
}

.bold {
  font-weight: 600;
}

.orders-empty {
  font-size: 15px;
  color: #777;
}
</style>

