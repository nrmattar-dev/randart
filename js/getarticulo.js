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
        url: "https://randart.pythonanywhere.com/getarticulo/" + id,
        articulo: "",
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
            this.articulo = data;
            this.dolar = blueValue;
            this.cargando = false

            console.log('this.articulo: ', this.articulo);
            console.log('this.dolar: ', this.dolar);
          })
          .catch(err => {
            console.error(err);
            this.error = true
          });
      }
      /*,        
      // el id se necesita para buscar en la DB y eliminarlo
      eliminar(id) {
          const url = 'http://localhost:5000/borrar/' + id;
          var options = {
              method: 'DELETE',
          }
          fetch(url, options)
              .then(res => res.text()) // or res.json()
              .then(res => {
                  alert("Eliminado correctamente")
                  location.reload();
              })
      }
      */

    },
  }).mount('#app')
}

Preparar();

/*
async function obtenerParametros() {

    const nombres = [
        "Adán",
        "Abraham",
        "Alejandro",
        "Andrés",
        "Antonio",
        "Benito",
        "Carlos",
        "David",
        "Diego",
        "Eduardo",
        "Enrique",
        "Fernando",
        "Francisco",
        "Gabriel",
        "Gonzalo",
        "Guillermo",
        "Ignacio",
        "Israel",
        "Jacobo",
        "Javier",
        "Jesús",
        "José",
        "Juan",
        "Luis",
        "Manuel",
        "Marcos",
        "Martín",
        "Miguel",
        "Nicolás",
        "Óscar",
        "Pablo",
        "Pedro",
        "Rafael",
        "Raúl",
        "Rodrigo",
        "Samuel",
        "Santiago",
        "Sergio",
        "Tomás",
        "Vicente",
        "Abril",
        "Aitana",
        "Alba",
        "Alicia",
        "Ana",
        "Andrea",
        "Antonia",
        "Beatriz",
        "Clara",
        "Diana",
        "Elena",
        "Elisa",
        "Esperanza",
        "Fátima",
        "Gabriela",
        "Inés",
        "Isabel",
        "Julia",
        "Laura",
        "María",
        "Marta",
        "Natalia",
        "Nerea",
        "Paula",
        "Rocío",
        "Sara",
        "Sofía",
        "Teresa",
        "Valentina",
        "Verónica",
        "Victoria"
    ];
    const apellidos = [

        "Abad",
        "Acuña",
        "Aguilar",
        "Aguirre",
        "Alonso",
        "Álvarez",
        "Amor",
        "Anaya",
        "Aparicio",
        "Aranda",
        "Arcos",
        "Arévalo",
        "Arias",
        "Arroyo",
        "Ayala",
        "Báez",
        "Barbosa",
        "Barrera",
        "Bautista",
        "Beltrán",
        "Bernal",
        "Blanco",
        "Bolívar",
        "Bravo",
        "Cáceres",
        "Cabrera",
        "Calderón",
        "Cano",
        "Cárdenas",
        "Carmona",
        "Carrasco",
        "Castañeda",
        "Castro",
        "Chávez",
        "Córdoba",
        "Cortés",
        "Cruz",
        "Díaz",
        "Domínguez",
        "Duran",
        "Escobar",
        "Espinoza",
        "Fajardo",
        "Fernández",
        "Flores",
        "Fuentes",
        "Gallardo",
        "Galván",
        "García",
        "Gómez",
        "González",
        "Guardado",
        "Guerrero",
        "Hernández",
        "Herrera",
        "Jiménez",
        "Lara",
        "León",
        "López",
        "Luna",
        "Machado",
        "Macías",
        "Martínez",
        "Medina",
        "Méndez",
        "Miranda",
        "Montero",
        "Mora",
        "Morales",
        "Moreno",
        "Narváez",
        "Navarro",
        "Ocampo",
        "Ortega",
        "Páez",
        "Parra",
        "Paz",
        "Pérez",
        "Peña",
        "Peralta",
        "Perez",
        "Ponce",
        "Portillo",
        "Quintero",
        "Ramírez",
        "Reyes",
        "Rivera",
        "Rocha",
        "Rodríguez",
        "Ruiz",
        "Salazar",
        "Sánchez",
        "Santana",
        "Santiago",
        "Sánchez",
        "Serrano",
        "Silva",
        "Solís",
        "Suárez",
        "Tamayo",
        "Téllez",
        "Torres",
        "Trujillo",
        "Ureña",
        "Valdez",
        "Vázquez",
        "Vega",
        "Velázquez",
        "Villa",
        "Villanueva",
        "Yáñez",
        "Zapata",
        "Zavala"

    ];

    const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
    const apellidoAleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];
  
    const precioAleatorio = Math.floor(Math.random() * (95 - 10 + 1)) + 100;
    
    let blueValue = 0;
  
    try {
      const response = await fetch("https://criptoya.com/api/dolar");
      const data = await response.json();
      blueValue = parseFloat(data.blue);
    } catch (error) {
      console.error('error', error);
    }
  
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const titulo = urlParams.get("titulo");
    const descripcion = urlParams.get("descripcion");
  
    const aleatorioDiv = document.getElementById("aleatorio");
    aleatorioDiv.innerHTML = `
      <article class="articulo">
        <img src="/images/Imagen (${id}).jpg" alt="" />
        <div class="informacion">
          <h2>${titulo}</h2>
          <div><p><b>Autor:</b></p><p>${nombreAleatorio} ${apellidoAleatorio}</p></div>
          <div><p><b>Descripción:</b></p><p class="descripcion">${descripcion}</p></div>
          <div><p><b>Precio:</b></p><p class="precio"><b>U$S ${precioAleatorio}.- (ARS $ ${precioAleatorio * blueValue}.-)</b></p></div>
          <button class="boton-comprar">Comprar</button>
          <div><p><a href="galeria.html">Volver</a></p></div>
        </div>
      </article>`;
  }
  
  // Llamar a la función para obtener y mostrar los parámetros
  obtenerParametros();
*/
