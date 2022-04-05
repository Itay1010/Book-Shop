'use strict'


function openDropdown() {
    const id = this.value
    if ($(`.dropdownMenuButton${id}`).is(`:visible`)) {
        $(`.dropdownMenuButton${id}`).hide();
    } else $(`.dropdownMenuButton${id}`).show()

}

function onSubmit(ev) {
    ev.preventDefault()
    const price = ev.target[0].value
    const id = ev.target[1].value
    onUpdate(id, price)
}