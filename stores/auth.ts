import { defineStore } from "pinia";

export interface AuthUser {
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    user: null as AuthUser | null
  }),

  getters: {
    isAuth: (state) => !!state.token
  },

  actions: {
    setToken(token: string) {
      this.token = token;
    },

    setEmail(email: string) {
      this.user = { email };
    },

    logout() {
      this.token = null;
      this.user = null;
    }
  },

  persist: true
});
