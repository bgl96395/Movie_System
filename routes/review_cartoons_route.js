const express = require("express")
const router = express.Router()
const rev_cartoons_controller = require("../controller/review_cartoons_controller")

router.get("/api/cartoons/:cartoon_id/reviews",rev_cartoons_controller.show_review)
router.post("/api/cartoons/:cartoon_id/reviews",rev_cartoons_controller.create_review)
router.put("/api/cartoons/:cartoon_id/reviews/:id",rev_cartoons_controller.update_review)
router.delete("/api/cartoons/:cartoon_id/reviews/:id",rev_cartoons_controller.delete_review)

module.exports = router