const params = new URLSearchParams(location.search)
const id = params.get('id')

const apiURL = `https://striveschool-api.herokuapp.com/books/${id}`

const bookImg = document.getElementById('bookImg')
const bookTitle = document.getElementById('bookTitle')
const bookCategory = document.getElementById('bookCategory')
const bookPrice = document.getElementById('bookPrice')
const bookAsin = document.getElementById('bookAsin')

const getBook = async () => {
    try {
        const result = await fetch(apiURL)
        const data = await result.json()
        console.log(data)
        bookImg.src = data.img
        bookTitle.innerText = data.title
        bookCategory.innerText = data.category
        bookPrice.innerText = data.price
        bookAsin.innerText = data.asin
    } catch (e) {
        console.log(e)
    }
}
getBook()

