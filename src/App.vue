
<template>
  <header id="header">

    <div class="logo">
      <a href="index.html">
        <img src="./assets/logo.png" alt="" />

        <span class="title">Randart</span>
      </a>
      <button id="abrir" class="abrir-menu"><i class="fa-solid fa-bars"></i></button>
      <button id="cerrar" class="cerrar-menu"><i class="fa-solid fa-x"></i></button>
    </div>


    <nav class="header-linea" id="menu">

      <ul>
        <li><router-link class="menu_link" to="/"><img src="./assets/logo.png" alt="" />Inicio</router-link></li>
        <li><router-link class="menu_link" to="/obras"><img src="./assets/logo.png" alt="" />Obras</router-link></li>
        <li><router-link class="menu_link" to="/galerias"><img src="./assets/logo.png" alt="" />Galerías</router-link></li>        
        <li><router-link class="menu_link" to="/subituobra"><img src="./assets/logo.png" alt="" />Subí tu obra</router-link></li>
        <!--<li><router-link class="menu_link" to="/registro"><img src="./assets/logo.png" alt="" />Registrarme</router-link></li>-->
        

      </ul>

    </nav>

  </header>
  <main id="main">
    <h1>Randart - Arte y colección al azar</h1>
    <p class="centered-paragraph">{{ titulo }}</p>
    <hr>
    <div class="container">

      <router-view />
      <!--<component :is="view"></component>-->

    </div>
  </main>
  <footer id="footer">

    <h3>Seguinos</h3>
    <ul class="seguinos">
      <li><a href="https://twitter.com/" class="icon brands style2 fa-twitter" target="_blank">
          <span class="label">Twitter</span></a></li>
      <li><a href="https://www.facebook.com/?locale=es_LA" class="icon brands style2 fa-facebook-f" target="_blank">
          <span class="label">Facebook</span></a></li>
      <li><a href="https://www.instagram.com/" class="icon brands style2 fa-instagram" target="_blank">
          <span class="label">Instagram</span></a></li>
      <li><a href="mailto:nrmattar@gmail.com" class="icon solid style2 fa-envelope" target="_blank">
          <span class="label">Email</span></a></li>
    </ul>
    <p class="copyright">&copy; Randart. Todos los derechos reservados</p>

  </footer>
  <!--<Home msg="Welcome to Your Vue.js App" />-->
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>@import url('assets/styles/randart.css');</style>
