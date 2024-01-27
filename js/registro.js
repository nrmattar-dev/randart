const { createApp } = Vue

createApp({
  data() {
    return {
      //url:"https://randart.pythonanywhere.com/paises",
      url: "http://127.0.0.1:5000/paises",
      paisesFiltrados: [],
      paises: [],
      error: false,
      cargando: true,
      mostrarLista: false,
      valorSeleccionado: ''
    }
  },

  created() {
    this.fetchData(this.url)  // Invocando al método
    document.addEventListener('click', this.atenderclick);
    document.addEventListener('focusout', this.atenderfocus);
    document.addEventListener('focusin', this.atenderfocus);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.atenderclick);
    document.removeEventListener('focusout', this.atenderfocus);
    document.removeEventListener('focusin', this.atenderfocus);
  },
  methods: {
    fetchData(url) {
      // Acá se consume la Api  /productos
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.paises = data;
          this.paisesFiltrados = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true
        });
    },
    filtrarPaises(evento) {

      if (evento.target.value) {
        const filtro = evento.target.value.toLowerCase();
        this.paisesFiltrados = this.paises.filter(pais => pais.descripcion.toLowerCase().startsWith(filtro));

        if (this.paisesFiltrados.length === 0) {
          this.paisesFiltrados.push({ id: "0", descripcion: "Sin resultados" });
        }
      } else {
        this.paisesFiltrados = this.paises;
      }
    },
    validarBlur() {
      const inputCountry = document.getElementById('country');
      if (!this.paises.includes(inputCountry.value) && (inputCountry.value)) {
        inputCountry.focus();
      }
    },
    seleccionarPais(id, descripcion) {
      if (id !== "0") {
        const inputCountry = document.getElementById('country');
        this.valorSeleccionado = descripcion
        inputCountry.value = this.valorSeleccionado;

        const label = document.querySelector(`label[for="${inputCountry.id}"]`);
        if (label) {
          label.classList.add('focus');
        }

        this.ocultarLista();
      }
    },
    ocultarLista() {
      if (this.mostrarLista) {
        this.mostrarLista = false;
      }
    },
    atenderfocus(event) {

      if (event.target.tagName === 'INPUT' && event.target.type === 'text') {
        const label = document.querySelector(`label[for="${event.target.id}"]`);
        if (label) {

          label.classList.toggle('focus', event.target.value);
        }
      }
    },
    atenderclick(event) {
      
      const inputCountry = document.getElementById('country');
      const listaCtn = this.$refs.listaCtn;

      // Si el clic ocurrió dentro del input y la lista está oculta, mostrarla
      if (event.target === inputCountry && !this.mostrarLista) {
        this.mostrarLista = true;
        return;
      }

      // Si el clic ocurrió fuera de la lista, ocultarla
      if (!listaCtn.contains(event.target)) {
        this.ocultarLista();
      }

    }

  },
}).mount('#app')