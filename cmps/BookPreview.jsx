
import { colorByPrice } from '../services/book.service.js'

export function BookPreview({ book }) {
    const priceColor = colorByPrice(book)

    return (
        <article className="book-preview">
            <h2>Title: {book.title}</h2>
            <h3 className="on-sale">{book.listPrice.isOnSale && 'On Sale!!!'}</h3>
            <h3
                style={{
                    color: priceColor,
                }}
            >
                Price: {book.listPrice.amount}
            </h3>
            <img src={book.thumbnail} alt="Book Image" />{' '}
        </article>
    )
}
