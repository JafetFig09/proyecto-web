document.getElementById('registroForm').addEventListener('submit', function(event)
{
    event.preventDefault();
    let exampleInputEmail1=document.getElementById('exampleInputEmail1').value;
    let exampleInputPassword1 = document.getElementById('exampleInputPassword1').value;

    if(!exampleInputEmail1 || !exampleInputPassword1)
    {
        alert('Por favor, rellene todos los campos');
        return;
    }


})