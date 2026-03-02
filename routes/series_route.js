const express = require("express")
const router = express.Router()
const series_controller = require("../controller/series_controller")

router.get("/api/series",series_controller.get_series)
router.get("/api/series/:id",series_controller.get_series_by_id)
router.post("/api/series",series_controller.create_series)
router.put("/api/series/:id",series_controller.update_series)
router.delete("/api/series/:id",series_controller.delete_series)

module.exports = router