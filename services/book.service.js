import {
    loadFromStorage,
    makeId,
    saveToStorage,
    makeLorem,
} from './util.service.js'

import { storageService } from './async-storage.service.js'
import { books } from '../books.js'
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
        if (filterBy.text) {
            const regExp = new RegExp(filterBy.text, 'i')
            books = books.filter((book) => {
                return (
                    regExp.test(book.title) ||
                    regExp.test(book.authors) ||
                    book.categories.some((cat) => regExp.test(cat))
                )
            })
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
    return storageService
        .get(BOOK_KEY, bookId)
        .then((book) => _setNextPrevBookId(book))
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

function getEmptyBook() {
    return {
        title: '',
        description: makeLorem(20),
        thumbnail: 'https://www.coding-academy.org/books-photos/ 20.jpg',
        listPrice: {
            amount: '',
            currencyCode: 'EUR',
            isOnSale: false,
        },
        reviews: [],
    }
}

function getDefaultFilter() {
    return { title: '', price: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = _createBooksHardCoded()
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBooksHardCoded() {
    let idx = 1
    let newBooks = books.map((book) => {
        book.thumbnail = `../assets/img/booksImages/${idx}.jpg`
        book.reviews = []
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

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1]
            ? books[bookIdx - 1]
            : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}
