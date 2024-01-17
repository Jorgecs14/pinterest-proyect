// src/modules/buscador.js

const formBusqueda = document.querySelector('#form-busqueda')
const cajaBusqueda = document.querySelector('#caja-busqueda')
const resultadoBusqueda = document.querySelector('#resultado-busqueda')
const mostrarMas = document.querySelector('#mostrar-mas')
let keyword = ''
let page = 1
const accessKey = 'ldlRt8OKYLrVkbKGHsueVMYWWNH6oyqkHNFMn7rwfEQ'

async function buscarImagenes() {
  keyword = cajaBusqueda.value
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`
  const response = await fetch(url)
  const data = await response.json()

  console.log(data)

  if (page === 1) {
    resultadoBusqueda.innerHTML = ''
  }

  data.results.map((result) => {
    const imagen = document.createElement('img')
    imagen.src = result.urls.small
    imagen.classList.add('container')
    const imagenLink = document.createElement('a')
    imagenLink.href = result.links.html
    imagenLink.target = '_blank'
    imagenLink.appendChild(imagen)
    resultadoBusqueda.appendChild(imagenLink)
    mostrarMas.style.display = 'block'
  })
}

function agregarEventos() {
  formBusqueda.addEventListener('submit', (e) => {
    e.preventDefault()
    page = 1
    buscarImagenes()
  })

  mostrarMas.addEventListener('click', () => {
    page++
    buscarImagenes()
  })
}

export { buscarImagenes, agregarEventos }
