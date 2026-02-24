const express = require("express")
const router = express.Router()
const movie_controller = require("../controller/movie_controller")

router.get("/api/movies",movie_controller.get_movies)
router.get("/api/movies/:id",movie_controller.get_movie_by_id)
router.post("/api/movies",movie_controller.create_movies)
router.put("/api/movies/:id",movie_controller.update_movie)
router.delete("/api/movies/:id",movie_controller.delete_movie)

module.exports = router

