<script setup lang="ts">
useSeoMeta({
  title: "Доставка и возврат | Shoppe"
})
</script>

<template>
  <div class="page">
    <h1 class="page__title">Доставка и возврат</h1>

    <div class="page__content">
      <section class="section">
        <h2>Способы доставки</h2>
        <p>
          Доставка по России осуществляется курьерской службой и в пункты
          выдачи. Стоимость и сроки рассчитываются автоматически при
          оформлении заказа.
        </p>
      </section>

      <section class="section">
        <h2>Сроки</h2>
        <p>
          Средний срок доставки — от 2 до 7 рабочих дней в зависимости от
          региона. В праздничные дни возможны небольшие задержки.
        </p>
      </section>

      <section class="section">
        <h2>Упаковка</h2>
        <p>
          Все украшения упаковываются в фирменные коробочки Shoppe. Вы можете
          добавить подарочную открытку в комментарии к заказу.
        </p>
      </section>

      <section class="section">
        <h2>Возврат и обмен</h2>
        <p>
          Вы можете оформить возврат в течение 14 дней после получения, если
          украшение не было в носке и сохранена оригинальная упаковка.
          Для оформления напишите на наш email и укажите номер заказа.
        </p>
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
  margin-bottom: 28px;
}

.page__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.section p {
  font-size: 14px;
  line-height: 1.7;
  color: #555;
}
</style>
