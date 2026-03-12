const express =require("express")
const router = express.Router()
const rev_channel_controller = require("../controller/review_channels_controller")

router.get("/api/tv-channel/:channel_id/reviews",rev_channel_controller.show_review)
router.post("/api/tv-channel/:channel_id/reviews",rev_channel_controller.create_review)
router.put("/api/tv-channel/:channel_id/reviews/:id",rev_channel_controller.update_review)
router.delete("/api/tv-channel/:channel_id/reviews/:id",rev_channel_controller.delete_review)

module.exports = router