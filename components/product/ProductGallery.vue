<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  images: string[]
  selected: string
}>()

const emit = defineEmits<{
  "update:selected": [value: string]
}>()

// индекс текущего изображения
const currentIndex = computed(() => {
  if (!props.images.length) return 0
  const idx = props.images.indexOf(props.selected)
  return idx === -1 ? 0 : idx
})

// само текущее изображение
const currentImage = computed(() => {
  if (!props.images.length) return props.selected
  return props.images[currentIndex.value]
})

function select(image: string) {
  emit("update:selected", image)
}

// листаем вперёд
function showNext() {
  if (!props.images.length) return
  const next = (currentIndex.value + 1) % props.images.length
  emit("update:selected", props.images[next])
}

// листаем назад
function showPrev() {
  if (!props.images.length) return
  const prev =
    (currentIndex.value - 1 + props.images.length) % props.images.length
  emit("update:selected", props.images[prev])
}
</script>

<template>
  <div class="gallery">
    <div v-if="images.length" class="gallery-thumbs">
      <button
        v-for="(img, idx) in images"
        :key="idx"
        type="button"
        class="thumb"
        :class="{ 'thumb--active': idx === currentIndex }"
        @click="select(img)"
      >
        <img :src="img" alt="" />
      </button>
    </div>

    <!-- большое фото + стрелки + точки -->
    <div class="gallery-main">
      <button
        v-if="images.length > 1"
        type="button"
        class="gallery-arrow gallery-arrow--left"
        aria-label="Предыдущее фото"
        @click="showPrev"
      >
        ‹
      </button>

      <div class="gallery-main-image">
        <img :src="currentImage || images[0]" alt="" />
      </div>

      <button
        v-if="images.length > 1"
        type="button"
        class="gallery-arrow gallery-arrow--right"
        aria-label="Следующее фото"
        @click="showNext"
      >
        ›
      </button>

      <div v-if="images.length > 1" class="gallery-dots">
        <button
          v-for="(img, idx) in images"
          :key="'dot-' + idx"
          type="button"
          class="dot"
          :class="{ 'dot--active': idx === currentIndex }"
          @click="select(img)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 18px;
}

/* миниатюры */
.gallery-thumbs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.thumb {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid transparent;
  padding: 0;
  background: none;
  cursor: pointer;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.thumb--active {
  border-color: #c9a36b;
}

/* большое изображение */
.gallery-main {
  position: relative;
  width: 100%;
}

.gallery-main-image {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.gallery-main-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

/* стрелки */
.gallery-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.9);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
}

.gallery-arrow--left {
  left: 12px;
}

.gallery-arrow--right {
  right: 12px;
}

/* точки прогресса, как в мобильном макете */
.gallery-dots {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}

.dot--active {
  width: 14px;
  background: #ffffff;
}

/* MOBILE */
@media (max-width: 768px) {
  .gallery {
    grid-template-columns: 1fr;
  }

  .gallery-thumbs {
    flex-direction: row;
    justify-content: center;
  }

  .thumb {
    width: 70px;
    height: 70px;
  }

  .gallery-arrow {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }
}
</style>
