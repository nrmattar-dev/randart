const { createApp } = Vue

createApp({
    data() {
        return {
            error: false,
            cargando: true,
            verificado: false,
            datos: {
                nombre: '',
                mail: ''
            }
        }
    },
    created(){

        this.VerificarUsuario()

    },
    methods: {
        VerificarUsuario() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const token = urlParams.get("token");

            const url = "http://127.0.0.1:5000/usuario_verificacion?token=" + token

            console.log(url)
            fetch(url)
                .then(response => response.json())
                .then(data => {

                    if (data.length > 0) {
                        // Obtener el correo electrónico del primer registro
                        this.datos.nombre = data[0].nombre;
                        this.datos.mail = data[0].mail;
                        this.verificado = true;
                    }
            
                    this.cargando = false
                })
                .catch(err => {
                    alert("Error al grabar")
                    console.error(err);
                    this.error = true
                });

        }

    },
}).mount('#app')