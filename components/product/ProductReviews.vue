<script setup lang="ts">
import { reactive, ref, computed } from "vue"
import StarRating from "~/components/StarRating.vue"
import { useNotifyStore } from "~/stores/notify"
import { useReviewsStore } from "~/stores/reviews"

const { productId, description } = defineProps<{
  productId: number
  description: string
}>()

const notify = useNotifyStore()
const reviewsStore = useReviewsStore()

// начальные отзывы
reviewsStore.seedProduct(productId)

const productReviews = computed(() =>
  reviewsStore.byProduct(productId)
)

const ratingCount = computed(() => productReviews.value.length)

const activeTab = ref<"description" | "reviews">("description")

const newReview = reactive({
  name: "",
  email: "",
  text: "",
  rating: 0
})

function setRating(value: number) {
  newReview.rating = value
}

function submitReview() {
  if (!newReview.name || !newReview.text || !newReview.rating) {
    notify.push("error", "Заполните обязательные поля")
    return
  }

  reviewsStore.addReview(productId, {
    author: newReview.name,
    text: newReview.text,
    rating: newReview.rating
  })

  notify.push("success", "Спасибо за отзыв")

  newReview.name = ""
  newReview.email = ""
  newReview.text = ""
  newReview.rating = 0
}
</script>

<template>
  <!-- Табы -->
  <div class="product-tabs">
    <button
      class="tab-btn"
      :class="{ 'tab-btn--active': activeTab === 'description' }"
      @click="activeTab = 'description'"
    >
      Описание
    </button>
    <button
      class="tab-btn"
      :class="{ 'tab-btn--active': activeTab === 'reviews' }"
      @click="activeTab = 'reviews'"
    >
      Отзывы ({{ ratingCount }})
    </button>
  </div>

  <div class="tabs-content">
    <!-- Описание -->
    <div v-if="activeTab === 'description'" class="tab-panel">
      <p class="tab-description">
        {{ description }}
      </p>
    </div>

    <!-- Отзывы -->
    <div v-else class="tab-panel tab-panel--reviews">
      <div class="reviews-columns">
        <!-- Левая колонка — отзывы -->
        <div class="reviews-list">
          <div
            v-for="review in productReviews"
            :key="review.id"
            class="review-item"
          >
            <div class="review-header">
              <div class="review-author">{{ review.author }}</div>
              <div class="review-date">{{ review.date }}</div>
            </div>

            <div class="review-rating">
              <StarRating :rating="review.rating" :size="14" />
            </div>

            <p class="review-text">{{ review.text }}</p>
          </div>
        </div>

        <!-- Правая колонка — форма -->
        <form class="review-form" @submit.prevent="submitReview">
          <h3 class="review-form__title">Добавить отзыв</h3>
          <p class="review-form__hint">
            Ваш e-mail не будет опубликован. Обязательные поля помечены *
          </p>

          <label class="review-form__field">
            <span>Отзыв *</span>
            <textarea
              v-model="newReview.text"
              rows="4"
              required
            />
          </label>

          <div class="review-form__row">
            <label class="review-form__field">
              <span>Ваше имя *</span>
              <input v-model="newReview.name" type="text" required />
            </label>

            <label class="review-form__field">
              <span>Ваш e-mail</span>
              <input v-model="newReview.email" type="email" />
            </label>
          </div>

          <div class="review-form__rating">
            <span class="review-form__rating-label">Рейтинг *</span>
            <div class="review-form__stars">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                class="rating-star"
                :class="{ 'rating-star--active': star <= newReview.rating }"
                @click="setRating(star)"
              >
                ★
              </button>
            </div>
          </div>

          <button type="submit" class="review-submit">
            Отправить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-tabs {
  display: flex;
  gap: 30px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 8px 0;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  position: relative;
  color: #777;
}

.tab-btn--active {
  color: #000;
}

.tab-btn--active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background: #000;
}

.tabs-content {
  margin-bottom: 60px;
}

.tab-panel {
  font-size: 14px;
  color: #555;
}

.tab-description {
  max-width: 700px;
  line-height: 1.7;
}

/* Отзывы */
.tab-panel--reviews {
  margin-top: 10px;
}

/* Две колонки на ПК */
.reviews-columns {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 4px;
}

.review-author {
  font-weight: 500;
}

.review-date {
  color: #999;
  font-size: 12px;
}

.review-rating {
  margin: 4px 0 8px;
}

.review-text {
  font-size: 13px;
  line-height: 1.6;
}

/* Форма */
.review-form__title {
  font-size: 16px;
  margin-bottom: 6px;
}

.review-form__hint {
  font-size: 11px;
  color: #999;
  margin-bottom: 14px;
}

.review-form__field {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  gap: 4px;
  margin-bottom: 12px;
}

.review-form__field input,
.review-form__field textarea {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 10px;
  font-size: 13px;
  outline: none;
}

.review-form__field textarea {
  resize: vertical;
}

.review-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.review-form__rating {
  margin: 8px 0 16px;
}

.review-form__rating-label {
  font-size: 12px;
}

.review-form__stars {
  display: inline-flex;
  gap: 4px;
  margin-top: 4px;
}

.rating-star {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  color: #ddd;
}

.rating-star--active {
  color: #c9a36b;
}

.review-submit {
  border: none;
  padding: 10px 24px;
  background: #000;
  color: #fff;
  font-size: 13px;
  border-radius: 4px;
  cursor: pointer;
}

/* MOBILE */
@media (max-width: 768px) {
  .reviews-columns {
    grid-template-columns: 1fr;
  }

  .review-form__row {
    grid-template-columns: 1fr;
  }
}
</style>
