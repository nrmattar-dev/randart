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
      valorSeleccionado: '',
      Modo: 'Registro',



      /* validaciones */
      datos: {
        mail: '',
        nombre: '',
        apellido: '',
        pais: '',
        ciudad: '',
        calle: '',
        numero: '',
        password: '',
        confirmacionpassword: '',
        agreeTerms: false,
        valida:
        {
          mail: true,
          nombre: true,
          apellido: true,
          pais: true,
          ciudad: true,
          calle: true,
          numero: true,
          password: true,
          confirmacionpassword: true,
          general: false
        },
        label:
        {
          mail: false,
          nombre: false,
          apellido: false,
          pais: false,
          ciudad: false,
          calle: false,
          numero: false,
          password: false,
          confirmacionpassword: false
        }
      }

    }
  },

  created() {
    this.fetchData(this.url)  // Invocando al método
  },
  beforeUnmount() {
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

    seleccionarPais(id, descripcion) {
      console.log(this.datos.pais)
      if (id !== "0") {
        this.datos.pais = descripcion;
        this.ValidarCampo('pais')
        this.ocultarLista();
      }
    },
    ocultarLista() {
      if (this.mostrarLista) {
        this.mostrarLista = false;
      }
    },

    atenderclick(event) {
      // Si el clic ocurrió dentro del input y la lista está oculta, mostrarla
      if (event.target === this.$refs.pais && !this.mostrarLista) {
        this.mostrarLista = true;
        return;
      }

      // Si el clic ocurrió fuera de la lista, ocultarla
      if (!this.$refs.pais_lista.contains(event.target)) {
        this.ocultarLista();
      }

    },
    /*
    validarCampo(campo) {
      const campos = ['mail', 'nombre', 'apellido', 'pais', 'ciudad', 'calle', 'numero', 'password', 'confirmacionpassword'];
      const regexMap = {
        mail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        nombre: /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/,
        apellido: /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/,
        //pais: /^(?!Sin resultados$).*       sin esp        /, 
        ciudad: /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/,
        calle: /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/,
        numero: /^\d+$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/,
        confirmacionpassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/ // La misma validación que para password
      };

      // Validar el campo con la expresión regular proporcionada
      this.datos.valida[campo] = regexMap[campo].test(this.datos[campo]) &&;
      this.datos.label[campo] = this.datos[campo];

      campos.forEach(campo => {
        generalValid = generalValid && this.datos.valida[campo];
      });

    },   */
    ValidarCampo(campo) {
      var regex = ''
      switch (campo) {
        case 'mail':
          regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          this.datos.valida.mail = regex.test(this.datos.mail)
          this.datos.label.mail = (this.datos.mail);
          break;
        case 'nombre':
          regex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
          this.datos.valida.nombre = regex.test(this.datos.nombre)
          this.datos.label.nombre = (this.datos.nombre);
          break;
        case 'apellido':
          regex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
          this.datos.valida.apellido = regex.test(this.datos.apellido)
          this.datos.label.apellido = (this.datos.apellido);
          break;
        case 'pais':

          this.datos.label.pais = (this.datos.pais);

          // Convertir this.datos.pais a minúsculas y eliminar espacios adicionales
          const lower_pais = this.datos.pais.trim().toLowerCase();

          // Verificar si this.paises incluye el país normalizado
          const estaIncluido = this.paises.some(pais => pais.descripcion.trim().toLowerCase() === lower_pais);
          if (!estaIncluido && lower_pais) {
            this.$refs.pais.focus();
          }
          break;
        case 'ciudad':
          regex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
          this.datos.valida.ciudad = regex.test(this.datos.ciudad)
          this.datos.label.ciudad = (this.datos.ciudad);
          break;
        case 'calle':
          regex = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
          this.datos.valida.calle = regex.test(this.datos.calle)
          this.datos.label.calle = (this.datos.calle);
          break;
        case 'numero':
          regex = /^\d+$/
          this.datos.valida.numero = regex.test(this.datos.numero)
          this.datos.label.numero = (this.datos.numero);
          break;
        case 'password':
          if (!this.datos.password) {
            console.log("La contraseña no puede estar vacía")
          }
          else {
            this.datos.valida.password = this.ValidarPassword(this.datos.password)
          }
          this.datos.label.password = (this.datos.password);
          break;
        case 'confirmacionpassword':
          console.log(`Password: ${this.datos.password}. Confirmación: ${this.datos.confirmacionpassword}`)
          this.datos.valida.confirmacionpassword = (this.datos.confirmacionpassword === this.datos.password)
          if (!this.datos.confirmacionpassword) {
            console.log("Las contraseñas no coinciden.");
          }
          else {
            this.datos.valida.confirmacionpassword = this.ValidarPassword(this.datos.confirmacionpassword)
          }
          this.datos.label.confirmacionpassword = (this.datos.confirmacionpassword);
          break;
      }

      this.datos.valida.general = (
        (this.datos.mail) &&
        (this.datos.nombre) &&
        (this.datos.apellido) &&
        (this.datos.pais) &&
        (this.datos.ciudad) &&
        (this.datos.calle) &&
        (this.datos.numero) &&
        (this.datos.password) &&
        (this.datos.confirmacionpassword) &&
        (this.datos.valida.mail === true) &&
        (this.datos.valida.nombre === true) &&
        (this.datos.valida.apellido === true) &&
        (this.datos.valida.pais === true) &&
        (this.datos.valida.ciudad === true) &&
        (this.datos.valida.calle === true) &&
        (this.datos.valida.numero === true) &&
        (this.datos.valida.password === true) &&
        (this.datos.valida.confirmacionpassword === true) &&
        (this.datos.agreeTerms === true)
      )


      function ValidarPassword(Password) {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;
        var valida = false;
        valida = regex.test(Password)
        if (!valida) {
          console.log("La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.")
          //alert("La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.");
        }
        return valida;
      }
      
    },
    Registro_Normal() {

      let usuario_json = {
        mail: this.datos.mail,
        username: this.datos.username,
        nombre: this.datos.nombre,
        apellido: this.datos.apellido,
        pais: this.datos.pais,
        ciudad: this.datos.ciudad,
        calle: this.datos.calle,
        numero: this.datos.numero,
        password: this.datos.password   
      }

      //let url = "https://randart.pythonanywhere.com/articulo_insert"
      let url = "http://127.0.0.1:5000/usuario_insert"
      var options = {
          body: JSON.stringify(usuario_json),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
      }
      fetch(url, options)
          .then(function () {
              console.log("creado")
              this.Modo = 'Verificacion'
              
          })
          .catch(err => {
              alert("Error al grabar" )
              console.error(err);
          })
    }
  },
}).mount('#app')
