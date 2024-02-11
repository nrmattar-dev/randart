function construye_header() {
    
    var currentPagePath = window.location.pathname;
    var ImagenesPath = (currentPagePath === "/index.html" ? 'images' : '../images') + "/"
    var RecursosPath = (currentPagePath === "/index.html" ? 'templates/' : '') 
    var IndexPath = (currentPagePath === "/index.html" ? '' : '../') 

    const header = document.getElementById("header");
    header.innerHTML = `

    <div class="logo">
        <a href="index.html">
        <img src="${ImagenesPath}Logo.png" alt="" />

        <span class="title">Randart</span>
        </a>
        <button id="abrir" class="abrir-menu"><i class="fa-solid fa-bars"></i></button>
        <button id="cerrar" class="cerrar-menu"><i class="fa-solid fa-x"></i></button>
    </div>


    <nav class="header-linea" id="menu">

        <ul>
            <li><a class="menu_link" href="${IndexPath}index.html"><img src="${ImagenesPath}Logo.png" alt="" />Inicio</a></li>
            <li><a class="menu_link" href="${RecursosPath}galeria.html"><img src="${ImagenesPath}Logo.png" alt="" />Galeria</a></li>
            <li><a class="menu_link" href="${RecursosPath}directorio.html"><img src="${ImagenesPath}Logo.png" alt="" />Directorio</a></li>
            <li><a class="menu_link" href="${RecursosPath}subituobra.html"><img src="${ImagenesPath}Logo.png" alt="" />Subí tu obra</a></li>
            <!--<li><a class="menu_link" href="${RecursosPath}crud.html"><img src="${ImagenesPath}Logo.png" alt="" />CRUD</a></li>-->
        </ul>

    </nav>    
    `;

    const query_menu = document.querySelector("#menu");
    const query_abrir = document.querySelector("#abrir");
    const query_cerrar = document.querySelector("#cerrar");
    const query_header = document.querySelector("#header");

    query_abrir.addEventListener("click", () => {
        query_menu.classList.add("visible");
        query_cerrar.classList.add("visible");
        query_abrir.classList.remove("visible");
        query_abrir.classList.add("invisible");
        query_header.classList.add("activo");
    })

    query_cerrar.addEventListener("click", () => {
        query_menu.classList.remove("visible");
        query_cerrar.classList.remove("visible");
        query_cerrar.classList.add("invisible");
        query_abrir.classList.add("visible");
        query_header.classList.remove("activo");
    })
}

function construye_footer() {
    const footer = document.getElementById("footer");
    footer.innerHTML = `

    <h3>Seguinos</h3>
    <ul class="seguinos">
        <li><a href="https://twitter.com/" class="icon brands style2 fa-twitter" target="_blank">
                <span class="label">Twitter</span></a></li>
        <li><a href="https://www.facebook.com/?locale=es_LA" class="icon brands style2 fa-facebook-f" target="_blank">
                <span class="label">Facebook</span></a></li>
        <li><a href="https://www.instagram.com/" class="icon brands style2 fa-instagram" target="_blank">
                <span class="label">Instagram</span></a></li>
        <li><a href="mailto:nrmattar@gmail.com" class="icon solid style2 fa-envelope" target="_blank">
                <span class="label">Email</span></a></li>
    </ul>
    <p class="copyright">&copy; Randart. Todos los derechos reservados</p>

    `;

}


function construye_head() {

    var currentPagePath = window.location.pathname;
    var Path = (currentPagePath === "/index.html" ? 'images' : '../images') + "/"

    // Crea el elemento head
    var head = document.head;

    // Crea los elementos meta
    var metaCharset = document.createElement("meta");
    metaCharset.charset = "UTF-8";

    var metaViewport = document.createElement("meta");
    metaViewport.name = "viewport";
    metaViewport.content = "width=device-width, initial-scale=1.0";

    var metaKeywords = document.createElement("meta");
    metaKeywords.name = "keywords";
    metaKeywords.content = "arte, galeria, fotos, pinturas, coleccion";

    var metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Galeria de arte";

    // Crea el elemento link para el icono
    var linkIcon = document.createElement("link");
    linkIcon.rel = "shortcut icon";
    linkIcon.href = Path+"logo.ico";
    linkIcon.type = "image/x-icon";

    // Crea los elementos link para los estilos
    // Obtengo la ruta de la página actual
    var currentPagePath = window.location.pathname;
    
    var cssFilePath = (currentPagePath === "/index.html" ? 'css' : '../css') + "/randart.css"

    // Crea el elemento link para el archivo CSS
    var linkStylesheet = document.createElement("link");
    linkStylesheet.rel = "stylesheet";
    linkStylesheet.href = cssFilePath;


    // Crea el elemento script para FontAwesome
    var scriptFontAwesome = document.createElement("script");
    scriptFontAwesome.src = "https://kit.fontawesome.com/0a26ed8765.js";
    scriptFontAwesome.crossOrigin = "anonymous";

    // Crea el elemento Title
    /*
    var title = document.createElement("title");
    title.innerText = 'RANDART'
    */

    // Añade todos los elementos al head
    //head.appendChild(title);
    head.appendChild(metaCharset);
    head.appendChild(metaViewport);
    head.appendChild(metaKeywords);
    head.appendChild(metaDescription);
    head.appendChild(linkIcon);
    head.appendChild(linkStylesheet);
    head.appendChild(scriptFontAwesome);
}

// Llama a la función cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
    construye_head()
    construye_header();
    construye_footer();
});