<script setup lang="ts">
const props = defineProps<{
  rating: number   
  size?: number    
}>()


const starSize = computed(() => `${props.size ?? 18}px`)

// заполненность звезды
function fillForStar(i: number) {
  const value = props.rating - (i - 1)
  if (value >= 1) return 1
  if (value <= 0) return 0
  return value
}
</script>

<template>
  <div class="star-rating">
    <span
      v-for="i in 5"
      :key="i"
      class="star"
      :style="{ '--fill': String(fillForStar(i)) }"
    >
      ★
    </span>
  </div>
</template>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

/* Пустая звезда */
.star {
  font-family: "Arial", sans-serif;
  font-weight: 900;
  line-height: 1;
  position: relative;
  display: inline-block;

  color: #ddd; /* цвет незаполнённой звезды */

  font-size: v-bind(starSize);
  width: v-bind(starSize);
  height: v-bind(starSize);
  overflow: hidden;
}

/* Заполненная часть */
.star::before {
  content: "★";
  color: #c9a36b; 
  position: absolute;
  inset: 0;
  width: calc(var(--fill) * 100%);
  overflow: hidden;
  white-space: nowrap;
}
</style>
