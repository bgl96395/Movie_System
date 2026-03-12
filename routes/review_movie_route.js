const express = require("express")
const router = express.Router()
const rev_movies_controller = require("../controller/review_movie_controller")

router.get("/api/movies/:movie_id/reviews",rev_movies_controller.show_review)
router.post("/api/movies/:movie_id/reviews",rev_movies_controller.create_review)
router.put("/api/movies/:movie_id/reviews/:id",rev_movies_controller.update_review)
router.delete("/api/movies/:movie_id/reviews/:id",rev_movies_controller.delete_review)

module.exports = router