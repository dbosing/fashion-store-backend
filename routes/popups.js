const express = require("express");
const router = express.Router();
const popupsController = require("../controllers/popupsController");

router.get("/", popupsController.getAllPopups);
router.get("/:id", popupsController.getPopupById);
router.post("/", popupsController.createPopup);
router.put("/:id", popupsController.updatePopup);
router.delete("/:id", popupsController.deletePopup);

module.exports = router;
