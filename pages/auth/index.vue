<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useAuthStore } from "~/stores/auth"

const auth = useAuthStore()

// режим формы
const mode = ref<"login" | "register">("login")
const isLogin = computed(() => mode.value === "login")

//ЛОКАЛЬНАЯ "БД" ПОЛЬЗОВАТЕЛЕЙ (localStorage)
type LocalUser = {
  email: string
  password: string
}

const users = ref<LocalUser[]>([])

function loadUsers() {
  if (import.meta.server) return
  try {
    const raw = localStorage.getItem("shoppe_users")
    users.value = raw ? (JSON.parse(raw) as LocalUser[]) : []
  } catch {
    users.value = []
  }
}

function saveUsers() {
  if (import.meta.server) return
  localStorage.setItem("shoppe_users", JSON.stringify(users.value))
}


onMounted(loadUsers)

//ОБЩЕЕ СОСТОЯНИЕ
const loading = ref(false)
const errorMsg = ref("")

//ФОРМА ВХОДА
const loginEmail = ref("")
const loginPassword = ref("")
const rememberMe = ref(false) 

//ФОРМА РЕГИСТРАЦИИ
const regEmail = ref("")
const regPassword = ref("")
const regPasswordRepeat = ref("")
const acceptPolicy = ref(false)

// авторизация в приложении (через Pinia)
function loginSuccess(email: string) {
  auth.setToken("fake-token-" + Date.now())
  auth.setEmail(email)
}

//ВХОД
async function submitLogin() {
  errorMsg.value = ""

  if (!loginEmail.value || !loginPassword.value) {
    errorMsg.value = "Введите email и пароль"
    return
  }

  loading.value = true
  try {
    const user = users.value.find(
      (u) =>
        u.email === loginEmail.value.trim() &&
        u.password === loginPassword.value
    )

    if (!user) {
      errorMsg.value = "Неверный email или пароль"
      return
    }

    loginSuccess(user.email)
    navigateTo("/account")
  } finally {
    loading.value = false
  }
}

//РЕГИСТРАЦИЯ
async function submitRegister() {
  errorMsg.value = ""

  //Проверяем согласие с политикой
  if (!acceptPolicy.value) {
    errorMsg.value = "Нужно согласиться на обработку персональных данных"
    return
  }

  //Проверка полей
  if (!regEmail.value || !regPassword.value || !regPasswordRepeat.value) {
    errorMsg.value = "Заполните все поля"
    return
  }

  if (regPassword.value !== regPasswordRepeat.value) {
    errorMsg.value = "Пароли не совпадают"
    return
  }

  const email = regEmail.value.trim()

  //Проверка на существующий email
  if (users.value.some((u) => u.email === email)) {
    errorMsg.value = "Пользователь с таким email уже зарегистрирован"
    return
  }

  loading.value = true
  try {
    //сохраняем пользователя
    users.value.push({
      email,
      password: regPassword.value
    })
    saveUsers()

    //переключаемся на форму входа, подставляем email
    mode.value = "login"
    loginEmail.value = email
    loginPassword.value = ""
    regPassword.value = ""
    regPasswordRepeat.value = ""
    acceptPolicy.value = false

    errorMsg.value = "Регистрация успешна! Теперь войдите."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <h1 class="auth-title">Мой аккаунт</h1>

    <!-- Табы -->
    <div class="auth-tabs">
      <button
        type="button"
        class="tab"
        :class="{ 'tab--active': isLogin }"
        @click="mode = 'login'"
      >
        Войти
      </button>
      <button
        type="button"
        class="tab"
        :class="{ 'tab--active': !isLogin }"
        @click="mode = 'register'"
      >
        Зарегистрироваться
      </button>
    </div>

    <!-- карточка формы -->
    <div class="auth-card">
      <!-- Форма входа -->
      <form
        v-if="isLogin"
        class="auth-form"
        @submit.prevent="submitLogin"
      >
        <div class="form-group">
          <label>Email</label>
          <InputField v-model="loginEmail" variant="gray" />
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <InputField
            v-model="loginPassword"
            variant="gray"
            type="password"
          />
        </div>

        <label class="checkbox-row">
          <input v-model="rememberMe" type="checkbox" />
          <span>Запомнить меня</span>
        </label>

        <ActionButton class="submit-btn" :disabled="loading">
          {{ loading ? "Загрузка..." : "Вход" }}
        </ActionButton>

        <NuxtLink class="restore-link" to="/auth/restore">
          Забыли пароль?
        </NuxtLink>
      </form>

      <!-- Форма регистрации -->
      <form
        v-else
        class="auth-form"
        @submit.prevent="submitRegister"
      >
        <div class="form-group">
          <label>Email</label>
          <InputField v-model="regEmail" variant="gray" />
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <InputField
            v-model="regPassword"
            variant="gray"
            type="password"
          />
        </div>

        <div class="form-group">
          <label>Повторите пароль</label>
          <InputField
            v-model="regPasswordRepeat"
            variant="gray"
            type="password"
          />
        </div>

        <label class="checkbox-row">
          <input v-model="acceptPolicy" type="checkbox" />
          <span>Согласен на обработку персональных данных</span>
        </label>

        <ActionButton class="submit-btn" :disabled="loading">
          {{ loading ? "Загрузка..." : "Зарегистрироваться" }}
        </ActionButton>

        <NuxtLink class="restore-link" to="/auth/restore">
          Забыли пароль?
        </NuxtLink>
      </form>

      <div v-if="errorMsg" class="auth-error">
        {{ errorMsg }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  max-width: 480px;
  margin: 60px auto;
  padding: 0 16px;
  text-align: center;
}

.auth-title {
  font-size: 26px;
  margin-bottom: 24px;
}

/* Tabs */
.auth-tabs {
  display: inline-flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #ddd;
  margin-bottom: 32px;
}

.tab {
  min-width: 130px;
  padding: 10px 24px;
  border: none;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
}

.tab--active {
  background: #000;
  color: #fff;
}

/* Карточка формы */
.auth-card {
  max-width: 360px;
  margin: 0 auto;
}

/* Сетка формы */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: left;
}

.form-group label {
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.checkbox-row input {
  width: 14px;
  height: 14px;
}

/* Кнопка */
.submit-btn {
  width: 100%;
  justify-content: center;
}

/* Ссылки / ошибки */
.restore-link {
  margin-top: 6px;
  font-size: 13px;
  text-align: center;
  color: #000;
  text-decoration: none;
}

.restore-link:hover {
  text-decoration: underline;
}

.auth-error {
  margin-top: 16px;
  font-size: 14px;
  color: #d00;
}

/* Mobile */
@media (max-width: 768px) {
  .auth-page {
    margin-top: 40px;
  }

  .auth-title {
    font-size: 22px;
  }
}
</style>
