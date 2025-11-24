<script setup lang="ts">
useSeoMeta({
  title: "Контакты | Shoppe"
})
</script>

<template>
  <div class="page">
    <h1 class="page__title">Контакты</h1>

    <div class="page__grid">
      <section class="page__block">
        <h2 class="block__title">Как с нами связаться</h2>
        <p class="block__text">
          Если у вас есть вопросы по заказу или подбору украшений, напишите
          нам — мы ответим в течение одного рабочего дня.
        </p>

        <ul class="contacts">
          <li>
            <span class="contacts__label">Телефон</span>
            <a class="contacts__value" href="tel:+79001234567">
              +7 (900) 123‑45‑67
            </a>
          </li>
          <li>
            <span class="contacts__label">Email</span>
            <a class="contacts__value" href="mailto:hello@shoppe.ru">
              hello@shoppe.ru
            </a>
          </li>
          <li>
            <span class="contacts__label">Адрес шоурума</span>
            <span class="contacts__value">
              Москва, Новослободская, 23
            </span>
          </li>
          <li>
            <span class="contacts__label">Часы работы</span>
            <span class="contacts__value">Пн–Вс, 10:00–21:00</span>
          </li>
        </ul>
      </section>

      <section class="page__block page__block--card">
        <h2 class="block__title">Форма обратной связи</h2>
        <p class="block__text">
          Оставьте сообщение — мы свяжемся с вами по email.
        </p>

        <form class="feedback" @submit.prevent>
          <InputField placeholder="Ваше имя" variant="gray" />
          <InputField placeholder="Email" type="email" variant="gray" />
          <textarea
            class="feedback__message"
            rows="4"
            placeholder="Сообщение"
          />
          <ActionButton>Отправить</ActionButton>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 40px auto 80px;
  padding: 0 16px;
}

.page__title {
  font-size: 32px;
  margin-bottom: 32px;
}

.page__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 48px;
}

.page__block {
  font-size: 14px;
  line-height: 1.6;
}

.block__title {
  font-size: 20px;
  margin-bottom: 12px;
}

.block__text {
  color: #555;
  margin-bottom: 18px;
}

.contacts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contacts__label {
  display: block;
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.contacts__value {
  font-size: 14px;
  color: #222;
  text-decoration: none;
}

.contacts__value:hover {
  text-decoration: underline;
}

.page__block--card {
  padding: 20px 22px;
  border-radius: 8px;
  border: 1px solid #eee;
  background: #fafafa;
}

.feedback {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.feedback__message {
  resize: vertical;
  min-height: 80px;
  padding: 14px 12px;
  border-radius: 4px;
  border: 1px solid var(--color-gray);
  font-family: inherit;
}

@media (max-width: 768px) {
  .page__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
