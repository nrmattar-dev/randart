const { createApp } = Vue;

const app = createApp({
   data() {
      return {
         // Inicialmente, cargaremos tanto articulos como galerias
         urls: {
            articulos: "https://randart.pythonanywhere.com/articulos",
            galerias: "https://randart.pythonanywhere.com/galerias"
         },
         datos: {
            articulos: [],
            galerias: []
         },
         error: false,
         cargando: true
      };
   },
   // Se llama después de que la instancia haya
   // terminado de procesar todas las opciones relacionadas con el estado.
   created() {
      this.fetchData('articulos');
      this.fetchData('galerias');
   },
   methods: {
      fetchData(tipo) {
         fetch(this.urls[tipo])
            .then(response => response.json())
            .then(data => {
               this.datos[tipo] = data;
               console.log("this.datos[tipo] = ",this.datos[tipo])
               this.cargando = false;
            })
            .catch(err => {
               console.error(err);
               this.error = true;
            });
      },
      articulo_prepare(id,titulo,autor,descripcion,precio,imagen) {
        // Asignar el valor al input
        
        document.getElementById('articulo_id').value = id;
        document.getElementById('titulo').value = titulo;
        document.getElementById('autor').value = autor;
        document.getElementById('descripcion').value = descripcion;
        document.getElementById('precio').value = precio;
        document.getElementById('imagen').value = imagen;
      },
      galeria_prepare(id,razon_social,mapa_url,observaciones) {
        // Asignar el valor al input
        document.getElementById('galeria_id').value = id;
        document.getElementById('razon_social').value = razon_social;
        document.getElementById('mapa_url').value = mapa_url;
        document.getElementById('observaciones').value = observaciones;
      },
      articulo_delete(id){
        articulo_delete(id)
      },
      galeria_delete(id){
        galeria_delete(id)
      }
   }
}).mount('#app');





function articulo_save()
{
    let articulo_id = parseInt(document.getElementById("articulo_id").value, 10);
    console.log("articulo_id: ",articulo_id)
    if (articulo_id==0 || isNaN(articulo_id))  {
        //Significa que es insert.
        console.log("va a insertar")
        articulo_insert()
    }
    else
    {
        console.log("va a modificar")
        articulo_update()
    }
    
}

function articulo_clear()
{
    document.getElementById("articulo_id").value = ""
    document.getElementById("titulo").value = ""
    document.getElementById("autor").value = ""
    document.getElementById("descripcion").value = ""
    document.getElementById("precio").value = ""
    document.getElementById("imagen").value  = ""
    
}

function galeria_save()
{
    let galeria_id = parseInt(document.getElementById("galeria_id").value, 10);
    console.log("galeria_id: ",galeria_id)
    if (galeria_id==0 || isNaN(galeria_id)) {
        //Significa que es insert.
        console.log("va a insertar")
        galeria_insert()
    }
    else
    {
        console.log("va a modificar")
        galeria_update()
    }
    
}

function galeria_clear()
{
    document.getElementById("galeria_id").value = ""
    document.getElementById("razon_social").value = ""
    document.getElementById("mapa_url").value = ""
    document.getElementById("observaciones").value = ""
    
}


