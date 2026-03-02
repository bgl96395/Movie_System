const express = require("express")
const router = express.Router()
const cartoon_controller = require("../controller/cartoon_controller")

router.get("/api/cartoons",cartoon_controller.get_cartoons)
router.get("/api/cartoons/:id",cartoon_controller.get_cartoon_by_id)
router.post("/api/cartoons",cartoon_controller.create_cartoon)
router.put("/api/cartoons/:id",cartoon_controller.update_cartoon)
router.delete("/api/cartoons/:id",cartoon_controller.delete_cartoon)

module.exports = router