'use strict'

var gIsOpen = false;

$(onInit)
function onInit() {
    console.log('initing');
    createBooks()
    renderBooks()
    $('.dropdown-toggle').on('click', null, this, openDropdown)
}

function addEventListeners() {
    $('.details-btn').on('click', null, this, onDetails)
    // $('.dropdown-toggle').on('click', null, this, openDropdown)
    $('.delete-btn').on('click', null, this, onDelete)

}

function renderBooks() {
    const books = getBooksForDisplay()
    const elTable = $('.container table tbody')
    const strHtml = books.map((book) => {
        return `
        <tr>
            <td class="" ><img class="img-thumbnail" onerror="img/nun.png" src="${book.imgUrl}" alt="${book.title}"></td>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}₪</td>
            <td><button class="btn details-btn bg-primary" value="${book.id}" data-trans="btn-details">Details</button></td>
            <td>
            <div class="dropdown">
            
              <button class="btn update-btn bg-success dropdown-toggle" value="${book.id}" id="dropdownMenuButton${book.id}"
              data-bs-toggle="dropdown"
              data-trans="btn-update"
              aria-expanded="false">
                update
              </button>
              <ul class="dropdown-menu dropdownMenuButton${book.id} text-center" aria-labelledby="dropdownMenuButton${book.id}">
                <form name="update" onsubmit="onSubmit(event)">
                    <li>
                    <input type="number" class="" placeholder="Price">
                    </li>
                    <li>
                    <button class="btn submit-btn btn-light" value="${book.id}">Submit</button>
                    </li>
                </form>
              </ul>
            </div>
            </td>
            <td><button class="btn delete-btn bg-danger" value="${book.id}" data-trans="btn-delete">Delete</button></td>
        </tr>
        \n`
    })
    elTable.html(strHtml)
    addEventListeners()
    doTrans()
}

function renderModal(id) {
    const elModalSection = document.querySelector('.modal-section')
    const book = getBookById(id)
    const strHtml = `
        <button onclick="onChangeRating(value, ${book.id})" value=-1>-</button><span class="rate-num">${book.rate}</span><button onclick="onChangeRating(value, ${'' + book.id})" value=1>+</button>
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

function onAddBook(ev) {
    ev.preventDefault()
    const name = ev.target[0].value
    const price = ev.target[1].value
    if (!name || !price) return
    addBook(name, price)
    renderBooks()
    closeDropdown()
}

function onDetails(id) {
    id = id.target.value
    console.log($('.modal-nb')[0])
    if (gIsOpen) return closeModal(id)
    openModal(id)
}

function onUpdate(id, newPrice) {
    updateBook(id, newPrice)
    renderBooks()
}

function onDelete(id) {
    if (!confirm('Are you sure?')) return
    deleteBook(id)
    renderBooks()
}

function openModal(id) {
    const elModal = $('.modal-nb')
    renderModal(id)
    elModal.addClass('open')
    gIsOpen = true
}

function closeModal() {
    const elModal = $('.modal-nb')
    elModal.removeClass('open')
    $('.modal-section').html('')
    gIsOpen = false
}

function onChangeRating(val, id) {
    changeRating(val, id)
    renderModal(id)
}