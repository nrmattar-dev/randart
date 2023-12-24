const menu = document.querySelector("#menu");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const header = document.querySelector("#header");

abrir.addEventListener("click", () => {
    menu.classList.add("visible");
    cerrar.classList.add("visible");
    abrir.classList.remove("visible");
    abrir.classList.add("invisible");
    header.classList.add("activo");
})

cerrar.addEventListener("click", () => {
    menu.classList.remove("visible");
    cerrar.classList.remove("visible");
    cerrar.classList.add("invisible");
    abrir.classList.add("visible");
    header.classList.remove("activo");
})