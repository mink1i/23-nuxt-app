<script setup lang="ts">
import { useFavoritesStore } from "~/stores/favorites.store";
import ProductCard from "~/components/home/ProductCard.vue";

const fav = useFavoritesStore();
</script>

<template>
  <div class="favorites-page">
    <h1>Избранное</h1>

    <div v-if="fav.items.length === 0" class="empty">
      В избранном пока пусто
    </div>

    <div class="favorites-grid" v-else>
      <ProductCard
        v-for="item in fav.items"
        :key="item.id"
        :product="item"
      />
    </div>
  </div>
</template>

<style scoped>

.favorites-page {
  max-width: 1248px;
  margin: 40px auto;
  padding: 0 16px;
}

.favorites-page h1 {
  font-size: 28px;
  margin-bottom: 32px;
}

.favorites-grid {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.empty {
  font-size: 18px;
  color: #777;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .favorites-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px; /* можно чуть меньше, чтобы не было тесно */
  }
}
</style>
