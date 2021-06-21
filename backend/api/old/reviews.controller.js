import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            // get info from body of request
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            // get new date
            const date = new Date()
            // put data tg and send over to to db
            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date,
            )
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }
    // method that gets info from body, send over to db
    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()
            // get user id bc making sure user who created review is updating review
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date,
            )

            var{error} = reviewResponse
            if (error) {
                res.status(400).json({error})
            }
            // if mod count = 0 -> not updated and throw error
            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to review - user may not be original poster",
                )
            }
                res.json({ status: "success"})
            } catch (e) {
                res.status(500).json({error:e.message})
            }
        }
        static async apiDeleteReview(req, res, next) {
            try {
                // have a query  parameter instead of a body
                const reviewId = req.query.id
                // checking the user who created is the one deleting before deleting
                const userId = req.body.user_id
                console.log(reviewId)
                // call delete review and send over review and user id
                const reviewResponse = await ReviewsDAO.deleteReview(
                    reviewId,
                    userId,
                )
                res.json({ status:"success"})
            } catch (e) {
                res.status(500).json({error:e.message})
        }

    }

}