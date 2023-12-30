const { createApp } = Vue

  createApp({
    data() {
      return {
        //url:"https://randart.pythonanywhere.com/articulos",
        url:"http://127.0.0.1:5000/articulos?rand=true",
        articulos:[],
        error:false,
        cargando:true
      }
    },
    
    created() {
        this.fetchData(this.url)  // Invocando al método
    },
    methods: {
        fetchData(url) {
            // Acá se consume la Api  /productos
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.articulos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                });
        }
    },
  }).mount('#app')