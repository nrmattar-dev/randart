const { createApp } = Vue;

const app = createApp({
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

         fetch(url,options)
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
               this.error=true;
            });
      },
      handleFileUpload(event) {
         const file = event.target.files[0];
         if (file) {
            this.imagenUrl = URL.createObjectURL(file);
          }
      },
   }
}).mount('#app');

