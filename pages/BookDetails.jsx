import { bookService } from '../services/book.service.js'
import { colorByPrice } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService
            .get(bookId)
            .then((book) => setBook(book))
            .catch((err) => {
                console.log('err:', err)
            })
    }

    function getVintage() {
        const yearsOld = new Date().getFullYear() - book.publishedDate

        if (yearsOld > 10) return 'Vintage Book'
        else if (yearsOld < 1) return 'New Book'
        else return ''
    }

    function getReadLevel() {
        const pageCount = book.pageCount

        if (pageCount > 500) return 'Serious Reading'
        else if (pageCount > 200) return 'Descent Reading'
        else return 'Light Reading'
    }

    if (!book) return <div>Loading...</div>
    const { title, price } = book

    const readLevel = getReadLevel()
    const vintageLevel = getVintage()
    const textColor = colorByPrice(book)

    return (
        <section className="book-details container">
            <h1>Book Title: {book.title}</h1>
            <h2 className="on-sale">
                {book.listPrice.isOnSale && 'On Sale!!!'}
            </h2>

            <h2>
                Book Price:{' '}
                <span
                    style={{
                        color: textColor,
                    }}
                >
                    {book.listPrice.amount}
                </span>
            </h2>
            <h3>{readLevel}</h3>
            <h4>{vintageLevel}</h4>
            <p>{book.description}</p>
            <img src={book.thumbnail} alt="Book Image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}
