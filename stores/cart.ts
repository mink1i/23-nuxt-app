import { defineStore } from "pinia"

export interface CartItem {
  id: number
  name: string
  price: number
  discount?: number
  image: string
  qty: number
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    totalCount: (state) => state.items.reduce((s, i) => s + i.qty, 0),

    totalPrice: (state) =>
      state.items.reduce((sum, item) => {
        const base = item.discount
          ? Math.round(item.price - (item.price * item.discount) / 100)
          : item.price

        return sum + base * item.qty
      }, 0)
  },

  actions: {
    addItem(product: CartItem) {
      const existing = this.items.find((i) => i.id === product.id)

      if (existing) {
        existing.qty += product.qty
      } else {
        this.items.push(product)
      }
    },

    incQty(id: number) {
      const item = this.items.find((i) => i.id === id)
      if (item) item.qty++
    },

    decQty(id: number) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return

      if (item.qty <= 1) {
        this.removeItem(id)
      } else {
        item.qty--
      }
    },

    setQty(id: number, qty: number) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return

      if (qty <= 0) this.removeItem(id)
      else item.qty = qty
    },

    removeItem(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
    },

    clear() {
      this.items = []
    }
  },

  persist: true
})
