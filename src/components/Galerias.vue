<template>
    <section v-if="error">Lo sentimos se produjo un error</section>
			<section v-else>
				<section v-if="cargando">
					<div class="spinner-border"></div>
					<p>Cargando .....</p>

				</section>
				<section v-else>

					<section class="directorio">

						<div v-for="galeria in galerias" :key="galeria.id">
							
							<span>
								<iframe :src="galeria.mapa_url" width="400" height="300" style="border:0;"
									allowfullscreen="" loading="lazy"
									referrerpolicy="no-referrer-when-downgrade"></iframe>
							</span>
							
							<h2>{{galeria.razon_social}}</h2>
							<div>
								<p>{{galeria.observaciones}}</p>
							</div>

						</div>

					</section>
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

                    galerias: [],
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
                fetchData() {
                    // Acá se consume la Api  /productos
                    //url:"https://randart.pythonanywhere.com/galerias",
                    const url = "http://127.0.0.1:5000/galerias";
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            this.galerias = data;
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