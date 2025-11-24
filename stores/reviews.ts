import { defineStore } from "pinia"

export interface Review {
  id: number
  productId: number
  author: string
  date: string
  rating: number
  text: string
}

export const useReviewsStore = defineStore("reviews", {
  state: () => ({
    items: [] as Review[]
  }),

  getters: {
    byProduct: (state) => (productId: number) =>
      state.items.filter((r) => r.productId === productId),
  },

  actions: {
    seedProduct(productId: number) {
      // Если уже есть отзывы для этого товара — ничего не делаем
      if (this.byProduct(productId).length) return

      if (productId === 1) {
        this.items.push(
          {
            id: 1,
            productId,
            author: "Василий",
            date: "6 мая 2024",
            rating: 4,
            text: "В целом отличные, так как стоят не дорого и не пришлось даже дарить новый телефон, который она просила."
          },
          {
            id: 2,
            productId,
            author: "Николай",
            date: "8 мая 2024",
            rating: 5,
            text: "Я бы поставил 6 звёзд, но при доставке серьги помялись. В остальном серьги отличные и я буду продолжать покупать в этом магазине."
          }
        )
      }
    },

    addReview(productId: number, payload: { author: string; text: string; rating: number }) {
      const review: Review = {
        id: Date.now(),
        productId,
        author: payload.author,
        text: payload.text,
        rating: payload.rating,
        date: new Date().toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      }

      this.items.push(review)
    }
  },

  persist: true
})
