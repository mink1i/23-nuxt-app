<template>
  <div class="about-wrapper">

    <!-- О НАС -->
    <h1 class="about-title">О нас</h1>

    <p class="about-description">
      Мы делаем шикарные украшения для вас<br /><br />
      Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a,
      gravida arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque a.
      Nam ac urna maximus, tempor magna et, placerat urna. Curabitur eu magna enim.
      Proin placerat tortor lacus, ac sodales lectus placerat quis.
    </p>

    <!-- ТРЕНДЫ -->
    <h2 class="section-title">Тренды в украшениях</h2>

    <img src="/images/about-1.jpg" class="section-image" />

    <p class="section-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a
      volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero.
      Sed quis mauris eget arcu facilisis consequat sed eu felis. 
    </p>

    <ul class="section-list">
      <li>consectetur adipiscing elit. Aliquam placerat</li>
      <li>Lorem ipsum dolor sit amet consectetur</li>
    </ul>

    <!-- СДЕЛАНО С ЛЮБОВЬЮ -->
    <h2 class="section-title">Сделано с любовью</h2>

    <img src="/images/about-2.jpg" class="section-image" />

    <p class="section-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a
      volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero.
      Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue.
      Morbi porta tempor odio, in molestie diam bibendu.
    </p>

  </div>
</template>

<style scoped>
/* ЛЕЙАУТ */
.about-wrapper {
  max-width: 672px; 
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 80px;
  color: #000;
  font-family: "DM Sans", sans-serif;
}

/*ТИПОГРАФИКА */
.about-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  margin-bottom: 40px;
}

.about-description {
  font-size: 16px;
  line-height: 27px;
  margin-bottom: 70px;
}

/* -- Заголовки секций -- */
.section-title {
  font-size: 26px;
  font-weight: 400;
  line-height: 35px;
  margin-bottom: 28px;  
}

/* КАРТИНКИ  */
.section-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: 0 18%; 
  border-radius: 8px;
  margin-bottom: 40px; 
}

/*ТЕКСТ-ОПИСАНИЯ */
.section-text {
  font-size: 16px;
  line-height: 27px;
  margin-bottom: 30px; /* Figma spacing */
}

/*  СПИСОК */
.section-list {
  margin-bottom: 70px;
  padding-left: 20px;
}

.section-list li {
  list-style: disc;
  font-size: 16px;
  line-height: 27px;
  margin-bottom: 8px;
}

/*АДАПТИВ (телефоны) */
@media (max-width: 768px) {
  .about-wrapper {
    max-width: 100%;
    padding: 0 16px;
  }

  .about-title {
    font-size: 36px;
  }

  .section-image {
    height: 240px;
    object-position: top; 
  }
}
</style>
