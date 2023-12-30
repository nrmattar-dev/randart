async function Preparar() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  let blueValue = 0;

  try {
    const response = await fetch("https://criptoya.com/api/dolar");
    const data = await response.json();
    blueValue = parseFloat(data.blue);
    console.log('Valor Dolar: ', blueValue);
  } catch (error) {
    console.error('error', error);
  }

  const { createApp } = Vue

  createApp({
    data() {
      return {
        //url: "https://randart.pythonanywhere.com/getarticulo/" + id,
        url: "http://127.0.0.1:5000/articulos?id=" + id,
        articulos:[],
        dolar: 0,
        error: false,
        cargando: true
      }
    },
    // Se llama después de que la instancia haya 
    // terminado de procesar todas las opciones relacionadas con el estado.
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
            this.dolar = blueValue;
            this.cargando = false

          })
          .catch(err => {
            console.error(err);
            this.error = true
          });
      }
      
    },
  }).mount('#app')
}

Preparar();
