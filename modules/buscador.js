const formBusqueda = document.querySelector('#form-busqueda')
const cajaBusqueda = document.querySelector('#caja-busqueda')
const resultadoBusqueda = document.querySelector('#resultado-busqueda')
const mostrarMas = document.querySelector('#mostrar-mas')
let keyword = ''
let page = 1
const accessKey = 'ldlRt8OKYLrVkbKGHsueVMYWWNH6oyqkHNFMn7rwfEQ'
const imagesPerRow = 3
let gridItemCount = calculateGridItemCount()

function calculateGridItemCount() {
  const windowHeight = window.innerHeight
  const imageHeight = 200
  const rows = Math.ceil(windowHeight / imageHeight)
  return rows * imagesPerRow
}

async function buscarImagenes(isRandom = false) {
  let url
  if (isRandom) {
    url = `https://api.unsplash.com/photos/random?count=${gridItemCount}&client_id=${accessKey}`
  } else {
    keyword = cajaBusqueda.value
    url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=${gridItemCount}`
  }

  const response = await fetch(url)
  const data = await response.json()

  console.log(data)

  if (page === 1) {
    resultadoBusqueda.innerHTML = ''
  }

  const images = isRandom ? data : data.results

  if (images.length === 0) {
    mostrarMensajeNoEncontrado()
    mostrarMas.style.display = 'none'
    return
  }

  images.forEach((result) => {
    const imagen = document.createElement('img')
    imagen.src = isRandom ? result.urls.small : result.urls.small
    imagen.classList.add('container')
    const imagenLink = document.createElement('a')
    imagenLink.href = isRandom ? result.links.html : result.links.html
    imagenLink.target = '_blank'
    imagenLink.appendChild(imagen)
    resultadoBusqueda.appendChild(imagenLink)
    mostrarMas.style.display = 'block'
  })
}

function mostrarMensajeNoEncontrado() {
  resultadoBusqueda.innerHTML =
    '<p class="no-results-message">No se encontraron resultados. Por favor, intenta con otra búsqueda.</p>'
}

function agregarEventos() {
  formBusqueda.addEventListener('submit', (e) => {
    e.preventDefault()
    page = 1
    buscarImagenes()
  })

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      console.log('Cercano al final, cargando más imágenes...')
      page++
      buscarImagenes(cajaBusqueda.value.length === 0)
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  buscarImagenes(true)
})

export { buscarImagenes, agregarEventos }
