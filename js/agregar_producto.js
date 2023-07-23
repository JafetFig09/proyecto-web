"use strict"

const formNombComida = document.getElementById("nombreComida");
const formPrecioComida = document.getElementById("precioComida");
const formDescripComida = document.getElementById("descripComida");
const btnPubComida = document.getElementById("btnPublicComida");
const resultado = document.getElementById("resultado");

btnPubComida.addEventListener("click", (e) => {
    e.preventDefault(); // previene que se recargue la pagina al darle al submit

    let error = validarCampos();

    if (error[0]) {
        resultado.innerHTML = error[1];
    }
    else {
        resultado.innerHTML = "Solicitud enviada correctamente";
    }
});

const validarCampos = () => {
    let error = [];

    if (formNombComida.value.length < 5 || formNombComida.value.length > 40) {
        error[0] = true;
        error[1] = "El nombre es invalido";
        
        return error;
    }
    else if (formPrecioComida.value < 5) {
        error[0] = true;
        error[1] = "El precio debe ser minimo de $5";

        return error;
    }
    else if(formDescripComida.value === "") {
        error[0] = true;
        error[1] = "Inserte una descripción a su comida";

        return error;
    }

    error[0] = false;
    return error;
}