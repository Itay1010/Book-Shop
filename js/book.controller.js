'use strict'

var gIsModalOpen = false

function onInit() {
    createBooks()
    renderBooks()
}

function renderBooks() {
    const books = getBooksForDisplay()
    const elTable = document.querySelector('.table-container table tbody')
    const strHtml = books.map((book) => {
        return `
        <tr>
            <td><img onerror="img/Dune.jpg" src="${book.imgUrl}" alt="${book.title}"></td>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}₪</td>
            <td><button onclick="onDetails(value)" value="${book.id}">Details</button></td>
            <td><button onclick="onUpdate(value)" value="${book.id}">Update</button></td>
            <td><button onclick="onDelete(value)" value="${book.id}">Delete</button></td>
        </tr>
        \n`
    })
    elTable.innerHTML = strHtml.join('')
}

function renderModal(id) {
    const elModalSection = document.querySelector('.modal section')
    const book = getBookById(id)
    const strHtml = `
        <button onclick="onChangeRating(value, ${book.id})" value=-1>-</button><span class="rate-num">${book.rate}</span><button onclick="onChangeRating(value, ${book.id})" value=1>+</button>
        <img onerror="this.src='img/Dune.jpg'" src="${book.imgUrl}" alt="${book.title}">
        <h4>Name: ${book.title}</h4>
        <h4>Price: ${book.price}₪</h4>
        <hr>
        <h5>Description</h5>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem a cum perspiciatis hic saepe at voluptate
            laborum, obcaecati unde facere deleniti velit consequatur aliquam temporibus cumque quo explicabo
            praesentium quam?
        </p>
        `
    elModalSection.innerHTML = strHtml
}

function onAddBook() {
    const name = prompt('Enter book name')
    const price = +prompt('Enter book price')
    if(!name || !price) return
    addBook(name, price)
    renderBooks()
}

function onDetails(id) {
    if (gIsModalOpen) return closeModal()
    openModal(id)
}

function onUpdate(id) {
    const newPrice = prompt('Enter new price')
    const reg = new RegExp('[0-9]+.?[0-9]?')
    if(reg.test(newPrice)) {
        updateBook(id, newPrice)
        renderBooks()
    } else alert('incorrect price value')
}
function onDelete(id) {
    if (!confirm('Are you sure?')) return
    deleteBook(id)
    renderBooks()
}

function openModal(id) {
    const elModal = document.querySelector('.modal')
    renderModal(id)
    elModal.classList.add('open')
    gIsModalOpen = true
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('open')
    elModal.querySelector('section').innerHTML = ''
    gIsModalOpen = false
}

function onChangeRating(val, id) {
    changeRating(val, id)
    renderModal(id)
}