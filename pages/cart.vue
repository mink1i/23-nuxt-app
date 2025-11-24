<script setup lang="ts">
import { ref, computed, reactive } from "vue"
import type { CartItem } from "~/stores/cart"
import { useCartStore } from "~/stores/cart"
import { useOrderStore } from "~/stores/order"
import { useRouter } from "vue-router"
import { useNotifyStore } from "~/stores/notify"

const cart = useCartStore()
const orderStore = useOrderStore()
const notify = useNotifyStore()
const router = useRouter()

// данные формы оформления заказа 
interface CheckoutForm {
  email: string
  password: string
  address: string
  name: string
  phone: string
}

const form = reactive<CheckoutForm>({
  email: "",
  password: "",
  address: "",
  name: "",
  phone: ""
})


const fieldLabels: Record<keyof CheckoutForm, string> = {
  email: "Email",
  password: "Пароль",
  address: "Адрес доставки",
  name: "Имя",
  phone: "Телефон"
}

//FORMAT PRICE
const formatItemPrice = (item: CartItem) => {
  const base = item.discount
    ? Math.round(item.price - (item.price * item.discount) / 100)
    : item.price

  return `$ ${base.toFixed(2)}`
}

const formatTotal = computed(() => `$ ${cart.totalPrice.toFixed(2)}`)

const loading = ref(false)

// проверка формы 
function validateForm(): boolean {
  const missing: string[] = []

  ;(Object.keys(form) as (keyof CheckoutForm)[]).forEach((key) => {
    if (!form[key].trim()) {
      missing.push(fieldLabels[key])
    }
  })

  if (missing.length) {
    notify.push(
      "error",
      `Заполните обязательные поля: ${missing.join(", ")}`
    )
    return false
  }

  return true
}

async function pay() {
  if (!cart.items.length) {
    notify.push("error", "В корзине нет товаров")
    return
  }

  // если есть пустые поля — не даём оформить заказ
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    // имитация задержки
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // сохраняем заказ
    orderStore.setOrder({
      items: cart.items.map((i) => ({
        id: i.id,
        name: i.name,
        qty: i.qty,
        // итоговая цена по товару с учётом скидки
        price: i.discount
          ? Math.round(i.price - (i.price * i.discount) / 100)
          : i.price
      })),
      total: cart.totalPrice,
      date: new Date().toLocaleDateString("ru-RU"),
      customer: {
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        phone: form.phone.trim()
      }
    })

    cart.clear()

    // очистим форму после успешной оплаты
    form.email = ""
    form.password = ""
    form.address = ""
    form.name = ""
    form.phone = ""

    router.push("/order/success")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="cart-page">
    <h1 class="cart-title">Корзина</h1>

    <div class="cart-layout">
      <!-- LEFT -->
      <div class="cart-items">
        <div v-if="cart.items.length === 0" class="cart-empty">
          Ваша корзина пуста
        </div>

        <div
          v-for="item in cart.items"
          :key="item.id"
          class="cart-item"
        >
          <div class="cart-item__left">
            <div class="cart-item__image">
              <img :src="item.image" alt="" />
            </div>

            <div class="cart-item__info">
              <div class="cart-item__name">{{ item.name }}</div>
              <div class="cart-item__price">
                {{ formatItemPrice(item) }}
              </div>
            </div>
          </div>

          <div class="cart-item__right">
            <div class="qty-control">
              <button type="button" @click="cart.decQty(item.id)">−</button>
              <span>{{ item.qty }}</span>
              <button type="button" @click="cart.incQty(item.id)">+</button>
            </div>

            <button
              type="button"
              class="cart-item__remove"
              @click="cart.removeItem(item.id)"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="cart-sidebar">
        <!-- форма только для ввода данных, submit ловим и на Enter -->
        <form class="cart-form" @submit.prevent="pay">
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Пароль"
          />
          <input
            v-model="form.address"
            type="text"
            placeholder="Адрес доставки"
          />
          <input
            v-model="form.name"
            type="text"
            placeholder="Имя"
          />
          <input
            v-model="form.phone"
            type="text"
            placeholder="Телефон"
          />
        </form>

        <div class="cart-summary">
          <div class="cart-summary__header">Итог</div>

          <div class="cart-summary__row">
            <span>Стоимость</span>
            <span>{{ formatTotal }}</span>
          </div>
        </div>

        <button
          type="button"
          class="cart-pay-btn"
          :disabled="loading"
          @click="pay"
        >
          <span v-if="loading" class="loader" />
          <span v-else>Оплатить</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  max-width: 1248px;
  margin: 40px auto;
  padding: 0 16px;
}

.cart-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 40px;
}

/* Лейаут */
.cart-layout {
  display: grid;
  grid-template-columns: 2fr 1.1fr;
  gap: 60px;
}

/* ЛЕВАЯ ЧАСТЬ */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cart-empty {
  padding: 40px;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 12px;
  color: #999;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.cart-item__left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.cart-item__image {
  width: 96px;
  height: 96px;
  border-radius: 10px;
  overflow: hidden;
}

.cart-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item__name {
  font-size: 16px;
  margin-bottom: 6px;
}

.cart-item__price {
  font-size: 14px;
  color: #555;
}

.cart-item__right {
  display: flex;
  align-items: center;
  gap: 18px;
}

.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.qty-control button {
  width: 28px;
  height: 32px;
  border: none;
  background: #f7f7f7;
  cursor: pointer;
}

.qty-control span {
  padding: 0 12px;
  font-size: 14px;
}

.cart-item__remove {
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}

/* ПРАВАЯ ЧАСТЬ */
.cart-sidebar {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.cart-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-form input {
  border: none;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 4px;
  font-size: 14px;
}

.cart-summary {
  border-radius: 8px;
  background: #f7f7f7;
  padding: 16px 18px;
}

.cart-summary__header {
  font-weight: 500;
  margin-bottom: 8px;
}

.cart-summary__row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.cart-pay-btn {
  width: 100%;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  background: var(--color-black);
  color: #fff;
  cursor: pointer;
  font-size: 15px;
}

/* MOBILE */
@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .cart-title {
    text-align: left;
  }
}

.cart-pay-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
