<script setup lang="ts">
import StarRating from "~/components/StarRating.vue"

const {
  name,
  price,
  finalPrice,
  discount = 0,
  description,
  averageRating,
  ratingCount
} = defineProps<{
  name: string
  price: number
  finalPrice: number
  discount?: number
  description: string
  averageRating: number
  ratingCount: number
}>()

</script>

<template>
  <div class="product-header">
    <h1 class="product-title">
      {{ name }}
    </h1>

    <!-- Цена -->
    <div class="price-block">
      <span class="price-final">$ {{ finalPrice }}</span>

      <span v-if="discount" class="price-old">
        $ {{ price }}
      </span>

      <span v-if="discount" class="price-discount">
        -{{ discount }}%
      </span>
    </div>

    <!-- рейтинг + кол-во отзывов -->
    <div class="rating-row">
      <StarRating :rating="averageRating" :size="16" />

      <span v-if="ratingCount" class="rating-text">
        {{ averageRating.toFixed(1) }} · {{ ratingCount }} отзыв(ов)
      </span>
      <span v-else class="rating-text rating-text--empty">
        Пока нет отзывов
      </span>
    </div>

    <p class="product-short">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>
.product-header {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.product-title {
  font-size: 22px;
  font-weight: 500;
}

/* Цена */
.price-block {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.price-final {
  font-size: 22px;
  font-weight: 600;
  color: #2d2d2d;
}

.price-old {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
}

.price-discount {
  background: #efe1d2;
  color: #7e5a33;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
}

/* Рейтинг */
.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-text {
  font-size: 13px;
  color: #555;
}

.rating-text--empty {
  color: #999;
}

/* Короткое описание */
.product-short {
  color: #555;
  line-height: 1.6;
  font-size: 14px;
}
</style>
