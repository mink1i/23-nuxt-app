<script setup lang="ts">
import HeroSlider from "~/components/home/HeroSlider.vue";
import ProductCard from "~/components/home/ProductCard.vue";

useSeoMeta({
  title: "Главная | Shoppe",
});

// временные данные 
const lastProducts = [
  {
    id: 1,
    name: "Lira Earrings",
    price: 2000,
    discount: 0,
    image: "/images/1.jpg",
  },
  {
    id: 2,
    name: "Ollie Earrings",
    price: 3200,
    discount: 0,
    image: "/images/2.jpg",
  },
  {
    id: 3,
    name: "Kaede Hair Pin Set Of 3",
    price: 3000,
    discount: 20,
    image: "/images/3.jpg",
  },
  {
    id: 4,
    name: "Yuki Hair Pin Set Of 3",
    price: 2500,
    discount: 15,
    image: "/images/4.jpg",
  },
];
</script>

<template>
  <div class="home">

    <!-- HERO SLIDER -->
    <HeroSlider />

    <!-- LAST PRODUCTS -->
    <section class="home__section">
      <div class="home__section-header">
        <h2>Последние поступления</h2>
        <NuxtLink to="/catalog" class="home__see-all">Все</NuxtLink>
      </div>

      <div class="home__grid">
        <ProductCard
          v-for="product in lastProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

  </div>
</template>

<style scoped>
.home {
  max-width: 1248px;
  margin: 40px auto;
  padding: 0 16px;
}

.home__section {
  margin-top: 56px;
}

.home__section-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: center;
}

.home__section-header h2 {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-black);
}

.home__see-all {
  font-size: 16px;
  color: var(--color-dark-gray);
  text-decoration: none;
}

.home__see-all:hover {
  color: var(--color-black);
}

.home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 32px;
}

/* MOBILE */
@media (max-width: 768px) {
  .home__section-header h2 {
    font-size: 22px;
  }

  .home__grid {
    gap: 20px;
  }
}
</style>
