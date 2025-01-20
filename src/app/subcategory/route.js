const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/multer");
const tryCatch = require("../../middlewares/tryCatch");
const authMiddleware = require("../../middlewares/authMiddleware");
const SubCategory = require("./controller");

router.post(
  "/",
  authMiddleware(["admin"]),
  upload.array("images", 5),
  tryCatch(SubCategory.createSubCategory)
);

router.get(
  "/category",
  authMiddleware(["admin","user"]),
  tryCatch(SubCategory.getsubCategoryByCategoryId)
);

router.put(
  "/:subcategoryId",
  authMiddleware(["admin"]),
  upload.array("images", 5),
  tryCatch(SubCategory.updateSubCategoryById)
);

router.delete(
  "/:subcategoryId",
  authMiddleware(["admin"]),
  tryCatch(SubCategory.deleteSubCategoryById)
);

module.exports = router;
