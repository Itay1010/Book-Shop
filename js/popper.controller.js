'use strict'


function openDropdown(ev) {
    ev.stopPropagation()
    var id = (this.id === 'dropdownMenuButtonAdd') ? 'Add' : this.value
    if ($(`.dropdownMenuButton${id}`).is(`:visible`)) {
        $(`.dropdownMenuButton${id}`).hide();
    } else $(`.dropdownMenuButton${id}`).show()

}

function closeDropdown(ev) {
    $(`.dropdownMenuButtonAdd`).hide()
}

function onSubmit(ev) {
    ev.preventDefault()
    const price = ev.target[0].value
    const id = ev.target[1].value
    debugger
    onUpdate(id, price)
}