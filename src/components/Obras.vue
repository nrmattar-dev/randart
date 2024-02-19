<template>
    <section v-if="error">Lo sentimos se produjo un error</section>
    <section v-else>
        <section v-if="cargando">
            <div class="spinner-border"></div>
            <p>Cargando .....</p>

        </section>
        <section v-else>

            <section class="tiles">

                <article v-for="articulo in articulos" :key="articulo.id">

                    <span class="image">
                        <img :src="articulo.imagen" alt="" class="flexible-image" />
                    </span>

                    <a @click="obra_detalle_fn('obra_detalle', articulo.id)">
                        <h2>{{ articulo.titulo }}</h2>
                        <div class="content">
                            <p>{{ articulo.descripcion }}</p>
                        </div>
                    </a>

                </article>

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
    mounted() {
        this.$parent.titulo = 'Subí tu obra o artículo de colección que quieras vender. Todas tendrán la misma probabilidad de ser vistas.';


    },
    data() {
        return {
            articulos: [],
            error: false,
            cargando: true
        }
    },

    created() {
        this.fetchData()  // Invocando al método
    },
    methods: {
        obra_detalle_fn(view, id) {
            // el click como en el menu no funciona porque estoy en el scope del componente, no del general.
            this.$parent.view = view;
            this.$parent.parametro = id;

        },
        fetchData() {
            // Acá se consume la Api  /productos
            //url:"https://randart.pythonanywhere.com/articulos",
            const url = "http://127.0.0.1:5000/articulos?rand=true"
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.articulos = data;
                    this.cargando = false
                })
                .catch(err => {
                    alert("Error al grabar")
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