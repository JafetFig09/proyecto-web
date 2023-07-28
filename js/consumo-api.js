const contenedorCartas = document.querySelector(".contenedor-cartas");
const btnCargar = document.querySelector("#btnCargar");

const api = () =>{

  contenedorCartas.innerHTML = "";
    for(let i = 0; i < 9; i++){
        let url = "https://www.themealdb.com/api/json/v1/1/random.php/images/media/meals/llcbn01574260722.jpg/preview"
        let precioAleatorio = Math.floor(Math.random() * 150);

        let precio = (precioAleatorio < 20 ) ? 85 : precioAleatorio;

        
        fetch(url)
            .then((resp) => resp.json())
            .then((data) =>{
                

                contenedorCartas.innerHTML += `<div class="col-lg-4  col-md-8 my-2 ">
                <div class="card">
                  <img src="${data.meals[0].strMealThumb}" class="card-img-top img-size" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">${data.meals[0].strMeal}</h5>
                   <div class="d-flex justify-content-between">
                    <p class="card-text ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, expedita 
                    </p>
                    <small>$${precio}</small>
                   </div>
                    <div class="d-flex justify-content-center">
                      <a href="#" class="btn btn-primary w-75 agregar-carrito" data-id="${data.meals[0].idMeal}">Agregar al carrito</a>
                    </div>
                  </div>
                </div>
              </div>`;
                // console.log(data.meals[0].strMealThumb);
                // console.log(data.meals[0].strMeal);
            })


        
    }
   
}

api();

btnCargar.addEventListener("click", () =>{
  contenedorCartas.innerHTML = "";
  api();
})