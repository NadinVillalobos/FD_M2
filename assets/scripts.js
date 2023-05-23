//Se selecciona el div de digimon-container para asignarle una variable digimonContainer para ser usado en la creacion de cartas
const digimonContainer = document.querySelector(".digimon-container")

//Se crea la funcion Buscar para obtener la informacion que se emplea en el input buscador del html, como funcion extra al dejar en blanco vuelven a aparecer todos los digimon
function buscar() {
  const nombreBuscar = document.getElementById('buscar').value
  if (document.getElementById('buscar').value == "") {
    digimonContainer.innerHTML = ''
    fetchDigimons();
  } else {
    fetchDigimonName(nombreBuscar)
  }
}

//funcion para buscar info dentro de la api y crear digimon a partir de la informacion que se recibe en buscar()
function fetchDigimonName(name) {
  fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
    .then((res) => res.json())
    .then((data) => {
      digimonContainer.innerHTML = ` 
        <div class="digimon-block" style="width: 18rem;"> 
        <img src=${data[0].img} class="imgDigimon-container"> 
        <p class="name">${data[0].name}</p>
        <p class="level">${data[0].level}</p>
        </div>`
    })
}
//funcion para obtener la data en arreglo de todos los digimon en el API y luego llamar la funcion de crear las cartas correspondientes
function fetchDigimons() {
  return fetch(`https://digimon-api.vercel.app/api/digimon`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((digimon) => {
        createDigimon(digimon);
      });
    });
}
fetchDigimons();
// deficion de la funcion de creacion de cartas de digimon
function createDigimon(digimon) {
  const card = document.createElement('div');
  card.classList.add('digimon-block');

  const spriteContainer = document.createElement('div');
  spriteContainer.classList.add('imgDigimon-container');

  const sprite = document.createElement('img');
  sprite.src = digimon.img;
  spriteContainer.appendChild(sprite);

  card.appendChild(spriteContainer);

  const name = document.createElement('p');
  name.classList.add('name');
  name.textContent = digimon.name;
  card.appendChild(name);

  const level = document.createElement('p');
  level.classList.add('level');
  level.textContent = digimon.level;
  card.appendChild(level);

  digimonContainer.appendChild(card);
}

