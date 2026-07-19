// Creare una homepage che mostri tutti i libri con delle card di bootstrap
// Aggiungere un pulsante "Aggiungi al carrello" e uno per "saltare" un prodotto
// Aggiungere una sezione per il carrello e aggiungere un bordo/badge per mostrare che sia stata aggiunta
// Aggiungere un input di testo per cercare i libri, quando l'utente scrive più di 3 caratteri, filtra già il risultato.


//EXTRA:
// Aggiungere una funzione che permetta di cancellare i libri dal carrello
// Aggiungere una funzione che conta i prodotti nel carrello e mostra il risultato nella sezione carrello
// Aggiungere un pulsante per svuotare il carrello


const booksRow = document.getElementById('booksRow')
const btnSearch = document.getElementById('btnSearch')
const inputSearch = document.getElementById('inputSearch')
const btnCart = document.getElementById('btnCart')

let allBooks = []
let cartBooks = []

// metodo fetch con arrow function 
const getBooks = async () => {
    const apiURL = `https://striveschool-api.herokuapp.com/books`
    try {
        const result = await fetch(apiURL)
        const data = await result.json()
        console.log(data)
        allBooks = data
        displayBooks(data)
    } catch (e) {
        console.log(e)
    }
}

getBooks()

// funzione che crea le card usando come parametri solo alcune proprietà dell'array
const createBookCards = ({ title, img, price, category, asin }) => {

    //    <div class="card" style="width: 18rem;">
    //   <img src="..." class="card-img-top" alt="...">
    //   <div class="card-body">
    //     <h5 class="card-title">Card title</h5>
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    //   </div>
    //   <div class="card-body">
    //     <a href="#" class="card-link">Card link</a>
    //     <a href="#" class="card-link">Another link</a>
    //   </div>
    // </div> 

    const col = document.createElement('div')
    col.setAttribute('class', 'col-4 col-md-3 col-lg-2 m-2')

    const cardBook = document.createElement('div', 'h-100')
    cardBook.classList.add('card', 'h-100', 'w-100')
    col.appendChild(cardBook)

    const cardImg = document.createElement('img')
    cardImg.classList.add('card-img-top', 'img-thumbnail', 'h-50')
    cardImg.src = img
    cardImg.alt = title
    cardBook.appendChild(cardImg)

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between', 'h-50')
    cardBook.appendChild(cardBody)

    const cardBookTitle = document.createElement('h5')
    cardBookTitle.classList.add('card-title', 'fs-6')
    cardBookTitle.innerText = title
    cardBody.appendChild(cardBookTitle)

    const cardBookCategory = document.createElement('p')
    cardBookCategory.classList.add('card-text')
    cardBookCategory.innerText = category
    cardBody.appendChild(cardBookCategory)

    const cardBookPrice = document.createElement('p')
    cardBookPrice.classList.add('card-text')
    cardBookPrice.innerText = `€ ${price}`
    cardBody.appendChild(cardBookPrice)

    const cardBodyBtn = document.createElement('div')
    cardBodyBtn.classList.add('card-body', 'd-flex', 'justify-content-between', 'align-items-center')
    cardBook.appendChild(cardBodyBtn)

    const addToCartBtn = document.createElement('button')
    addToCartBtn.classList.add('btn', 'text-dark')
    addToCartBtn.innerHTML = '<i class="bi bi-bag-plus"></i>'
    cardBodyBtn.appendChild(addToCartBtn)

    // funzione click per modificare il badge del carrello e aggiungere i libri all'array del carrello

    let isAdded = false
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault()
        isAdded = !isAdded
        const iconCart = addToCartBtn.querySelector('i')
        iconCart.classList.toggle('bi-bag-check-fill', isAdded)
        iconCart.classList.toggle('bi-bag-plus', !isAdded)

        if (isAdded === true) {
            cartBooks.push(
                {
                    img: img,
                    title: title,
                    price: `€ ${price}`,
                    asin: asin
                })
        } else {
            cartBooks = cartBooks.filter((book) => book.asin !== asin)
        }
    })

    const jumpBtn = document.createElement('button')
    jumpBtn.classList.add('btn', 'text-dark', 'text-decoration-none')
    jumpBtn.innerText = 'Salta'
    cardBodyBtn.appendChild(jumpBtn)

    jumpBtn.addEventListener('click', () => {
        col.remove()
    })

    const detailsBtn = document.createElement('a')
    detailsBtn.classList.add('card-link', 'text-dark')
    detailsBtn.innerText = 'Dettagli'
    detailsBtn.href = `details.html?id=${asin}`
    cardBodyBtn.appendChild(detailsBtn)

    return col
}

