const express = require("express")
const router = express.Router()
const fav_series_controller = require("../controller/favorite_series_controller")

router.get("/api/fav_series",fav_series_controller.get_favorites)
router.post("/api/fav_series",fav_series_controller.add_favorite)
router.delete("/api/fav_series/:series_id",fav_series_controller.remove_favorite)
router.get("/api/fav_series/:series_id/check",fav_series_controller.checking)

module.exports = router