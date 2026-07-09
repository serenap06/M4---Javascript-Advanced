// Creare una funzione che fa la fetch dall'API 
// Creare una funzione che cicla i risultati ricevendo come parametro l'array delle canzoni 
// Creare una funzione che data una canzone come parametro crea la card nell'HTML 
const searchBox = document.getElementById('searchResults')
const searchBtn = document.getElementById('button-search')
const searchInput = document.getElementById('searchField')

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const searchValue = searchInput.value
    getSongs(searchValue)
})

function getSongs(search = 'eminem') {
    const urlApi = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${search}`

    fetch(urlApi)
        .then(result => result.json())
        .then(songs => listSongs(songs.data))
        .catch(error => console.log(error))
}
getSongs()

function listSongs(songs) {
    searchBox.innerHTML = ""
    songs.forEach(song => {
        const card = cardSongs(song)
        searchBox.appendChild(card)
    });
}


function cardSongs(song) {
    // <div class="card" style="width: 18rem;">
    //     <img src="..." class="card-img-top" alt="...">
    //         <div class="card-body">
    //             <h5 class="card-title">Card title</h5>
    //             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    //             <a href="#" class="btn btn-primary">Go somewhere</a>
    //         </div>
    // </div>

    const col = document.createElement('div')
    col.classList.add('col-4', 'my-3')

    const card = document.createElement('div')
    card.classList.add('card', 'h-100')
    col.appendChild(card)

    const img = document.createElement('img')
    img.classList.add('card-img-top', 'img-fluid', 'w-100')
    img.src = song.album.cover_small
    card.appendChild(img)

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between')
    card.appendChild(cardBody)

    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-title', 'text-dark')
    cardTitle.innerText = song.title
    cardBody.appendChild(cardTitle)

    const cardText = document.createElement('p')
    cardText.classList.add('card-text', 'text-dark', 'fs-5')
    cardText.innerHTML = song.artist.name
    cardBody.appendChild(cardText)

    const cardBtn = document.createElement('a')
    cardBtn.classList.add('btn', 'btn-block', 'btn-success')
    cardBtn.innerText = 'Play'
    cardBtn.href = song.link
    cardBody.appendChild(cardBtn)

    return col
}