<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { createError } from "h3"

import ProductGallery from "~/components/product/ProductGallery.vue"
import ProductHeader from "~/components/product/ProductHeader.vue"
import ProductActions from "~/components/product/ProductActions.vue"
import ProductReviews from "~/components/product/ProductReviews.vue"
import ProductCard from "~/components/home/ProductCard.vue"

import { useCartStore } from "~/stores/cart"
import { useFavoritesStore } from "~/stores/favorites.store"
import { useNotifyStore } from "~/stores/notify"
import { useReviewsStore } from "~/stores/reviews"
import type { CartItem } from "~/stores/cart"

const cart = useCartStore()
const favorites = useFavoritesStore()
const notify = useNotifyStore()
const reviewsStore = useReviewsStore()

const route = useRoute()
const productId = Number(route.params.id)

//ТИП ТОВАРА
interface Product {
  id: number
  name: string
  price: number
  discount?: number
  image: string
  images: string[]
  description: string
  longDescription: string
}

// MOCK DATA
const allProducts: Product[] = [
  {
    id: 1,
    name: "Lira Earrings",
    price: 2000,
    discount: 0,
    image: "/images/1.jpg",
    images: ["/images/1.jpg", "/images/1.jpg", "/images/1.jpg"],
    description: "Элегантные серьги…",
    longDescription: "Эти серьги подчёркивают…"
  },
  {
    id: 2,
    name: "Ollie Earrings",
    price: 3200,
    discount: 0,
    image: "/images/2.jpg",
    images: ["/images/2.jpg", "/images/2.jpg", "/images/2.jpg"],
    description: "Современный дизайн…",
    longDescription: "Стильные серьги…"
  },
  {
    id: 3,
    name: "Kaede Hair Pin Set Of 3",
    price: 3000,
    discount: 20,
    image: "/images/3.jpg",
    images: ["/images/3.jpg", "/images/3.jpg", "/images/3.jpg"],
    description: "Набор из трёх заколок…",
    longDescription: "Этот набор отлично…"
  },
  {
    id: 4,
    name: "Yuki Hair Pin",
    price: 2500,
    discount: 15,
    image: "/images/4.jpg",
    images: ["/images/4.jpg", "/images/4.jpg", "/images/4.jpg"],
    description: "Изящная заколка…",
    longDescription: "Заколка создаёт…"
  }
]

// ТЕКУЩИЙ ТОВАР
const product = computed<Product | null>(() =>
  allProducts.find((p) => p.id === productId) ?? null
)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: "Product not found" })
}

// ГАЛЕРЕЯ
const galleryImages = computed(() => product.value!.images)
const selectedImage = ref(galleryImages.value[0])

watch(
  galleryImages,
  (imgs) => {
    if (imgs?.length) selectedImage.value = imgs[0]
  },
  { immediate: true }
)

// ЦЕНА 
const finalPrice = computed(() => {
  const p = product.value!
  return p.discount
    ? Math.round(p.price - (p.price * p.discount) / 100)
    : p.price
})

// КОЛ-ВО, КОРЗИНА
const quantity = ref(1)

function updateQuantity(value: number) {
  quantity.value = value < 1 ? 1 : value
}

function addToCart() {
  const p = product.value!

  const item: CartItem = {
    id: p.id,
    name: p.name,
    price: p.price,
    discount: p.discount,
    image: p.image,
    qty: quantity.value
  }

  cart.addItem(item)
  notify.push("success", "Товар добавлен в корзину")
}

// ИЗБРАННОЕ
const isFavorite = computed(() => favorites.isFavorite(product.value!.id))

function toggleFavorite() {
  const p = product.value!
  const was = isFavorite.value

  favorites.toggle({
    id: p.id,
    name: p.name,
    price: p.price,
    discount: p.discount,
    image: p.image
  })

  notify.push(was ? "error" : "info", was ? "Удалено из избранного" : "Добавлено в избранное")
}

//ОТЗЫВЫ
reviewsStore.seedProduct(productId)

const productReviews = computed(() => reviewsStore.byProduct(productId))
const ratingCount = computed(() => productReviews.value.length)

const averageRating = computed(() => {
  if (!ratingCount.value) return 0
  return (
    productReviews.value.reduce((s, r) => s + r.rating, 0) /
    ratingCount.value
  )
})

// РЕКОМЕНДАЦИИ
const recommended = computed(() =>
  allProducts.filter((p) => p.id !== productId)
)
</script>

<template>
  <div class="product-wrapper">
    <div class="product-page">
      <ProductGallery
        v-model:selected="selectedImage"
        :images="galleryImages"
      />

      <div class="product-page__info">
        <ProductHeader
          :name="product!.name"
          :price="product!.price"
          :final-price="finalPrice"
          :discount="product!.discount"
          :description="product!.description"
          :average-rating="averageRating"
          :rating-count="ratingCount"
        />

        <ProductActions
          :quantity="quantity"
          :is-favorite="isFavorite"
          @update:quantity="updateQuantity"
          @add-to-cart="addToCart"
          @toggle-favorite="toggleFavorite"
        />

        <div class="product-meta">
          <div><span class="meta-label">SKU:</span> 12</div>
          <div><span class="meta-label">Категория:</span> Серьги</div>
        </div>
      </div>
    </div>

    <ProductReviews
      :product-id="product!.id"
      :description="product!.longDescription"
    />

    <section class="recommended">
      <h2>You might also like</h2>

      <div class="recommended-grid">
        <ProductCard
          v-for="item in recommended"
          :key="item.id"
          :product="item"
        />
      </div>
    </section>
  </div>
</template>



<style scoped>
.product-wrapper {
  max-width: 1248px;
  margin: 40px auto 80px;
  padding: 0 16px;
}

/* Верхний блок: галерея + инфо */
.product-page {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
}

.product-page__info {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Мета-информация */
.product-meta {
  margin-top: 6px;
  font-size: 12px;
  color: #555;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  font-weight: 500;
}

/* Рекомендации */
.recommended {
  margin-top: 40px;
}

.recommended h2 {
  font-size: 20px;
  margin-bottom: 24px;
}

.recommended-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 32px;
}

/* MOBILE */
@media (max-width: 768px) {
  .product-page {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
