import datos from "../data/dataUsers.json" assert {type: "json"};

// Carga de DB
window.addEventListener("load",e=>{
    let database = localStorage.getItem("1");
    database = JSON.parse(database);
    database.forEach(usuario=>{
        datos.data.push(usuario);
    });

    console.log(datos.data);
});

let correoLogeado = localStorage.getItem("2");
document.getElementById("exampleInputEmail1").value = correoLogeado;
console.log(datos.data);

document.getElementById("form-inicio-sesion").addEventListener("submit",e=>{
    e.preventDefault();

    let formContraseña = document.getElementById("exampleInputPassword1").value;
    console.log(datos.data);

    let usuarioVerificado = actualizarContraseña(correoLogeado,formContraseña);

    if (usuarioVerificado[0]) {
        localStorage.setItem("1",JSON.stringify(datos.data));
        console.log(datos.data);
        window.location.href = "carrito.html";
    }
    else{
        Swal.fire({
            title: 'Campos incorrectos',
            text: usuarioVerificado[1],
            icon: 'error'
        })
        return;
    }
});

document.getElementById("btn-eliminar-cuenta").addEventListener("click",e=>{
    e.preventDefault();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })

    document.querySelector(".swal2-confirm").addEventListener("click",e=>{
        console.log(e)

        eliminarUsuario(correoLogeado);
    });
});

const actualizarContraseña = (formCorreo, formContraseña)=>{
    let error = [];
    
    for (const correo of datos.data) {
        if (formCorreo === correo.corrElectr) {
            correo.contraseña = formContraseña;

            error[0] = true;
        } 
        else {
            error[0] = false;
            error[1] = "No existe una cuenta registrada con el correo";
        }
    }

    return error;
}

const eliminarUsuario = (formCorreo)=>{
    let error = [];
    
    for (const correo of datos.data) {
        if (formCorreo === correo.corrElectr) {
            console.log(correo);

            let i = correo.id - 1;
            console.log(i)
            datos.data.splice(i,1);
            localStorage.setItem("1",JSON.stringify(datos.data));
            console.log(datos.data);
            window.location.href = "login.html";
        }
    }
}