import datos from "../data/dataUsers.json" assert {type: "json"};
import { DataBase } from "./crud.js";


// Carga de DB
window.addEventListener("load",e=>{
    let database = localStorage.getItem("1");
    database = JSON.parse(database);
    database.forEach(usuario=>{
        datos.data.push(usuario)
    });

    console.log(datos.data)
});

document.getElementById("form-registro").addEventListener("submit", function(event)
{
    event.preventDefault();
    let formNombre= document.getElementById("input-nombre").value;
    let formApellPat= document.getElementById("input-apellido-paterno").value;
    let formApellMat=document.getElementById("input-apellido-materno").value;
    let formCorreo=document.getElementById("input-correo").value.toLowerCase();
    let formContraseña=document.getElementById("input-contraseña").value;
    let formCiudad= document.getElementById("input-ciudad").value;

    let correoVerificado = verificarCorreo(formCorreo);

    if(!formNombre || !formApellPat || !formApellMat || !formCorreo || !formContraseña || !formCiudad)
    {
        Swal.fire({
            title: 'Campos incorrectos',
            text: "Por favor, verifique que los datos esten ingresados",
            icon: 'warning'
        })
        return;
    }
    else {
        if (correoVerificado[0]) {
            Swal.fire({
                title: 'Campos incorrectos',
                text: correoVerificado[1],
                icon: 'warning'
            })
            return;
        }

        Swal.fire({
            title: "Datos Correctos",
            text: "Usted ha sido registrado",
            icon: 'success'
        })

        document.querySelector(".swal2-confirm").addEventListener("click",()=>{
            agregarUsuario(formNombre,formApellPat,formApellMat,formCorreo,formContraseña,formCiudad);
            console.log(datos.data)
            this.reset();
            // formComida.submit();
        }); 
    }
});

const agregarUsuario = (nombre,apellidoP,apellidoM,correo,contraseña,ciudad) => {
    let id = datos.data.length;
    id++;
    
    datos.data.push(new DataBase(id,nombre,apellidoP,apellidoM,correo,contraseña,ciudad));
    localStorage.setItem("1",JSON.stringify(datos.data));
    console.log(datos.data)
}

const verificarCorreo = (formCorreo)=>{
    let error = [];
    
    datos.data.forEach(correo => {
        if (formCorreo == correo.corrElectr) {
            error[0] = true;
            error[1] = "Ya hay una cuenta registrada con el mismo correo";
        }
        else {
            error[0] = false;
        }
    });

    return error;
}

/*
{
            "id" : 1,
            "nombre" : "Jacobo",
            "apellPat" : "Gonzalez",
            "apellMat" : "Ordoñez",
            "corrElectr" : "jacobogonzalez@hotmail.com",
            "contraseña" : "12345",
            "ciudad" : "Osaka"
        }

*/