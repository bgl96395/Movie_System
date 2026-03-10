const express = require("express")
const router = express.Router()
const review_controller = require("../controller/review_controller")

router.get("/api/review",review_controller.show_review)
router.get("/api/review/:id",review_controller.show_review_by_id)
router.post("/api/review",review_controller.leave_review)
router.put("/api/review/:id",review_controller.update_review)
router.delete("/api/review/:id",review_controller.delete_review)

module.exports = router