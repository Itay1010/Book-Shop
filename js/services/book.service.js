'use strict'

var gBooks

function getBooksForDisplay() {
    return gBooks
}

function getBookById(searchId) {
    return gBooks.find((book) => book.id === '' + searchId)
}

function addBook(name, price) {
    const newBook = _createBook(name, price)
    gBooks.push(newBook)
    _saveBooks()
}

function updateBook(searchId, newPrice){
    const book = getBookById(searchId)
    book.price = +newPrice
    _saveBooks()
}

function deleteBook(searchId) {
    const bookIdx = gBooks.findIndex((book) => book.id === searchId)
    gBooks.splice(bookIdx, 1)
    _saveBooks()
}

function changeRating(val, id) {
    const book = getBookById(id)
    if(book.rate === 0 && val === '-1' || book.rate === 10 && val === '1') return
    const currRate = parseInt(book.rate)
    const newRate = currRate + parseInt(val)
    book.rate = newRate
    _saveBooks()
}

function _saveBooks() {
    saveToStorage('booksDB', gBooks)
}

function createBooks() {
    const books = loadFromStorage('booksDB')
    if (!books || !books.length) {
        gBooks = [_createBook('Dune', getRandomNumber()), _createBook('Neuromancer', getRandomNumber())]
        _saveBooks()
    } else gBooks = books
}

function _createBook(name, price) {
    return {
        id: _makeId(4),
        title: name,
        price: price,
        rate: 0,
        imgUrl: `img/${name}.jpg`
    }
}

function _makeId(length = 5) {
    var txt = ''
    const possible = '0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getRandomNumber(upto = 100) {
    return (Math.random() * upto).toFixed(2)
}