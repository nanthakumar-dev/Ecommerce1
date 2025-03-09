export default function ListReview({ reviews }) {
    return (
        <div class="container container-fluid">
            {
                reviews && reviews.map((review,index) => (
                    <div class="reviews w-75" key={index}>
                        <h3>Other's Reviews:</h3>
                        <hr />
                        <div class="review-card my-3">
                            <div class="rating-outer">
                                <div class="rating-inner" style={{'width':`${review.rating*20}%`}}></div>
                            </div>
                            <p class="review_user">by {review.user.name}</p>
                            <p class="review_comment">{review.comment}</p>

                            <hr />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}