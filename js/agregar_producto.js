"use strict";

import { RecetaUsuario } from "./crud.js";
import datosComida from '../data/dataFood.json' assert { type: "json" };

const formNombComida = document.getElementById("nombreComida");
const formPrecioComida = document.getElementById("precioComida");
const formDescripComida = document.getElementById("descripComida");
const formComida = document.getElementById("formComida");
const resultado = document.getElementById("resultado");

formComida.addEventListener("submit", (e) => {
    e.preventDefault(); // previene que se recargue la pagina al darle al submit

    let error = validarCampos();

    if (error[0]) {
        Swal.fire({
            title: 'Campos incorrectos',
            text: error[1],
            icon: 'warning',
        })
    }
    else {
        Swal.fire({
            title: 'Datos Correctos',
            text: "Publicando su receta",
            icon: 'success',
        })

        document.querySelector(".swal2-confirm").addEventListener("click",()=>{
            agregarComida();
            formComida.reset();
        });
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

var numReceComidas = 1;

//Crud
const agregarComida = e=>{
    numReceComidas++;
    
    let id = numReceComidas;
    let nombreComida = formNombComida.value;
    let precioComida = formPrecioComida.value;
    let cantComida = document.getElementById("cantComidaDispon").value;
    let horario = document.getElementById("horarioComida").value;
    let descripcion = formDescripComida.value;

    datosComida.data.push(new RecetaUsuario(id, nombreComida, precioComida, cantComida, horario, descripcion));

    let datos = datosComida.data[numReceComidas-1].id;
    let valores = datosComida.data[numReceComidas-1];

    localStorage.setItem(datos,JSON.stringify(valores));
}