<script setup lang="ts">
import { useCartStore } from "~/stores/cart"
import { useFavoritesStore } from "~/stores/favorites.store"
import { useNotifyStore } from "~/stores/notify"
import type { CartItem } from "~/stores/cart"

const cart = useCartStore()
const favorites = useFavoritesStore()
const notify = useNotifyStore()

const props = defineProps<{
  product: {
    id: number
    name: string
    price: number
    discount?: number
    image: string
  }
}>()

const isHover = ref(false)

const finalPrice = computed(() => {
  const p = props.product
  return p.discount
    ? Math.round(p.price - p.price * (p.discount / 100))
    : p.price
})

// избранное
const isFavorite = computed(() => favorites.isFavorite(props.product.id))

function toggleFavorite() {
  const was = isFavorite.value
  const p = props.product

  favorites.toggle({
    id: p.id,
    name: p.name,
    price: p.price,
    discount: p.discount,
    image: p.image
  })

  notify.push(was ? "error" : "info", was ? "Удалено из избранного" : "Добавлено в избранное")
}

// корзина
function addToCart() {
  const p = props.product

  const item: CartItem = {
    id: p.id,
    name: p.name,
    price: p.price,
    discount: p.discount,
    image: p.image,
    qty: 1
  }

  cart.addItem(item)
  notify.push("success", "Товар добавлен в корзину")
}
</script>

<template>
  <NuxtLink
    :to="`/catalog/${product.id}`"
    class="p-card"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="p-card__image-wrapper">
      <img :src="product.image" alt="" class="p-card__image" />

      <div v-if="product.discount" class="p-card__discount">
        -{{ product.discount }}%
      </div>

      <!-- ACTION BUTTONS -->
      <div class="p-card__actions">
        <button class="action-btn" @click.stop.prevent="addToCart">
          <Icon name="ph:shopping-cart" />
        </button>

        <button class="action-btn" @click.stop>
          <Icon name="ph:eye" />
        </button>

        <button
          class="action-btn action-btn--fav"
          @click.stop.prevent="toggleFavorite"
        >
          <Icon :name="isFavorite ? 'ph:heart-fill' : 'ph:heart'" />
        </button>
      </div>
    </div>

    <div class="p-card__name">{{ product.name }}</div>

    <div class="p-card__price">
      <span v-if="product.discount" class="p-card__oldprice">
        ${{ product.price }}
      </span>

      <span>${{ finalPrice }}</span>
    </div>
  </NuxtLink>
</template>


<style scoped>
.p-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.p-card__image-wrapper {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.p-card__image {
  width: 100%;
  display: block;
}

.p-card__image-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0);
  transition: background 0.35s ease;
  z-index: 1;
}

.p-card:hover .p-card__image-wrapper::after {
  background: rgba(255, 255, 255, 0.45);
}

.p-card__discount {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--color-accent);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 3;
}

.p-card__actions {
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -42%);
  display: flex;
  gap: 16px;
  opacity: 0;
  transition: all 0.35s ease;
  pointer-events: none;
}

.p-card:hover .p-card__actions {
  opacity: 1;
  transform: translate(-50%, -50%);
  pointer-events: auto;
}

.action-btn {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  transform: translateY(6px);
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: auto;
}

.p-card:hover .action-btn {
  opacity: 1;
  transform: translateY(0);
}

.action-btn :deep(svg) {
  width: 20px;
  height: 20px;
}

.p-card__name {
  font-size: 18px;
  color: var(--color-black);
}

.p-card__price {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-black);
}

.p-card__oldprice {
  color: #999;
  text-decoration: line-through;
  margin-right: 6px;
}

.action-btn--fav :deep(svg) {
  transition: transform 0.2s ease;
}

.action-btn--fav:hover :deep(svg) {
  transform: scale(1.05);
}
</style>
