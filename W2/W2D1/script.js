// KEY API PEXELS: xBcgcwgrvydiYT2yg4pU29KdcWXSIP4hqJNixqiZFAYtREwc32BKNyLQ 
// Eseguire una fetch al link https://api.pexels.com/v1/search?query=INSERISCIQUERY
// Generare card per ogni immagine .forEach e appenderli al DOM 
// Funzione con parametro immagine e creare il DOM necessario
// Funzione all'evento click cattura il valore dell'input e richiama getImages

const apiKey = 'xBcgcwgrvydiYT2yg4pU29KdcWXSIP4hqJNixqiZFAYtREwc32BKNyLQ';

const imageRow = document.getElementById('imagesRow')
const btnSearch = document.getElementById('btnSearch')
const inputSearch = document.getElementById('inputSearch')
/* METODO FETCH 1
const getPhotosFromPexels = (search = 'nature') => {
    const apiUrl = `https://api.pexels.com/v1/search?query=${search}`;

    fetch (apiUrl, {
        headers: {
            Authorization: apiKey
        }
    })
    .then(result => result.json())
    .then(photos => console.log(photos))
    .catch(error=> console.log(error))
}
getPhotosFromPexels() 
*/

// METODO FETCH 2
async function getImagesFromPexels(search = 'nature') {
    try {
        const apiUrl = `https://api.pexels.com/v1/search?query=${search}`;
        const result = await fetch(apiUrl, {
            headers: {
                Authorization: apiKey
            }
        })
        const data = await result.json()
        showImages(data.photos)
        // qui potrei aggiungere un'altra fetch
    } catch (e) {
        console.log(e)
    }
}
getImagesFromPexels()

const showImages = (images) => {
    imageRow.innerHTML = ""
    const imagesCard = images.map(image => createCard(image)) //qui è come se ci fosse scritto return dopo la freccia se non metto le graffe
    imagesCard.forEach(card => imageRow.appendChild(card))
}

const createCard = (image) => {
    const col = document.createElement('div')
    col.classList.add('col-3')

    const card = document.createElement('div')
    card.classList.add('card')
    col.appendChild(card)

    const imgCard = document.createElement('img')
    imgCard.classList.add('card-img-top')
    imgCard.src = image.src.large
    imgCard.alt = image.alt
    card.appendChild(imgCard)

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    card.appendChild(cardBody)

    const pCard = document.createElement('p')
    pCard.classList.add('card-text')
    pCard.innerText = image.photographer
    cardBody.appendChild(pCard)

    return col
}

btnSearch.addEventListener('click', (e) => {
    e.preventDefault()
    const searchString = inputSearch.value
    getImagesFromPexels(searchString)
})