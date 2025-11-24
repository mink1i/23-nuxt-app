<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import ProductCard from "~/components/home/ProductCard.vue"

interface Product {
  id: number
  name: string
  price: number
  discount?: number
  image: string
  category: "earrings" | "hair" | "necklace"
}

// Мок-товары
const allProducts: Product[] = [
  {
    id: 1,
    name: "Lira Earrings",
    price: 2000,
    discount: 25,
    image: "/images/1.jpg",
    category: "earrings"
  },
  {
    id: 2,
    name: "Ollie Earrings",
    price: 2500,
    discount: 0,
    image: "/images/2.jpg",
    category: "earrings"
  },
  {
    id: 3,
    name: "Kaede Hair Pin Set Of 3",
    price: 3000,
    discount: 20,
    image: "/images/3.jpg",
    category: "hair"
  },
  {
    id: 4,
    name: "Yuki Hair Pin Set Of 3",
    price: 2900,
    discount: 15,
    image: "/images/4.jpg",
    category: "hair"
  },
  {
    id: 5,
    name: "Plaine Necklace",
    price: 1900,
    discount: 0,
    image: "/images/5.jpg",
    category: "necklace"
  },
  {
    id: 6,
    name: "Hair Pin Set Of 3",
    price: 3000,
    discount: 0,
    image: "/images/3.jpg",
    category: "hair"
  }
]

// Фильтры / поиск 
const route = useRoute()

const search = ref<string>((route.query.q as string) || "")
const selectedCategory = ref<"all" | "earrings" | "hair" | "necklace">("all")
const onlyDiscount = ref(false)

// итоговая цена с учётом скидки 
const getFinalPrice = (p: Product) =>
  p.discount && p.discount > 0
    ? Math.round(p.price - (p.price * p.discount) / 100)
    : p.price

// диапазон цен по итоговой цене
const productMinPrice = computed(() =>
  Math.min(...allProducts.map((p) => getFinalPrice(p)))
)
const productMaxPrice = computed(() =>
  Math.max(...allProducts.map((p) => getFinalPrice(p)))
)

const priceFrom = ref(productMinPrice.value)
const priceTo = ref(productMaxPrice.value)

// стиль активной части слайдера
const sliderStyle = computed(() => {
  const min = productMinPrice.value
  const max = productMaxPrice.value
  const range = max - min || 1

  const fromPercent = ((priceFrom.value - min) / range) * 100
  const toPercent = ((priceTo.value - min) / range) * 100

  return {
    "--from": `${fromPercent}%`,
    "--to": `${toPercent}%`
  }
})

// не даём левому бегунку заходить за правый
function onMinChange() {
  if (priceFrom.value > priceTo.value) {
    priceFrom.value = priceTo.value
  }
}

// не даём правому бегунку заходить левее левого
function onMaxChange() {
  if (priceTo.value < priceFrom.value) {
    priceTo.value = priceFrom.value
  }
}

// мобильный блок фильтров
const isMobileFiltersOpen = ref(false)

onMounted(() => {
  const q = route.query.q
  if (typeof q === "string") {
    search.value = q
  }
})

watch(
  () => route.query.q,
  newQ => {
    if (typeof newQ === "string") {
      search.value = newQ
    } else if (newQ == null) {
      search.value = ""
    }
  }
)

// Пагинация
const perPage = 6
const currentPage = ref(1)

// сбрасываем страницу при изменении фильтров
watch(
  [search, selectedCategory, priceFrom, priceTo, onlyDiscount],
  () => {
    currentPage.value = 1
  }
)

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 600)
})

// Категории для селекта
const categories = [
  { value: "all", label: "Все" },
  { value: "earrings", label: "Серьги" },
  { value: "hair", label: "Заколки" },
  { value: "necklace", label: "Украшения" }
]

// Применяем фильтры
const filteredProducts = computed(() => {
  let list = [...allProducts]

  // поиск
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q))
  }

  // категория
  if (selectedCategory.value !== "all") {
    list = list.filter(p => p.category === selectedCategory.value)
  }

  // диапазон цены по итоговой цене
  list = list.filter(p => {
    const final = getFinalPrice(p)
    return final >= priceFrom.value && final <= priceTo.value
  })

  // только со скидкой
  if (onlyDiscount.value) {
    list = list.filter(p => p.discount && p.discount > 0)
  }

  return list
})

