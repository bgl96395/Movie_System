const express = require("express")
const router = express.Router()
const fav_cartoons_controller = require("../controller/favorite_cartoons_controller")

router.get("/api/fav_cartoons",fav_cartoons_controller.get_favorites)
router.post("/api/fav_cartoons",fav_cartoons_controller.add_favorite)
router.delete("/api/fav_cartoons/:cartoon_id",fav_cartoons_controller.remove_favorite)
router.get("/api/fav_cartoons/:cartoon_id/check",fav_cartoons_controller.checking)

module.exports = router