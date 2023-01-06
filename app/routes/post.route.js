const postController = require("../controllers/post.controller");
const router = require("express").Router();

router.post("/", postController.create);
router.get("/", postController.findAll);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);
router.get("/:id", postController.findOne);

module.exports = router;
