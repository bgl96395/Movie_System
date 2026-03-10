const express = require("express")
const router = express.Router()
const fav_movie_controller = require("../controller/favorite_movies_controller")

router.get("/api/fav_movies",fav_movie_controller.get_favorites)
router.post("/api/fav_movies",fav_movie_controller.add_favorite)
router.delete("/api/fav_movies/:movie_id",fav_movie_controller.remove_favorite)

module.exports = router