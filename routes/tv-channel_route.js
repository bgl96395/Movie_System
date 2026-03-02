const express =require("express")
const router = express.Router()
const channel_controller = require("../controller/tv-channel_controller")

router.get("/api/tv-channel",channel_controller.get_channel)
router.get("/api/tv-channel/:id",channel_controller.get_channel_by_id)
router.post("/api/tv-channel",channel_controller.create_channel)
router.put("/api/tv-channel/:id",channel_controller.update_channel)
router.delete("/api/tv-channel/:id",channel_controller.delete_channel)

module.exports = router