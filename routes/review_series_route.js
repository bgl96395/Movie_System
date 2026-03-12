const express = require("express")
const router = express.Router()
const rev_series_controller = require("../controller/review_series_controller")

router.get("/api/series/:series_id/reviews",rev_series_controller.show_review)
router.post("/api/series/:series_id/reviews",rev_series_controller.create_review)
router.put("/api/series/:series_id/reviews/:id",rev_series_controller.update_review)
router.delete("/api/series/:series_id/reviews/:id",rev_series_controller.delete_review)

module.exports = router