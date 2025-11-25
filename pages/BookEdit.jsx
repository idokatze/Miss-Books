import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React

const { Link, useNavigate, useParams } = ReactRouterDOM
export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        setIsLoading(true)
        bookService
            .get(bookId)
            .then((book) => setBookToEdit(book))
            .catch((err) => console.log('err:', err))
            .finally(() => setIsLoading(false))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (target.type === 'number') value = +value

        setBookToEdit((prevBook) => {
            if (field === 'price') {
                return {
                    ...prevBook,
                    listPrice: { ...prevBook.listPrice, amount: value },
                }
            }
            return { ...prevBook, [field]: value }
        })
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService
            .save(bookToEdit)
            .then((savedBook) => {
                console.log('savedBook:', savedBook)
                navigate('/book')
                showSuccessMsg('Book saved!')
            })
            .catch((err) => {
                console.log('err:', err)
                showErrorMsg('Problem saving book')
            })
    }

    const {
        title,
        listPrice: { amount: price },
    } = bookToEdit

    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className={`book-edit ${loadingClass}`}>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input
                    onChange={handleChange}
                    value={title}
                    type="text"
                    name="title"
                    id="title"
                />

                <label htmlFor="price">Price</label>
                <input
                    onChange={handleChange}
                    value={price || ''}
                    type="number"
                    name="price"
                    id="price"
                />

                <section>
                    <button>Save</button>
                    <button type="button">
                        <Link to="/book">Cancel</Link>
                    </button>
                </section>
            </form>
        </section>
    )
}
