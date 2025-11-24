<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

interface Slide {
  id: number;
  image: string;
  title: string;
  price: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/hero.jpg",
    title: "Gold Big Hoops",
    price: "$ 68.00",
  },
  {
    id: 2,
    image: "/images/1.jpg",
    title: "Lira Earrings",
    price: "$ 20.00",
  },
  {
    id: 3,
    image: "/images/2.jpg",
    title: "Ollie Earrings",
    price: "$ 32.00",
  },
];

const current = ref(0);
let intervalId: number | undefined;

const nextSlide = () => {
  current.value = (current.value + 1) % slides.length;
};

const goTo = (index: number) => {
  current.value = index;
};

onMounted(() => {
  intervalId = window.setInterval(nextSlide, 4000);
});

onBeforeUnmount(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="hero">
    <div class="hero__slider">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="hero__slide"
        :class="{ active: index === current }"
      >
        <img :src="slide.image" class="hero__image" />

        <div class="hero__content">
          <h1>{{ slide.title }}</h1>
          <p>{{ slide.price }}</p>
          <button class="hero__btn">Смотреть</button>
        </div>
      </div>
    </div>

    <div class="hero__dots">
      <span
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="dot"
        :class="{ active: index === current }"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.hero {
  width: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #F4F4F4;
}

.hero__slider {
  position: relative;
  height: 440px;
}

.hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.hero__slide.active {
  opacity: 1;
}

.hero__image {
  width: 100%;
  height: 440px;
  object-fit: cover;
}

.hero__content {
  position: absolute;
  top: 32%;
  left: 56px;
  color: white;
}

.hero__content h1 {
  font-size: 36px;
  margin-bottom: 8px;
}

.hero__content p {
  font-size: 22px;
  margin-bottom: 16px;
}

.hero__btn {
  background: transparent;
  border: 1px solid white;
  padding: 12px 32px;
  border-radius: 999px;
  color: white;
  cursor: pointer;
}

.hero__dots {
  position: absolute;
  bottom: 20px;
  left: 40px;
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff55;
  cursor: pointer;
  transition: background 0.3s;
}

.dot.active {
  background: #ffffff;
}

@media (max-width: 768px) {
  .hero__slider {
    height: 360px; 
  }

  .hero__image {
    height: 360px;
  }

  .hero__content {
    top: auto;
    bottom: 60px;
    left: 24px;
  }

  .hero__content h1 {
    font-size: 24px;
  }

  .hero__content p {
    font-size: 16px;
  }
}

</style>
