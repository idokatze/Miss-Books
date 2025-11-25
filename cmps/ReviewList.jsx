export function ReviewList({ reviews, onDeleteReview }) {
    if (!reviews.length) return <p>No reviews yet</p>

    return (
        <div className="reviews-list">
            {reviews.map((rev, idx) => (
                <div key={idx} className="review-card">
                    Reviews:
                    <h3 className="review-name">{rev.fullname}</h3>
                    <div className="review-rating">
                        {rev.rating === 'five' && '⭐️⭐️⭐️⭐️⭐️'}
                        {rev.rating === 'four' && '⭐️⭐️⭐️⭐️'}
                        {rev.rating === 'three' && '⭐️⭐️⭐️'}
                        {rev.rating === 'two' && '⭐️⭐️'}
                        {rev.rating === 'one' && '⭐️'}
                    </div>
                    <div className="review-date">
                        Purchased on: {rev.reviewDate}
                    </div>
                    <button
                        className="delete-review-btn"
                        onClick={() => onDeleteReview(idx)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}
