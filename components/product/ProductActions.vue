<script setup lang="ts">
const props = defineProps<{
  quantity: number
  isFavorite: boolean
}>()

const emit = defineEmits<{
  "update:quantity": [value: number]
  "add-to-cart": []
  "toggle-favorite": []
}>()

function changeQty(delta: number) {
  const next = props.quantity + delta
  emit("update:quantity", next < 1 ? 1 : next)
}

function addToCart() {
  emit("add-to-cart")
}

function toggleFavorite() {
  emit("toggle-favorite")
}
</script>

<template>
  <div class="product-actions">
    <!-- Количество -->
    <div class="qty-control">
      <button class="qty-btn" type="button" @click="changeQty(-1)">-</button>
      <span class="qty-value">{{ quantity }}</span>
      <button class="qty-btn" type="button" @click="changeQty(1)">+</button>
    </div>

    <!-- Кнопка в корзину -->
    <button class="btn-buy" type="button" @click="addToCart">
      <Icon name="ph:shopping-cart" size="18" />
      <span>Добавить в корзину</span>
    </button>
  </div>

  <!-- Иконки -->
  <div class="product-icons-row">
    <button
      class="icon-btn icon-btn--fav"
      type="button"
      @click="toggleFavorite"
    >
      <Icon
        :name="isFavorite ? 'ph:heart-fill' : 'ph:heart'"
        size="16"
      />
    </button>

    <div class="product-icons-divider"></div>

    <button class="icon-btn" type="button">
      <Icon name="ph:share-network" size="16" />
    </button>
    <button class="icon-btn" type="button">
      <Icon name="ph:instagram-logo" size="16" />
    </button>
    <button class="icon-btn" type="button">
      <Icon name="ph:facebook-logo" size="16" />
    </button>
  </div>
</template>

<style scoped>
.product-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 4px;
}

/* Количество */
.qty-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 16px;
}

.qty-value {
  padding: 0 14px;
  font-size: 14px;
}

/* Кнопка */
.btn-buy {
  background: #222;
  color: white;
  border: none;
  padding: 11px 26px;
  border-radius: 4px;
  font-size: 14px;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
}

.btn-buy:hover {
  background: #000;
}

/* Иконки */
.product-icons-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.product-icons-divider {
  width: 1px;
  height: 20px;
  background: #e0e0e0;
}

.icon-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-btn--fav :deep(svg) {
  transition: transform 0.25s ease, color 0.25s ease;
}

.icon-btn--fav:hover :deep(svg) {
  transform: scale(1.15);
  color: var(--color-accent);
}
</style>
