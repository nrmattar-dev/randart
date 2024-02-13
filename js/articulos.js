const { createApp } = Vue

  createApp({
    data() {
      return {
        articulos:[],
        error:false,
        cargando:true
      }
    },
    
    created() {
        this.fetchData()  // Invocando al método
    },
    methods: {
        fetchData() {
            // Acá se consume la Api  /productos
        //url:"https://randart.pythonanywhere.com/articulos",
            const url = "http://127.0.0.1:5000/articulos?rand=true"
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.articulos = data;
                    this.cargando=false
                })
                .catch(err => {
                    alert("Error al grabar" )
                    console.error(err);
                    this.error=true              
                });
        }
    },
  }).mount('#app')