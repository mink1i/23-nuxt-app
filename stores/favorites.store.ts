import { defineStore } from "pinia";

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  discount?: number;
  image: string;
}

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    items: [] as FavoriteItem[]
  }),

  getters: {
    isFavorite: (state) => (id: number) => state.items.some(i => i.id === id),
  },

  actions: {
    toggle(item: FavoriteItem) {
      const exists = this.items.find(i => i.id === item.id);
      if (exists) {
        this.items = this.items.filter(i => i.id !== item.id);
      } else {
        this.items.push(item);
      }
      
    },

    async restore(email: string) {
      const saved = localStorage.getItem("favorites:" + email);
      this.items = saved ? JSON.parse(saved) : [];
    },

    save(email: string) {
      localStorage.setItem("favorites:" + email, JSON.stringify(this.items));
    }
  },

  persist: true
});
