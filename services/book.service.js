import {
    loadFromStorage,
    makeId,
    saveToStorage,
    makeLorem,
} from './util.service.js'

import { storageService } from './async-storage.service.js'
import {books} from '../books.js'
console.log('books:', books)
export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

const BOOK_KEY = 'bookDB'

_createBooks()


function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then((books) => {
        if (filterBy.title) {
            const regExp = new RegExp(filterBy.title, 'i')
            books = books.filter((book) => regExp.test(book.title))
        }
        if (filterBy.price) {
            books = books.filter(
                (book) => book.listPrice.amount >= filterBy.price
            )
        }
        return books
    })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title, price) {
    return {
        title: title,
        description: makeLorem(20),
        thumbnail: 'https://www.coding-academy.org/books-photos/ 20.jpg',
        listPrice: {
            amount: price,
            currencyCode: 'EUR',
            isOnSale: false,
        },
    }
}

function getDefaultFilter() {
    return { title: '', price: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    console.log('books:', books)
    if (!books || !books.length) {
        books = _createBooksHardCoded()
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBooksHardCoded() {
    let idx = 1
    let newBooks = books.map((book) => {
        book.thumbnail = `../assets/img/booksImages/${idx}.jpg`
        idx++
        return book
    })
    console.log('newBooks', newBooks)
    return newBooks
}

function _createBook(title = '', price = '') {
    const book = getEmptyBook(title, price)
    book.id = makeId()
    return book
}

export function colorByPrice(book) {
    const price = book.listPrice.amount

    if (price > 150) return 'red'
    else if (price < 20) return 'green'
    else return 'black'
}

// export function isOnSale(book) {
//     if 
// }