<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useCartStore } from "~/stores/cart"

const cart = useCartStore()
const router = useRouter()
const route = useRoute()

// бургер
const isMenuOpen = ref(false)

// строка поиска в шапке 
const searchQuery = ref<string>((route.query.q as string) || "")

// количество товаров в корзине
const cartCount = computed(() => cart.totalCount)

// отправка поиска
function submitSearch() {
  const q = searchQuery.value.trim()

  if (q) {
    router.push({ path: "/catalog", query: { q } })
  } else {
    router.push("/catalog")
  }

  isMenuOpen.value = false
}

// бургер
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function goToCart() {
  router.push("/cart")
  isMenuOpen.value = false
}

// закрываем бургер при любом переходе
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  }
)
</script>

<template>
  <header class="header">
    <!-- верхняя линия -->
    <div class="header__top">
      <NuxtLink to="/" class="header__logo">
        <IconLogo />
      </NuxtLink>

      <!-- ДЕСКТОП МЕНЮ -->
      <nav class="header__nav">
        <NuxtLink to="/catalog" class="header__link">Магазин</NuxtLink>
        <NuxtLink to="/about" class="header__link">О нас</NuxtLink>
      </nav>

      <!-- ДЕСКТОП ИКОНКИ -->
      <div class="header__icons">
        <!-- Поиск переносим на страницу каталога -->
        <button
          type="button"
          class="header__icon-btn"
          @click="router.push('/catalog')"
        >
          <Icon name="icons:search" size="21px" />
        </button>

        <NuxtLink to="/favorites" class="header__icon-btn">
          <Icon name="icons:favorite" size="21px" />
        </NuxtLink>

        <button
          type="button"
          class="header__icon-btn header__cart-btn"
          @click="goToCart"
        >
          <Icon name="icons:cart" size="21px" />
          <span v-if="cartCount" class="header__cart-badge">
            {{ cartCount }}
          </span>
        </button>

        <NuxtLink to="/account" class="header__icon-btn">
          <Icon name="icons:user" size="21px" />
        </NuxtLink>
      </div>

      <!-- МОБИЛЬНЫЕ ИКОНКИ -->
      <div class="header__mobile-right">
        <button
          type="button"
          class="header__icon-btn header__cart-btn"
          @click="goToCart"
        >
          <Icon name="icons:cart" size="21px" />
          <span v-if="cartCount" class="header__cart-badge">
            {{ cartCount }}
          </span>
        </button>

        <button
          type="button"
          class="header__icon-btn header__burger"
          @click="toggleMenu"
        >
          <Icon :name="isMenuOpen ? 'ph:x' : 'ph:list'" size="24" />
        </button>
      </div>
    </div>

    <!-- ПОИСК (на мобиле) -->
    <form class="header__search" @submit.prevent="submitSearch">
      <Icon name="ph:magnifying-glass" size="16" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search"
      />
    </form>

    <!-- МОБИЛЬНОЕ МЕНЮ -->
    <transition name="menu-fade">
      <nav v-if="isMenuOpen" class="header__mobile-menu">
        <NuxtLink to="/catalog" class="header__mobile-link">Магазин</NuxtLink>
        <NuxtLink to="/about" class="header__mobile-link">О нас</NuxtLink>
        <NuxtLink to="/favorites" class="header__mobile-link">Избранное</NuxtLink>
        <NuxtLink to="/account" class="header__mobile-link">Мой аккаунт</NuxtLink>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.header {
  max-width: 1248px;
  margin: 32px auto 0;
  padding: 0 16px;
}

/* верхняя строка */
.header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E5E5E5;
  padding-bottom: 18px;
}

.header__logo {
  display: flex;
  align-items: center;
}

/* десктоп-меню */
.header__nav {
  display: flex;
  gap: 60px;
  align-items: center;
}

.header__link {
  font-size: 16px;
  line-height: 27px;
  color: var(--color-black);
  text-decoration: none;
  padding-bottom: 18px;
  border-bottom: 1px solid transparent;
}

.header__link.router-link-active {
  border-bottom-color: var(--color-black);
}

.header__link:hover {
  color: var(--color-dark-gray);
}

/* десктоп-иконки */
.header__icons {
  display: flex;
  gap: 32px;
  align-items: center;
}

.header__icon-btn {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
}

/* бейдж количества в корзине */
.header__cart-badge {
  position: absolute;
  top: -4px;
  right: -8px;
  min-width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* правая часть на мобилке */
.header__mobile-right {
  display: none;
  align-items: center;
  gap: 16px;
}

/* поиск (по макету) */
.header__search {
  display: none; /* включаем только на мобилке */
  margin-top: 12px;
  margin-bottom: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  background: #f5f5f5;
  align-items: center;
  gap: 8px;
}

.header__search input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  width: 100%;
}

/* меню для бургера */
.header__mobile-menu {
  display: none; /* включаем только на мобилке */
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-gray);
}

.header__mobile-link {
  font-size: 14px;
  color: var(--color-black);
  text-decoration: none;
}

/* анимация появления */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/*МОБИЛЬНАЯ ВЕРСИЯ */
@media (max-width: 768px) {
  .header {
    margin-top: 24px;
  }

  .header__top {
    border-bottom: none;
    padding-bottom: 8px;
  }

  .header__nav,
  .header__icons {
    display: none;
  }

  .header__mobile-right {
    display: flex;
  }

  .header__search {
    display: flex;
  }

  .header__mobile-menu {
    display: flex;
  }
}
</style>
