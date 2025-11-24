<script setup lang="ts">
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { useAuthStore } from "~/stores/auth"

const auth = useAuthStore()
const route = useRoute()

// если не авторизован — на страницу авторизации
if (!auth.isAuth) {
  navigateTo("/auth")
}

const showConfirm = ref(false)

const isOrdersTabActive = computed(() => route.path === "/account/orders")
const isLogoutTabActive = computed(() => route.path === "/account/logout")

function openConfirm() {
  showConfirm.value = true
}

function cancel() {
  showConfirm.value = false
}

function confirmLogout() {
  auth.logout()
  showConfirm.value = false
  navigateTo("/auth")
}
</script>

<template>
  <div class="orders-page">
    <h1 class="page-title">Мой аккаунт</h1>

    <!-- Вкладки -->
    <div class="account-tabs">
      <NuxtLink
        to="/account/orders"
        class="account-tab"
        :class="{ 'account-tab--active': isOrdersTabActive }"
      >
        Заказы
      </NuxtLink>

      <NuxtLink
        to="/account/logout"
        class="account-tab"
        :class="{ 'account-tab--active': isLogoutTabActive }"
      >
        Выход
      </NuxtLink>
    </div>

    <section class="logout-section">
      <h2 class="logout-title">Выход из аккаунта</h2>
      <p class="logout-text">
        При выходе ваши заказы и избранные товары останутся в аккаунте. Вы
        сможете вернуться в любой момент, просто войдя по своему email и
        паролю.
      </p>

      <button type="button" class="logout-btn" @click="openConfirm">
        Выйти из учётной записи
      </button>
    </section>

    <!-- Модальное окно подтверждения -->
    <transition name="fade">
      <div v-if="showConfirm" class="modal">
        <div class="modal__backdrop" @click="cancel" />
        <div class="modal__window">
          <h3 class="modal__title">Выйти из аккаунта?</h3>
          <p class="modal__text">
            Вы уверены, что хотите выйти из учётной записи Shoppe?
          </p>

          <div class="modal__actions">
            <button
              type="button"
              class="modal__btn modal__btn--secondary"
              @click="cancel"
            >
              Отмена
            </button>
            <button
              type="button"
              class="modal__btn modal__btn--primary"
              @click="confirmLogout"
            >
              Да, выйти
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.orders-page {
  max-width: 1248px;
  margin: 40px auto 80px;
  padding: 0 16px;
}

.page-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 48px;
}

/* вкладки */
.account-tabs {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 32px;
}

.account-tab {
  padding-bottom: 12px;
  background: none;
  border: 0;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.account-tab--active {
  border-bottom: 1px solid #000;
}

/* контент */
.logout-section {
  max-width: 460px;
  padding-top: 8px;
}

.logout-title {
  font-size: 20px;
  margin-bottom: 12px;
}

.logout-text {
  font-size: 14px;
  color: #555;
  line-height: 1.7;
  margin-bottom: 20px;
}

.logout-btn {
  border-radius: 4px;
  border: 1px solid #000;
  background: #000;
  color: #fff;
  font-size: 14px;
  padding: 12px 26px;
  cursor: pointer;
}

/* модалка */
.modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}

.modal__window {
  position: relative;
  max-width: 420px;
  width: 100%;
  margin: 0 16px;
  padding: 24px 26px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);
}

.modal__title {
  font-size: 18px;
  margin-bottom: 8px;
}

.modal__text {
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
}

.modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal__btn {
  min-width: 120px;
  padding: 9px 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
  cursor: pointer;
  background: #f5f5f5;
}

.modal__btn--primary {
  background: #000;
  border-color: #000;
  color: #fff;
}

/* анимация */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* MOBILE */
@media (max-width: 768px) {
  .page-title {
    margin-bottom: 32px;
  }
}
</style>
