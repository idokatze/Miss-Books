import { bookService } from '../services/book.service.js'
const { useState } = React

export function AddReview({ onAddReview, onDeleteReview }) {
    const [reviewToAdd, setReviewToAdd] = useState({
        fullname: '',
        rating: '',
        reviewDate: '',
    })

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setReviewToAdd((prev) => ({ ...prev, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        onAddReview(reviewToAdd)
        setReviewToAdd({ fullname: '', rating: '', reviewDate: '' }) // clear form
        console.log('reviewToAdd:', reviewToAdd)
    }

    return (
        <section>
            <h2>Add Review</h2>
            <form className="add-review" onSubmit={onSaveReview}>
                <div className="fullname">
                    <label htmlFor="fullname">Name: </label>
                    <input
                        onChange={handleChange}
                        value={reviewToAdd.fullname}
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="input"
                        placeholder="Enter Full Name"
                    />
                </div>

                <div className="rating">
                    <label htmlFor="rating">Enter Rating: </label>
                    <select
                        id="rating"
                        name="rating"
                        value={reviewToAdd.rating}
                        onChange={handleChange}
                    >
                        <option value="">Select rating</option>
                        <option value="five">⭐️⭐️⭐️⭐️⭐️</option>
                        <option value="four">⭐️⭐️⭐️⭐️</option>
                        <option value="three">⭐️⭐️⭐️</option>
                        <option value="two">⭐️⭐️</option>
                        <option value="one">⭐️</option>
                    </select>
                </div>

                <div className="review-date">
                    <label htmlFor="reviewDate">Purchase Date: </label>
                    <input
                        type="date"
                        id="reviewDate"
                        name="reviewDate"
                        value={reviewToAdd.reviewDate}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="add-review-btn">
                    Submit
                </button>
            </form>
        </section>
    )
}
