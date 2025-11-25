import { bookService } from '../services/book.service.js'
import { colorByPrice } from '../services/book.service.js'
import { ReadMore } from '../cmps/ReadMore.jsx'
import { AddReview } from '../cmps/AddReview.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService
            .get(bookId)
            .then((book) => setBook(book))
            .catch((err) => {
                console.log('err:', err)
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }

    function onAddReview(reviewToAdd) {
        if (!book) return

        const updatedReviews = [...(book.reviews || []), reviewToAdd]
        const updatedBook = { ...book, reviews: updatedReviews }

        bookService
            .save(updatedBook)
            .then((savedBook) => {
                setBook(savedBook) // update state with persisted book
                showSuccessMsg('Book review saved!')
            })
            .catch((err) => {
                console.log('err:', err)
                showErrorMsg('Problem saving book review')
            })
    }

    function onDeleteReview(idxToRemove) {
        if (!book) return

        const updatedReviews = book.reviews.filter(
            (_, idx) => idx !== idxToRemove
        )
        const updatedBook = { ...book, reviews: updatedReviews }

        bookService
            .save(updatedBook)
            .then((savedBook) => {
                setBook(savedBook) // update state with persisted book
                showSuccessMsg('Review deleted!')
            })
            .catch((err) => {
                console.log('err:', err)
                showErrorMsg('Problem deleting review')
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
    // const { title, price } = book

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
            <div className="read-more">
                <ReadMore txt={book.description} length={100} />{' '}
            </div>
            <img src={book.thumbnail} alt="Book Image" />

            <AddReview
                onAddReview={onAddReview}
                onDeleteReview={onDeleteReview}
            />
            <section>
                <button>
                    <Link to={`/book/${book.prevBookId}`}>Prev</Link>
                </button>
                <button>
                    <Link to={`/book/${book.nextBookId}`}>Next</Link>
                </button>
            </section>
            <button onClick={onBack}>Back</button>
            <ReviewList reviews={book.reviews} onDeleteReview={onDeleteReview}/>
        </section>
    )
}
