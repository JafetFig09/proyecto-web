//Variables 

const carrito = document.querySelector("#carrito");
const listaComida = document.querySelector("#lista-comida");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarcarrito = document.querySelector("#vaciar-carrito");
const iconCarrito = document.querySelector("#iconoCarrito");

let comidaCarrito = [];

cargarEventListenners();
 

function cargarEventListenners(){
    listaComida.addEventListener("click", agregarComida)

    //Elimina cursos del carrito

    carrito.addEventListener("click", eliminarComida)

    //Vaciar el carrito

    vaciarcarrito.addEventListener("click", () =>{
        comidaCarrito = [];
        limpiarHTML();
        iconCarrito.classList.remove('fill-car');
    })
}

//Funciones 

function agregarComida(e){

    e.preventDefault();

   
    
    if(e.target.classList.contains("agregar-carrito")){

        const comidaSeleccionada = e.target.parentElement.parentElement.parentElement;
       
        leerDatosComida( comidaSeleccionada );
    }
   
}

//Elimina una comida del carrito
function eliminarComida( e ){

    
  
    if( e.target.classList.contains("borrar-comida")){
       // console.log(e.target.parentElement.getAttribute("data-id"));

       const comidaId = e.target.parentElement.getAttribute("data-id");
 
       console.log(comidaId);

       //Elimina del arreglo de comida por el data-id

       comidaCarrito = comidaCarrito.filter(comida => comida.id !== comidaId)

       carritoHTML();
    }
}

//Lee el contenido del HTML al dar click 

function leerDatosComida ( comidaSelecionada ){

    //console.log( comidaSelecionada );

    const infoComida = {
        imagen: comidaSelecionada.querySelector("img").src,
        nombre: comidaSelecionada.querySelector("h5").textContent,
        precio: comidaSelecionada.querySelector("small").textContent,
        id: comidaSelecionada.querySelector("a").getAttribute("data-id"),
        cantidad:1
    }

   // console.log(infoComida);

   //Revisa si un elemento ya existe en el carrito

   const existe = comidaCarrito.some( comida => comida.id === infoComida.id );
    
   if( existe ){
    //Actualizamos cantidad
    const comidas = comidaCarrito.map( comida => {
        if( comida.id === infoComida.id ){
            comida.cantidad++;
            return comida;//retorna el objeto actualizado
        }else{
            return comida;//retorna los elementos que no son los duplicados
        }
    });

    comidaCarrito = [...comidas];
   }else{
    comidaCarrito = [...comidaCarrito, infoComida]
   }

    //Agraga elementos al arrego comidaCarrito

   

    console.log( comidaCarrito )

    carritoHTML( ); //itera sobre el carrito y elimina su HTML

}

//Muestra el carrito en el HTML 

function carritoHTML (  ) {
    
    //Limpiar HTML
    limpiarHTML();
  
    if(comidaCarrito.length === 0){
        iconCarrito.classList.remove('fill-car');
    }else{
        iconCarrito.classList.add('fill-car');
    }
  

    comidaCarrito.forEach( comida => {

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>
            <img src="${comida.imagen}" width="55"/>
        </td>
        <td>
            ${comida.nombre}
        </td>
        <td>
            ${comida.precio}
        </td>
        <td>${comida.cantidad}</td>
        <td>
            <a href="#" data-id="${comida.id}"><i class='bx bx-x-circle borrar-comida'></i></a>
        </td>
        `;

        // Agrega el continedo del carrito al tbody
        contenedorCarrito.appendChild(row);
    })

}

//Limpia la comida del tbody 
function limpiarHTML (){
    contenedorCarrito.innerHTML = "";
}