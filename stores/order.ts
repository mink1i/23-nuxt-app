import { defineStore } from "pinia";

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
  discount?: number;
}

export interface OrderData {
  id: number; // номер заказа
  items: OrderItem[];
  total: number;
  date: string;
  customer: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
}

export const useOrderStore = defineStore("order", {
  state: () => ({
    lastOrder: null as OrderData | null,
    history: [] as OrderData[]
  }),

  actions: {
    // на вход приходит заказ без id, здесь мы ему этот id добавляем
    setOrder(order: Omit<OrderData, "id">) {
      const newId = this.history.length + 1;

      const fullOrder: OrderData = {
        ...order,
        id: newId
      };

      this.lastOrder = fullOrder;
      this.history.push(fullOrder);
    }
  },

  persist: true
});
