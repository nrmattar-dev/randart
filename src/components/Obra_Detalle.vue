<template>
<section v-if="error">
  Lo sentimos se produjo un error
</section>
<section v-else>
  <section class="directorio" v-if="cargando">
    <div class="spinner-border"></div>
    <p>Cargando .....</p>
  </section>
  <section v-else>
    <article class="articulo" v-for="articulo in articulos" :key="articulo.id">
      <img :src="articulo.imagen" alt="" />
      <div class="informacion">
        <h2>{{articulo.titulo}}</h2>
        <div><p><b>Autor:</b></p><p>{{articulo.autor}}</p></div>
        <div><p><b>Descripción:</b></p><p class="descripcion">{{articulo.descripcion}}</p></div>
        <div><p><b>Precio:</b></p><p class="precio"><b>U$S {{articulo.precio}}.- (ARS $ {{convertirUSDaARS(articulo.precio)}}.-)</b></p></div>
        <button class="boton-comprar">Comprar</button>
        <div><p><a href="galeria.html">Volver</a></p></div>
      </div>
    </article>
  </section>
</section>
    </template>
    
    <script>
    export default {
      name: 'PaginaPrincipal',
      props: {
        msg: String
      },
      data() {
                return {
                    articulos: [],
                    dolar: 0,
                    error: false,
                    cargando: true
                }
            },
            // Se llama después de que la instancia haya 
            // terminado de procesar todas las opciones relacionadas con el estado.
            created() {
                this.fetchData()  // Invocando al método
            },
            methods: {
                convertirUSDaARS(precio)
                {
                    return precio*this.dolar
                },
                fetchData() {
                    
                    // Acá se consume la Api  /productos
                    //url: "https://randart.pythonanywhere.com/getarticulo/" + id
                    let url = "https://criptoya.com/api/dolar"
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            this.dolar = parseInt(data.blue.ask)
                        })
                        .catch(err => {
                            console.error(err);
                            this.error = true
                        });

                    url = "http://127.0.0.1:5000/articulos?id=" + this.$parent.parametro;
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            this.articulos = data;
 
                            this.cargando = false

                        })
                        .catch(err => {
                            console.error(err);
                            this.error = true
                        });
                }

            },
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