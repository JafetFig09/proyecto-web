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

document.getElementById("form-inicio-sesion").addEventListener("submit",e=>{
    e.preventDefault();

    let formCorreo = document.getElementById("exampleInputEmail1").value.toLowerCase();
    let formContraseña = document.getElementById("exampleInputPassword1").value;

    let usuarioVerificado = comprobarUsuario(formCorreo,formContraseña);

    if (usuarioVerificado[0]) {
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

const comprobarUsuario = (formCorreo, formContraseña)=>{
    let error = [];
    
    for (const correo of datos.data) {
        if (formCorreo === correo.corrElectr) {
            if (formContraseña === correo.contraseña) {
                error[0] = true;
                return error;
            } 
            else {
                error[0] = false;
                error[1] = "La contraseña no coincide";
                return error;
            }
        } 
        else {
            error[0] = false;
            error[1] = "No existe una cuenta registrada con el correo";
        }
    }

    return error;
}