function articulo_insert() {
    console.log("Entro a insertar")
    let titulo_ingresado = document.getElementById("titulo").value
    let autor_ingresado = document.getElementById("autor").value
    let descripcion_ingresado = document.getElementById("descripcion").value
    let precio_ingresado = document.getElementById("precio").value
    let imagen_ingresado = document.getElementById("imagen").value

    console.log(titulo_ingresado,autor_ingresado,descripcion_ingresado,precio_ingresado,imagen_ingresado);

    let articulo_json = {
        titulo: titulo_ingresado,
        autor: autor_ingresado,
        descripcion: descripcion_ingresado,
        precio: precio_ingresado,
        imagen: imagen_ingresado        
    }
    console.log(articulo_json);
    
    let url = "https://randart.pythonanywhere.com/articulo_insert"
    var options = {
        body: JSON.stringify(articulo_json),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Artículo Guardado")
            articulo_clear()
            app.fetchData('articulos');
            // Devuelve el href (URL) de la página actual
            //window.location.href = "./articulos.html";  
            
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}


function articulo_update() {
    console.log("Entro a modificar")
    let id = document.getElementById("articulo_id").value
    let titulo_ingresado = document.getElementById("titulo").value
    let autor_ingresado = document.getElementById("autor").value
    let descripcion_ingresado = document.getElementById("descripcion").value
    let precio_ingresado = document.getElementById("precio").value
    let imagen_ingresado = document.getElementById("imagen").value

    let articulo_json = {
        titulo: titulo_ingresado,
        autor: autor_ingresado,
        descripcion: descripcion_ingresado,
        precio: precio_ingresado,
        imagen: imagen_ingresado   
        
    }
    let url = "https://randart.pythonanywhere.com/articulo_update/"+id
    var options = {
        body: JSON.stringify(articulo_json),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // el navegador seguirá automáticamente las redirecciones y
        // devolverá el recurso final al que se ha redirigido.
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Artículo Modificado")
            articulo_clear()
            app.fetchData('articulos');
            //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
            //window.location.href = "./articulos.html";  
          
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al articulo_update")
        })      
}


function articulo_delete(id) {
    //let id = document.getElementById("id").value
   
    let url = "https://randart.pythonanywhere.com/articulo_delete/"+id
    var options = {
        method: 'DELETE',
        // el navegador seguirá automáticamente las redirecciones y
        // devolverá el recurso final al que se ha redirigido.
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("Eliminado")
            alert("Articulo Eliminado")
            app.fetchData('articulos');
            //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
            //window.location.href = "./galerias.html";  
          
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al articulo_delete")
        }) 
}

//-------------------------------------------------------------------------------

function galeria_insert() {

    let razon_social_ingresado = document.getElementById("razon_social").value
    let mapa_url_ingresado = document.getElementById("mapa_url").value
    let observaciones_ingresado = document.getElementById("observaciones").value

    console.log(razon_social_ingresado,mapa_url_ingresado,observaciones_ingresado);

    let galeria_json = {
        razon_social: razon_social_ingresado,
        mapa_url: mapa_url_ingresado,
        observaciones: observaciones_ingresado        
    }
    console.log(galeria_json);
    
    let url = "https://randart.pythonanywhere.com/galeria_insert"
    var options = {
        body: JSON.stringify(galeria_json),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Galería Guardada")
            galeria_clear()
            app.fetchData('galerias');
            // Devuelve el href (URL) de la página actual
            //window.location.href = "./articulos.html";  
            
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}


function galeria_update() {
    let id = document.getElementById("galeria_id").value
    let razon_social_ingresado = document.getElementById("razon_social").value
    let mapa_url_ingresado = document.getElementById("mapa_url").value
    let observaciones_ingresado = document.getElementById("observaciones").value

    let galeria_json = {
        razon_social: razon_social_ingresado,
        mapa_url: mapa_url_ingresado,
        observaciones: observaciones_ingresado   
        
    }
    let url = "https://randart.pythonanywhere.com/galeria_update/"+id
    var options = {
        body: JSON.stringify(galeria_json),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // el navegador seguirá automáticamente las redirecciones y
        // devolverá el recurso final al que se ha redirigido.
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Galería Modificada")
            galeria_clear()
            app.fetchData('galerias');
            //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
            //window.location.href = "./galerias.html";  
          
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al galeria_update")
        })      
}


function galeria_delete(id) {
    //let id = document.getElementById("id").value
   
    let url = "https://randart.pythonanywhere.com/galeria_delete/"+id
    var options = {
        method: 'DELETE',
        // el navegador seguirá automáticamente las redirecciones y
        // devolverá el recurso final al que se ha redirigido.
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("Eliminado")
            alert("Galería eliminada")
            app.fetchData('galerias');
            //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
            //window.location.href = "./galerias.html";  
          
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al galeria_delete")
        }) 
}