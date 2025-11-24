import { defineStore } from "pinia"

export const useNotifyStore = defineStore("notify", {
  state: () => ({
    list: [] as { id: number; type: string; message: string }[]
  }),

  actions: {
    push(type: string, message: string) {
      const id = Date.now()

      this.list.push({ id, type, message })

      setTimeout(() => {
        this.remove(id)
      }, 2500)
    },

    remove(id: number) {
      this.list = this.list.filter((n) => n.id !== id)
    }
  }
})
