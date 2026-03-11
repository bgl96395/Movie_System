const express = require("express")
const router = express.Router()
const fav_channels_controller = require("../controller/favorite_channels_controller")

router.get("/api/fav_channels",fav_channels_controller.get_favorites)
router.post("/api/fav_channels",fav_channels_controller.add_favorite)
router.delete("/api/fav_channels/:channel_id",fav_channels_controller.remove_favorite)
router.get("/api/fav_channels/:channel_id/check",fav_channels_controller.checking)

module.exports = router