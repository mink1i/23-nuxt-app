<script setup lang="ts">
const email = ref("")
const loading = ref(false)
const successMsg = ref("")
const errorMsg = ref("")

function goBackToAuth() {
  navigateTo("/auth")
}

async function submitRestore() {
  successMsg.value = ""
  errorMsg.value = ""

  const trimmedEmail = email.value.trim()

  if (!trimmedEmail) {
    errorMsg.value = "Введите email"
    return
  }

  loading.value = true

  try {
    // имитация запроса к серверу
    await new Promise((resolve) => setTimeout(resolve, 800))

    successMsg.value = `Если аккаунт существует, мы отправили ссылку для восстановления на ${trimmedEmail}.`
    email.value = ""
  } catch {
  errorMsg.value = "Что-то пошло не так, попробуйте ещё раз."
  }
   finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper">
    <h1 class="auth-title">Мой аккаунт</h1>

    <!-- ТАБЫ -->
    <div class="auth-tabs">
      <button class="tab" @click="goBackToAuth">Войти</button>
      <button class="tab tab--active">Восстановить пароль</button>
    </div>

    <form class="auth-form" @submit.prevent="submitRestore">
      <div class="form-block">
        <p class="restore-text">
          Введите email, который вы использовали при регистрации. Мы отправим
          ссылку для восстановления пароля.
        </p>

        <label>
          Email
          <InputField v-model="email" variant="gray" type="email" />
        </label>
      </div>

      <div class="form-actions">
        <ActionButton :disabled="loading">
          {{ loading ? "Отправка..." : "Отправить ссылку" }}
        </ActionButton>

        <button type="button" class="back-link" @click="goBackToAuth">
          ← Вернуться ко входу
        </button>
      </div>

      <p v-if="successMsg" class="msg msg--success">
        {{ successMsg }}
      </p>
      <p v-if="errorMsg" class="msg msg--error">
        {{ errorMsg }}
      </p>
    </form>
  </div>
</template>

<style scoped>
.auth-wrapper {
  max-width: 480px;
  margin: 60px auto;
  padding: 0 16px;
  text-align: center;
}

.auth-title {
  font-size: 24px;
  margin-bottom: 24px;
}

/* Tabs */
.auth-tabs {
  display: inline-flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #ddd;
  margin-bottom: 36px;
}

.tab {
  padding: 10px 28px;
  border: none;
  background: #fff;
  color: #000;
  font-size: 15px;
  cursor: pointer;
}

.tab + .tab {
  border-left: 1px solid #ddd;
}

.tab--active {
  background: #000;
  color: #fff;
}

/* Form */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: left;
}

/* Text */
.restore-text {
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 16px;
}

/* Blocks */
.form-block {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

label {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Actions */
.form-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}

.back-link {
  border: none;
  background: none;
  font-size: 14px;
  color: var(--color-black);
  cursor: pointer;
  text-decoration: underline;
}

/* Messages */
.msg {
  font-size: 13px;
  margin-top: 4px;
  text-align: center;
}

.msg--success {
  color: #2d2d2d;
  font-weight: 500;
}

.msg--error {
  color: #c0392b;
}


/* MOBILE */
@media (max-width: 768px) {
  .auth-wrapper {
    margin-top: 40px;
  }

  .auth-title {
    font-size: 22px;
  }

  .auth-tabs {
    width: 100%;
    justify-content: center;
  }

  .tab {
    flex: 1;
    padding: 10px 0;
  }
}
</style>
