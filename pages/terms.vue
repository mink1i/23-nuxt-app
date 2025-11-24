<script setup lang="ts">
useSeoMeta({
  title: "Условия покупки | Shoppe"
})
</script>

<template>
  <div class="page">
    <h1 class="page__title">Условия покупки</h1>

    <div class="page__content">
      <section class="section">
        <h2>Оплата</h2>
        <p>
          Мы принимаем оплату банковскими картами Visa, Mastercard и Mir.
          Оплата происходит на защищённой платёжной странице вашего банка.
        </p>
      </section>

      <section class="section">
        <h2>Обработка заказа</h2>
        <p>
          Заказы подтверждаются автоматически. Сборка заказа занимает до 1
          рабочего дня. После отправки вы получите письмо с трек-номером.
        </p>
      </section>

      <section class="section">
        <h2>Изменение и отмена</h2>
        <p>
          Изменить или отменить заказ можно до его передачи в службу доставки.
          Для этого напишите нам на email или в мессенджер, указав номер заказа.
        </p>
      </section>

      <section class="section">
        <h2>Гарантия подлинности</h2>
        <p>
          Все украшения Shoppe производятся из гипоаллергенных материалов и
          проходят ручной контроль качества перед отправкой.
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
