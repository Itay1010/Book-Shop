

const gTrans = {
    title: {
        en: 'Bookshop Manager',
        es: 'Gerente de librería',
        he: 'ניהול ספרים'
    },
    add: {
        en: 'Create new book',
        es: 'Crear nuevo libro',
        he: 'צור ספר חדש',
    },
    'filter-all': {
        en: 'All',
        es: 'Todos',
        he: 'הכל',
    },
    'filter-active': {
        en: 'Active',
        es: 'Activo',
        he: 'פעיל'
    },
    'filter-done': {
        en: 'Done',
        es: 'Completo',
        he: 'הושלם',
    },
    'btn-details': {
        en: 'Details',
        es: 'Detalles',
        he: 'פרטים',
    },
    'btn-update': {
        en: 'Update',
        es: 'Actualizar',
        he: 'עדכן',
    },
    'btn-delete': {
        en: 'Delete',
        es: 'Borrar',
        he: 'מחק',
    },
    price: {
        en: 'Are you sure?',
        es: 'Estas Seguru?',
        he: 'בטוח?',
    }
}

var gCurrLang = 'en'

function getTrans(transKey) {
    // If key is unknown return 'UNKNOWN'
    var key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // Get from gTrans
    const translate = key[gCurrLang]

    // If translation not found - use english
    if (!translate) return key['en']
    return translate
}


function doTrans() {
    const els = document.querySelectorAll('[data-trans]')

    els.forEach(el => {
        const transKey = el.dataset.trans
        const txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') el.placeholder = txt
        else el.innerText = txt
    })
}


function setLang(lang) {
    gCurrLang = lang
}


function formatNumOlder(num) {
    return num.toLocaleString('es')
}


function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}


function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}


function formatDate(time) {
    const option = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, option).format(time)
}

function nisToUsd(nis) {
    return nis / 1.609
}