// Пагинация после фильтров
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProducts.value.length / perPage))
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredProducts.value.slice(start, start + perPage)
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}
</script>

<template>
  <div class="catalog">
    <div class="catalog__header">
      <h1>Каталог товаров</h1>
    </div>

    <!-- Основная раскладка: фильтры + контент -->
    <div class="catalog__layout">
      <!-- ФИЛЬТРЫ СЛЕВА -->
      <aside
        class="catalog__filters"
        :class="{ 'catalog__filters--mobile-open': isMobileFiltersOpen }"
      >
        <div class="catalog__filters-block">
          <h3>Категории</h3>
          <select v-model="selectedCategory">
            <option
              v-for="cat in categories"
              :key="cat.value"
              :value="cat.value"
            >
              {{ cat.label }}
            </option>
          </select>
        </div>

        <!-- ЦЕНА -->
        <div class="catalog__filters-block">
          <h3>Цена</h3>
          <div class="catalog__price-range">
            <div class="catalog__price-inputs">
              <span class="catalog__price-label">Цена:</span>
              <span>$ {{ priceFrom }}</span>
              <span>—</span>
              <span>$ {{ priceTo }}</span>
            </div>

            <div class="catalog__price-slider" :style="sliderStyle">
              <!-- левый бегунок: минимальная цена -->
              <input
                 v-model.number="priceFrom"
                 type="range"
                 class="price-range price-range--min"
                 :min="productMinPrice"
                 :max="productMaxPrice"
                 :step="10"
                 @input="onMinChange"
                />

              <input
                 v-model.number="priceTo"
                 type="range"
                 class="price-range price-range--max"
                 :min="productMinPrice"
                 :max="productMaxPrice"
                 :step="10"
                 @input="onMaxChange"
                />

            </div>
          </div>
        </div>

        <div class="catalog__filters-block catalog__filters-block--row">
          <label class="switch">
            <input
              type="checkbox"
              v-model="onlyDiscount"
            />
            <span class="switch__slider" />
          </label>
          <span class="switch__label">Со скидкой</span>
        </div>
      </aside>

      <!-- СПИСОК ТОВАРОВ -->
      <section class="catalog__content">
        <!-- Панель сверху: поиск + кнопка "Фильтры" на мобиле -->
        <div class="catalog__toolbar">
          <div class="catalog__search">
            <Icon
              name="ph:magnifying-glass"
              size="16"
            />
            <input
              v-model="search"
              type="text"
              placeholder="Поиск..."
            />
          </div>

          <button
            class="catalog__filters-toggle"
            @click="isMobileFiltersOpen = !isMobileFiltersOpen"
          >
            <Icon
              name="ph:sliders-horizontal"
              size="18"
            />
            <span>Фильтры</span>
          </button>
        </div>

        <!-- GRID -->
        <div
          v-if="isLoading"
          class="catalog__grid"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="catalog-card-skeleton"
          />
        </div>

        <div
          v-else
          class="catalog__grid"
        >
          <template v-if="paginatedProducts.length">
            <ProductCard
              v-for="item in paginatedProducts"
              :key="item.id"
              :product="item"
            />
          </template>
          <div
            v-else
            class="catalog__empty"
          >
            Товары не найдены. Попробуйте изменить фильтры.
          </div>
        </div>

        <!-- ПАГИНАЦИЯ -->
        <div
          v-if="!isLoading && totalPages > 1"
          class="catalog__pagination"
        >
          <button
            class="catalog__page-btn"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            ‹
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            class="catalog__page-btn"
            :class="{ 'catalog__page-btn--active': page === currentPage }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <button
            class="catalog__page-btn"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            ›
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.catalog {
  max-width: 1248px;
  margin: 40px auto 80px;
  padding: 0 16px;
}

.catalog__header h1 {
  font-size: 24px;
  font-weight: 500;
}

