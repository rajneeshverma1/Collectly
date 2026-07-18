const express = require("express");
const reminderController = require("../controllers/reminderController");
const { requireAuth } = require("../middleware/clerkAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", reminderController.getConfigurations);
router.post("/", reminderController.createConfiguration);
router.put("/:id", reminderController.updateConfiguration);
router.delete("/:id", reminderController.deleteConfiguration);

module.exports = router;
