<template>
    <section class="contenedor">
    <section class="seccion">
        <h3>Artículos</h3>

        <div class="container-form">

            <form>
                <div class="entrada">
                    <label for="articulo_id">ID</label>
                    <input type="number" name="articulo_id" id="articulo_id" disabled>
                    <label for="titulo">Título:</label>
                    <input type="text" name="titulo" id="titulo">
                    <label for="autor">Autor:</label>
                    <input type="text" name="autor" id="autor">
                    <label for="fecha">Fecha:</label>
                    <input type="text" name="fecha" id="fecha">
                    <label for="descripcion">Descripción:</label>
                    <input type="text" name="descripcion" id="descripcion">
                    <label for="precio">Precio:</label>
                    <input type="text" name="precio" id="precio">
                    <label for="imagen">Imagen:</label>
                    <input type="file" ref="fileInput" @change="handleFileUpload" id="imagen">
                    <img :src="imagenUrl" alt="Imagen previa" v-if="imagenUrl"><!--v-if="imagenUrl" si "imagenUrl" existe, la muestra -->
                </div>
            </form>

        </div>

        <div class="botones">
            <button class="guardar" @click="articulo_save">Guardar</button>
            <button class="limpiar" @click="articulo_clear">Limpiar</button>
        </div>

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
                    imagenUrl: null,
                    imagenFile: null,
                    error: false,
                    cargando: true
                };
            },

            methods: {

                articulo_clear() {
                    document.getElementById('articulo_id').value = null;
                    document.getElementById('titulo').value = "";
                    document.getElementById('autor').value = "";
                    document.getElementById('fecha').value = "";
                    document.getElementById('descripcion').value = "";
                    document.getElementById('precio').value = "";

                    const fileInput = this.$refs.fileInput; //en HTML tengo ref="fileInput"
                    fileInput.value = null;

                    this.imagenUrl = null;

                },
                articulo_save() {
                    const formData = new FormData();

                    formData.append("titulo", document.getElementById('titulo').value);
                    formData.append("autor", document.getElementById('autor').value);
                    formData.append("descripcion", document.getElementById('descripcion').value);
                    formData.append("precio", document.getElementById('precio').value);

                    const imagenInput = document.getElementById('imagen');
                    formData.append("imagen", imagenInput.files[0]);

                    let url = "http://127.0.0.1:5000/articulo_insert"
                    var options = {
                        body: formData, //Si fuera un Json lo que envío sería: JSON.stringify(galeria_json),
                        method: 'POST',
                    }

                    fetch(url, options)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.text(); //Desde el Back sólo devuelvo un mensaje. Si escribo response.json(); recibo error.
                        })
                        .then((data) => { //El response.text() se pasa como argumento al data.
                            alert(data);
                            this.articulo_clear();
                        })
                        .catch((err) => {
                            alert("Error al grabar");
                            console.error(err);
                            this.error = true;
                        });
                },
                handleFileUpload(event) {
                    const file = event.target.files[0];
                    if (file) {
                        this.imagenUrl = URL.createObjectURL(file);
                    }
                },
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