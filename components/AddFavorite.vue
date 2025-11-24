<script setup lang="ts">
import type { Product } from "~/interfaces/product.interface"
import { useFavoritesStore } from "~/stores/favorites.store"

const props = defineProps<{
  product: Product
  isShown: boolean
}>()

const favorites = useFavoritesStore()

const isFavorite = computed(() => favorites.isFavorite(props.product.id))

function toggleFavorite() {
  const p = props.product

  favorites.toggle({
    id: p.id,
    name: p.name,
    price: p.price,
    discount: p.discount,
    image: p.images[0]
  })
}
</script>

<template>
  <button
    v-show="isShown || isFavorite"
    class="fav-button"
    type="button"
    @click.stop.prevent="toggleFavorite"
  >
    <Icon
      :name="isFavorite ? 'ph:heart-fill' : 'ph:heart'"
      size="18"
    />
  </button>
</template>

<style scoped>
.fav-button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
