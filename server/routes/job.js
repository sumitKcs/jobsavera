const router = require("express").Router();
const { add, get, getById } = require("../controllers/job");

router.post("/add", add);
router.get("/get", get);
router.get("/get/:id", getById);

module.exports = router;
