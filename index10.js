// variable globales de conexion al Html
const elementList = document.querySelector("#cards-container");
let pokemonesUnicos = []
// Función asincrónica que realiza la solicitud del archivo JSON con fetch y requiere Servidor HTTP
async function fetchDataAndDisplay() {
  try {
    const url = "/pokemons.json"; // Reemplaza con la URL que tiene la ruta local del archivo JSON
    const response = await fetch(url);
    console.log("Respuesta original de FETCH al leer el JSON: ", response);
    console.log("Url procesada por FETCH al leer el Json: ", response.url);

    if (response.status === 404) {
      throw new Error(
        "Error 404 Pagina/Archivo no encontrado " + response.statusText
      );
    }

    data = await response.json(); // conversion a json
    console.log(
      "Contenido convertido a JSON dentro de la función asincrónica:",
      data
    );
    return data;
  } catch (error) {
    console.log(
      "Error en funcion asincrona en lectura de archivo: ",
      error.message
    );
    console.log(
      "Error lectura de archivo: " +
        error.cause.input +
        " es una: " +
        error.cause.code
    );
    return (
      "Error lectura de archivo: " +
      error.cause.input +
      " es una: " +
      error.cause.code
    );
  }
}

elementList.addEventListener("click", function(event) {
    console.log("valor del evento: ", event)
    if (event.target.dataset.id) {
        console.log("valor del dataset: ", event.target.dataset.id)
        const id = event.target.dataset.id
        let encontrado = pokemonesUnicos.filter((poke) => poke.id == id)
        console.log(encontrado)
        alert("Altura: "+encontrado[0].height+" Debilidades: "+encontrado[0].weakness.join(" / "))
    }
})
// ok
function listarApi(arreglo) {
  let imagen;
  let contentHtml = "";
  // ciclo para procesar solo 10 pokemones

  for (var i = 0; i < arreglo.length; i++) {
    imagen = arreglo[i].ThumbnailImage;
    contentHtml += `<div class="card" style="width: 18rem;">
      <img src="${imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">ID: ${arreglo[i].id} ${arreglo[i].name}</h5>
        <p class="card-text">Weigth: ${arreglo[i].weight} 
                          Type: ${arreglo[i].type.join(" - ")}</p>
        <a href="#" class="btn btn-primary" data-id="${arreglo[i].id}">Ver mas</a>
      </div>
    </div>`;
  }

  // actualizar contenido del DOM
  elementList.innerHTML = contentHtml;
}

function eliminaRepetidos(pokemones) {
  // Objeto auxiliar para rastrear los nombres ya vistos
  let nombresVistos = {};
  // Filtrar y eliminar objetos duplicados basados en la propiedad "nombre"
pokemonesUnicos = pokemones.filter(function (pokemon) {
    if (!nombresVistos[pokemon.name]) {
      nombresVistos[pokemon.name] = true;
      return true;
    }
    return false;
  });

  // Imprimir el arreglo resultante
  console.log("Resultado Pokemones Unicos: ", pokemonesUnicos);
  return pokemonesUnicos;
}

async function llamada_Api() {
  const datosApi = await fetchDataAndDisplay();
  console.log("Contenido fuera de la función asincrónica:", datosApi);
  // llamar a funcion que elimine repetidos de acuerdo al nombre
  const filtrados = eliminaRepetidos(datosApi);
  // llamada a la funcion que listara los datos de la api en el Html

  listarApi(filtrados);
}

// Llamar a la 1era función asincrónica
llamada_Api();
