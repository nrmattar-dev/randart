<template>
  <section id="presentacion">

    <div class="image-container">
      <a href="templates/galeria.html">
        <div class="gallery">
        </div>
      </a>
      <div class="gallery-indicators">
      </div>
    </div>
    <p>Bienvenidos a Randart! Somos una plataforma en línea que ofrece arte y coleccionismo al azar, dando a
      todos los usuarios la igual oportunidad de exhibir y vender sus obras. En Randart, creemos que el arte
      es para todos y queremos fomentar la creatividad y la cultura artística en línea. Nuestro objetivo es
      proporcionar una plataforma en línea en la que los artistas y coleccionistas puedan exhibir sus obras y
      los usuarios puedan comprarlas o intercambiarlas de manera aleatoria. En nuestra página web encontrarás
      una amplia variedad de obras de arte, desde pinturas hasta esculturas, fotografías y mucho más. ¡Explora
      nuestra plataforma y descubre tu próxima pieza de arte favorita!</p>
  </section>
</template>

<script>



export default {
  name: 'PaginaPrincipal',
  props: {
    msg: String
  },
  mounted() {
    // Cambiar la propiedad 'titulo' cuando se monta el componente 'home'
    this.$parent.titulo = 'Descubre una galeria diferente';
    //Agrego un script



    const galleryContainer = document.querySelector(".gallery");
    const indicatorsContainer = document.querySelector(".gallery-indicators");
    let currentImageIndex = 0;
    let images; // Esta variable se usará para almacenar las imágenes cargadas.

    // Función para cambiar la imagen
    function changeImage(index) {
      images[currentImageIndex].style.display = "none";
      currentImageIndex = index;
      images[currentImageIndex].style.display = "block";
      updateIndicators();
    }

    // Función para actualizar los indicadores
    function updateIndicators() {
      const indicators = indicatorsContainer.querySelectorAll(".indicator");
      indicators.forEach((indicator, index) => {
        if (index === currentImageIndex) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });
    }

    // Obtener imágenes directamente de la API
    //const url = "https://randart.pythonanywhere.com/articulos";
    const url = "http://127.0.0.1:5000/articulos";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        galleryContainer.innerHTML = ""; // Limpia el contenedor actual de imágenes.
        console.log(data)
        // Almacena las imágenes en la variable 'images'
        images = data.map(item => {
          const image = document.createElement("img");
          image.src = item.imagen;

          image.classList.add("flexible-image");
          galleryContainer.appendChild(image);

          // Crea un indicador y su lógica de clic
          const indicator = document.createElement("span");
          indicator.classList.add("indicator");
          if (item === data[currentImageIndex]) {
            indicator.classList.add("active");
          }
          indicator.addEventListener("click", function () {
            changeImage(data.indexOf(item));
          });
          indicatorsContainer.appendChild(indicator);

          return image;
        });

        // Aplica las dimensiones a los indicadores
        indicatorsContainer.style.width = "15%";
        indicatorsContainer.style.marginLeft = "auto";
        indicatorsContainer.style.marginRight = "auto";

        // Muestra la primera imagen y sus indicadores
        images[currentImageIndex].style.display = "block";

        // Redirige al usuario a la página de la galería al hacer clic en el contenedor de imágenes
        galleryContainer.addEventListener("click", function () {
          window.location.href = "templates/galeria.html";
        });

        // Cambia la imagen cada 5 segundos (5000 ms)
        setInterval(function () {
          const nextIndex = (currentImageIndex + 1) % images.length;
          changeImage(nextIndex);
        }, 5000);
      })
      .catch(error => {
        console.error("Error al cargar las imágenes desde la API:", error);
      });

  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
-->