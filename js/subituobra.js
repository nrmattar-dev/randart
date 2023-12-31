const { createApp } = Vue;

const app = createApp({
   data() {
      return {
         // Inicialmente, cargaremos tanto articulos como galerias
         urls: {
            //articulos: "https://randart.pythonanywhere.com/articulos",
            articulos: "http://127.0.0.1:5000/articulos"
         },
         datos: {
            articulos: []
         },
         imagenFile: null,
         error: false,
         cargando: true
      };
   },

   methods: {

    articulo_clear()
    {
        this.articulo_id = null;
        this.titulo = "";
        this.autor = "";
        this.fecha = "";
        this.descripcion = "";
        this.precio = "";
        this.imagenUrl = null;  // Asegúrate de utilizar la propiedad correcta
        this.$refs.fileInput.value = null;  // Limpia el campo de entrada de archivos
        document.getElementById('articulo_id').value = null;
        document.getElementById('titulo').value = "";
        document.getElementById('autor').value = "";
        document.getElementById('fecha').value = "";
        document.getElementById('descripcion').value = "";
        document.getElementById('precio').value = "";    
        
    },    
    articulo_save() {
        const formData = new FormData();
        formData.append("titulo", this.titulo);
        formData.append("autor", this.autor);
        formData.append("descripcion", this.descripcion);
        formData.append("precio", this.precio);
        formData.append("imagen", this.imagen);
  
         fetch("http://127.0.0.1:5000/articulo_insert", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("creado");
            alert("Artículo Guardado");
            this.articulo_clear();
            this.fetchData("articulos");
          })
          .catch((err) => {
            console.error(err);
            alert("Error al grabar");
          });
      },
      // ... (otros métodos)
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          // Guardar el archivo para su posterior envío
          this.imagenFile = file;
        }
      },
   }
}).mount('#app');

