import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { BookDetails } from './BookDetails.jsx'

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService
            .query(filterBy) // { txt: '...', price:150 }
            .then(setBooks)
            .catch((err) => {
                console.log('err:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService
            .remove(bookId)
            .then(() => {
                console.log('bookId:', bookId)
                setBooks((books) => books.filter((book) => book.id !== bookId))
                showSuccessMsg(`Book removed successfully (${bookId})`)
            })
            .catch((err) => {
                console.log('err:', err)
                showErrorMsg('Cannot remove book')
            })
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilter(newFilterBy) {
        //{ txt: '...' }
        setFilterBy((filterBy) => ({ ...filterBy, ...newFilterBy }))
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId && (
                <React.Fragment>
                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />

                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </React.Fragment>
            )}

            {selectedBookId && (
                <BookDetails
                    bookId={selectedBookId}
                    onBack={() => setSelectedBookId(null)}
                />
            )}
        </section>
    )
}
