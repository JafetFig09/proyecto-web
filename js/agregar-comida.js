//datos guardar
const nombreComida = document.querySelector("#nombreComida");
const precioComida = document.querySelector("#precioComida");
const cantidadDisponible = document.querySelector("#cantComidaDispon");
const descripcionComida = document.querySelector("#descripComida");
const imagenComida = document.querySelector("#imagenComida");

//datos editar
const editIndex = document.querySelector("#editIndex");
const editNombreComida = document.querySelector("#editNombreComida");
const editPrecioComida = document.querySelector("#editPrecioComida");
const editCantidadDisponible = document.querySelector("#editCantComidaDispon");
const editDescripcionComida = document.querySelector("#editDescripComida");
const editImagenComida = document.querySelector("#editImagenComida");

const formularioGuardar = document.querySelector("#formAdd");
const formularioEditar = document.querySelector("#formEdit");
let arrayData = [];

// Cargar datos desde el localStorage si existen
const storedData = localStorage.getItem("productos");
if (storedData) {
  arrayData = JSON.parse(storedData);
  imprimirdatos();
}

if (formularioGuardar) {
  formularioGuardar.addEventListener("submit", (event) => {
    event.preventDefault();

    const objetoComida = {
      nombre: nombreComida.value,
      precio: precioComida.value,
      imagen:imagenComida.value,
      cantidadDisp: cantidadDisponible.value,
      descripcion: descripcionComida.value, 
    };

    arrayData.push(objetoComida);

    // Guardar los datos en el localStorage
    localStorage.setItem("productos", JSON.stringify(arrayData));

    imprimirdatos();
    limpiarformulario();
  });
}

if (formularioEditar) {
  formularioEditar.addEventListener("submit", (event) => {
    event.preventDefault();
    const objetoComida = {
      nombre: editNombreComida.value,
      precio: editPrecioComida.value,
      imagen:editImagenComida.value,
      cantidadDisp: editCantidadDisponible.value,
      descripcion: editDescripcionComida.value,
    };
    editarElemento(editIndex.value, objetoComida);
  });
}

function limpiarformulario() {
  nombreComida.value = "";
  precioComida.value = "";
  cantidadDisponible.value = "";
  imagenComida.value = "";
  descripcionComida.value = "";
}

function imprimirdatos() {
  let datosTabla = document.querySelector("#datos-tabla");

  if (datosTabla) {
    datosTabla.innerHTML = "";
    let templateTabla = "";

    arrayData.forEach((item, index) => {
      templateTabla += `
        <tr>
            <th>${item.nombre}</th>
            <td>$ ${item.precio}</td>
            <td>${item.cantidadDisp}</td>
            <td>
                
                <img class="img-fluid" src="${item.imagen}" alt="${item.nombre}" width="60">
            </td>
            <td>
                <button class="btn btn-warning btn-edit" data-index="${index}"  data-bs-toggle="modal"  data-bs-target="#exampleModal">
                    <i class='bx bxs-edit'></i>
                </button>
                <button class="btn btn-danger btn-delete" data-index="${index}">
                    <i class='bx bxs-trash-alt' ></i>
                </button>
            </td>
        </tr>
        `;
    });

    datosTabla.innerHTML = templateTabla;
  }
}

function eliminarElemento(index) {
  if (index >= 0 && index < arrayData.length) {
    // Eliminar el elemento del array por su índice
    arrayData.splice(index, 1);

    // Actualizar el localStorage después de eliminar el elemento
    localStorage.setItem("productos", JSON.stringify(arrayData));

    // Volver a imprimir los datos actualizados
    imprimirdatos();
    
  }
}

function cargarDatosEnFormulario(index) {
  // Verificar que el índice sea válido
  if (index >= 0 && index < arrayData.length) {
    const objetoComida = arrayData[index];

    // Cargar los datos del objeto en el formulario
    editNombreComida.value = objetoComida.nombre;
    editPrecioComida.value = objetoComida.precio;
    editCantidadDisponible.value = objetoComida.cantidadDisp;
    editImagenComida.value = objetoComida.imagen;
    editDescripcionComida.value = objetoComida.descripcion;
    editIndex.value = index;
  }
}

function editarElemento(index, objetoComidaEditado) {
  if (index >= 0 && index < arrayData.length) {
    // Actualizar los datos del objeto en el array
    arrayData[index] = objetoComidaEditado;

    // Actualizar el localStorage con los datos editados
    localStorage.setItem("productos", JSON.stringify(arrayData));

    // Volver a imprimir los datos actualizados
    imprimirdatos();
   
  }
}





document.addEventListener("click", function (e) {
  // Verifica si el elemento clickeado tiene la clase 'btn-delete'
  if (e.target.classList.contains("btn-delete")) {
    console.log(e.target.getAttribute("data-index"));
    const indexItem = e.target.getAttribute("data-index");
    eliminarElemento(indexItem);
  }
  if (e.target.classList.contains("btn-edit")) {
    console.log("boton para editar oprimido");
    const indexItemEdit = e.target.getAttribute("data-index");
    cargarDatosEnFormulario(indexItemEdit);
  }
});
