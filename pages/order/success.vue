<script setup lang="ts">
import { computed } from "vue"
import { useOrderStore } from "~/stores/order"

useSeoMeta({
  title: "Итог оплаты | Shoppe"
})

const orderStore = useOrderStore()

const order = computed(() => orderStore.lastOrder)
const customer = computed(() => order.value?.customer || null)

const rows = computed(() => {
  if (!order.value) return []
  return order.value.items.map((item) => ({
    ...item,
    total: item.price * item.qty
  }))
})

const total = computed(() => order.value?.total ?? 0)
</script>

<template>
  <div v-if="order" class="order-success">
    <!-- баннер -->
    <div class="order-success__banner">
      <span class="order-success__icon" />
      <span>Мы получили ваш заказ</span>
    </div>

    <div class="order-success__grid">
      <!-- левая колонка -->
      <section class="order-success__details">
        <h1 class="order-success__title">Детали заказа</h1>

        <div class="order-success__rows">
          <div class="row">
            <span class="label">Номер</span>
            <span class="value">1</span>
          </div>
          <div class="row">
            <span class="label">Дата заказа</span>
            <span class="value">{{ order.date }}</span>
          </div>
          <div class="row">
            <span class="label">Имя</span>
            <span class="value">{{ customer?.name }}</span>
          </div>
          <div class="row">
            <span class="label">EMAIL</span>
            <span class="value">{{ customer?.email }}</span>
          </div>
          <div class="row">
            <span class="label">Адрес доставки</span>
            <span class="value">{{ customer?.address }}</span>
          </div>
          <div class="row">
            <span class="label">Телефон</span>
            <span class="value">{{ customer?.phone }}</span>
          </div>
        </div>
      </section>

      <!-- правая колонка -->
      <section class="order-success__summary">
        <h2 class="order-success__subtitle">Данные заказа</h2>

        <div class="summary-card">
          <div class="summary-card__header">
            <span>Продукты</span>
            <span>Количество</span>
            <span class="right">Итог</span>
          </div>

          <div class="summary-card__body">
            <div
              v-for="item in rows"
              :key="item.id"
              class="summary-card__row"
            >
              <span>{{ item.name }}</span>
              <span>{{ item.qty }}</span>
              <span class="right">$ {{ item.total }}</span>
            </div>
          </div>

          <div class="summary-card__footer">
            <span>Итог</span>
            <span class="right">$ {{ total }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- если пользователь попал сюда без оформленного заказа -->
  <div v-else class="order-success-empty">
    <h1>Заказ не найден</h1>
    <p>Оформите заказ в каталоге, чтобы увидеть детали.</p>
    <NuxtLink to="/catalog" class="order-success-empty__link">
      Перейти в каталог
    </NuxtLink>
  </div>
</template>

<style scoped>
.order-success {
  max-width: 1248px;
  margin: 40px auto 80px;
  padding: 0 16px;
}

/* баннер */
.order-success__banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  background: #f4f0ea;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 32px;
}

.order-success__icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #c9a36b;
}

/* сетка */
.order-success__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 80px;
}

.order-success__title {
  font-size: 22px;
  margin-bottom: 24px;
}

.order-success__subtitle {
  font-size: 18px;
  margin-bottom: 18px;
}

/* строки слева */
.order-success__rows {
  display: grid;
  gap: 8px;
}

.row {
  display: grid;
  grid-template-columns: 130px 1fr;
  font-size: 14px;
}

.row .label {
  color: #777;
}

.row .value {
  color: #222;
}

/* карточка справа */
.summary-card {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 18px 20px;
  font-size: 14px;
}

.summary-card__header,
.summary-card__row,
.summary-card__footer {
  display: grid;
  grid-template-columns: 2.2fr 0.9fr 1fr;
  column-gap: 12px;
  align-items: center;
}

.summary-card__header {
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.summary-card__row {
  padding: 6px 0;
}

.summary-card__footer {
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
  margin-top: 8px;
  font-weight: 600;
}

.right {
  text-align: right;
}

/* пустое состояние */
.order-success-empty {
  max-width: 600px;
  margin: 60px auto;
  padding: 0 16px;
  text-align: center;
}

.order-success-empty__link {
  margin-top: 16px;
  display: inline-block;
  border: 1px solid #000;
  padding: 10px 22px;
  border-radius: 4px;
  text-decoration: none;
  color: #000;
}

/* адаптив */
@media (max-width: 900px) {
  .order-success__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .row {
    grid-template-columns: 1fr;
    row-gap: 2px;
  }
}
</style>