/* раскладка: фильтры + товары */
.catalog__layout {
  display: flex;
  gap: 40px;
  margin-top: 32px;
}

/* ФИЛЬТРЫ*/
.catalog__filters {
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.catalog__filters-block h3 {
  font-size: 14px;
  text-transform: uppercase;
  color: #777;
  margin-bottom: 10px;
}

.catalog__filters-block select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  background: #fff;
}

/* Слайдер цены */
.catalog__price-range {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.catalog__price-inputs {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 13px;
  color: #777;
}

.catalog__price-label {
  text-transform: none;
}

/* контейнер двух ползунков */
.catalog__price-slider {
  position: relative;
  height: 24px;
}

/* базовая линия */
.catalog__price-slider::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 2px;
  background: #000;
  opacity: 0.15;
}

/* активный диапазон */
.catalog__price-slider::after {
  content: "";
  position: absolute;
  left: var(--from);
  right: calc(100% - var(--to));
  top: 50%;
  transform: translateY(-50%);
  height: 2px;
  background: #000;
}

/* перекрывающиеся range-инпуты */
.price-range {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
}

/* скрываем стандартный трек */
.price-range::-webkit-slider-runnable-track {
  height: 2px;
  background: transparent;
}
.price-range::-moz-range-track {
  height: 2px;
  background: transparent;
}

/* бегунки */
.price-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: auto;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #000;
  background: #fff;
  margin-top: -5px;
}
.price-range::-moz-range-thumb {
  pointer-events: auto;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #000;
  background: #fff;
}

/* порядок наложения */
.price-range--min {
  z-index: 3;
}
.price-range--max {
  z-index: 2;
}

/* переключатель "со скидкой" */
.catalog__filters-block--row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.switch {
  position: relative;
  width: 36px;
  height: 20px;
  display: inline-block;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch__slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #ddd;
  border-radius: 20px;
  transition: 0.2s;
}

.switch__slider::before {
  content: "";
  position: absolute;
  height: 14px;
  width: 14px;
  left: 3px;
  top: 3px;
  background-color: #fff;
  border-radius: 50%;
  transition: 0.2s;
}

.switch input:checked + .switch__slider {
  background-color: #222;
}

.switch input:checked + .switch__slider::before {
  transform: translateX(16px);
}

.switch__label {
  font-size: 14px;
  color: #555;
}

/* КОНТЕНТ */
.catalog__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* верхняя панель */
.catalog__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* поиск */
.catalog__search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  max-width: 260px;
}

.catalog__search input {
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
}

/* кнопка "Фильтры" (desktop скрыта) */
.catalog__filters-toggle {
  display: none;
  align-items: center;
  gap: 6px;
  border: 1px solid #e0e0e0;
  padding: 8px 10px;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
}

/* GRID товаров */
.catalog__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

/* skeleton */
.catalog-card-skeleton {
  border-radius: 12px;
  height: 320px;
  background: linear-gradient(
    90deg,
    #f2f2f2 0%,
    #e5e5e5 50%,
    #f2f2f2 100%
  );
  background-size: 200% 100%;
  animation: skeleton 1.2s ease-in-out infinite;
}

@keyframes skeleton {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.catalog__empty {
  grid-column: 1 / -1;
  font-size: 14px;
  color: #777;
}

/* пагинация */
.catalog__pagination {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.catalog__page-btn {
  min-width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
}

.catalog__page-btn--active {
  background: #222;
  color: #fff;
  border-color: #222;
}

.catalog__page-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

/*  АДАПТИВ */
@media (max-width: 1024px) {
  .catalog__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .catalog__layout {
    flex-direction: column;
    gap: 24px;
  }

  .catalog__search {
    flex: 1;
    max-width: none;
  }

  .catalog__filters-toggle {
    display: inline-flex;
  }

  .catalog__filters {
    display: none;
    width: 100%;
    border-top: 1px solid #eee;
    padding-top: 16px;
  }

  .catalog__filters.catalog__filters--mobile-open {
    display: flex;
  }

  .catalog__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 540px) {
  .catalog__grid {
    grid-template-columns: 1fr;
  }
}
</style>