// funzione che appende le card alla row usando il metodo .map() e lo spread operator 
const displayBooks = (books) => {
    booksRow.innerHTML = ''
    const cardBooks = books.map(book => createBookCards(book))
    // bookCards.forEach(card => booksRow.appendChild(card))
    booksRow.append(...cardBooks)
}

// funzione che filtra i risultati
btnSearch.addEventListener('click', (e) => {
    e.preventDefault()
    const bookSearch = inputSearch.value.trim().toLowerCase()
    const bookFiltered = allBooks.filter(book => book.title.toLowerCase().includes(bookSearch))
    displayBooks(bookFiltered)
})

// funzione che crea il carrello
const createCart = () => {
    /* <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div> */
    const modal = document.createElement('div')
    modal.classList.add('modal', 'fade')
    modal.tabIndex = '-1'
    modal.id = 'cartModal'

    const cartModal = document.createElement('div')
    cartModal.classList.add('modal-dialog')
    modal.appendChild(cartModal)

    const cartModalContent = document.createElement('div')
    cartModalContent.classList.add('modal-content')
    cartModal.appendChild(cartModalContent)

    const cartModalHeader = document.createElement('div')
    cartModalHeader.classList.add('modal-header')
    cartModalContent.appendChild(cartModalHeader)

    const cartModalTitle = document.createElement('h5')
    cartModalTitle.classList.add('modal-title')
    cartModalTitle.innerText = 'Il tuo Carrello'
    cartModalHeader.appendChild(cartModalTitle)

    const closeCartModalBtn = document.createElement('button')
    closeCartModalBtn.classList.add('btn-close')
    closeCartModalBtn.type = 'button'
    closeCartModalBtn.setAttribute('data-bs-dismiss', 'modal')
    cartModalHeader.appendChild(closeCartModalBtn)

    const cartModalBody = document.createElement('div')
    cartModalBody.classList.add('modal-body')
    cartModalContent.appendChild(cartModalBody)

    const cartList = document.createElement('ul')
    cartList.classList.add('list-group')
    cartList.id = 'cartList'
    cartModalBody.appendChild(cartList)

    const cartModalFooter = document.createElement('div')
    cartModalFooter.classList.add('modal-footer', 'd-flex', 'justify-content-between')
    cartModalContent.appendChild(cartModalFooter)

    const cleanCartBtn = document.createElement('button')
    cleanCartBtn.classList.add('btn', 'btn-light')
    cleanCartBtn.innerText = 'Svuota il carrello'
    cartModalFooter.appendChild(cleanCartBtn)

    cleanCartBtn.addEventListener('click', () => {
        cartBooks = []
        cartList.innerHTML = '<li class="ist-group-item text-center">Il tuo carrello è vuoto</li>'
    })

    const goToPaymentBtn = document.createElement('button')
    goToPaymentBtn.classList.add('btn', 'btn-primary')
    goToPaymentBtn.innerText = 'Procedi al pagamento'
    cartModalFooter.appendChild(goToPaymentBtn)

    return modal
}

const modalElement = createCart()
document.body.appendChild(modalElement)

// funzione che mostra il carrello al click del bottone

btnCart.addEventListener('click', () => {
    const cartList = document.getElementById('cartList')
    cartList.innerHTML = ''
    if (cartBooks.length === 0) {
        cartList.innerHTML = '<li class="ist-group-item text-center">Il tuo carrello è vuoto</li>'
    } else {
        cartBooks.forEach((book) => {
            cartList.classList.add('d-flex', 'justify-content-between')

            const li = document.createElement('li')
            li.innerText = `${book.title} - ${book.price}`
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between')
            cartList.appendChild(li)
            const trashBookBtn = document.createElement('btn')
            trashBookBtn.innerText = 'x'
            trashBookBtn.classList.add('btn', 'btn-circle', 'bg-danger', 'text-center', 'h-25')
            li.appendChild(trashBookBtn)

            trashBookBtn.addEventListener('click', () => {
                cartBooks = cartBooks.filter(cartBook => cartBook.asin !== book.asin)
                li.remove()
                if (cartBooks.length === 0) {
                    cartList.innerHTML = '<li class="ist-group-item text-center">Il tuo carrello è vuoto</li>'
                }
            })
        })
    }
    const showCartModal = new bootstrap.Modal(document.getElementById('cartModal'))
    showCartModal.show()
})

//const createCartBookRow = () => {}


// const addToCart = (book) => {
//     const cartBook = cartBooks.find(cartBook => cartBook.asin === book.asin)
//     if (cartBook){
//        cartBook.quantity ++;
//     } else {
//         cartBooks.push({...book, quantity:1})
//     }
// } 

// crea