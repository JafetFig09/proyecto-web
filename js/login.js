document.getElementById('registroForm').addEventListener('submit', function(event)
{
    event.preventDefault();
    let exampleInputEmail1=document.getElementById('exampleInputEmail1').value;
    let exampleInputPassword1 = document.getElementById('exampleInputPassword1').value;

    if(!exampleInputEmail1 || !exampleInputPassword1)
    {
        Swal.fire(
            'Por favor, rellene todos los campos',
            'Presiona el boton OK',
            'warning'
          )
        
        return;
    }else{
        window.location.href="carrito.html";
    }


})