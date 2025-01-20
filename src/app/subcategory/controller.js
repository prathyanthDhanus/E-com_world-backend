const {
  createSubCategoryDb,
  getsubCategoryByCategoryIdDb,
  updateSubCategoryByIdDb,
  deleteSubCategoryByIdDb,
} = require("./services/db");

module.exports = {
  //  ===================== create sub category =========================

  createSubCategory: async (req, res) => {
    const { categoryId } = req.body;
    const files = req.files;
  
    if ((!productId ||  files.length === 0)) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }

    const images = files.map((file) => ({
      url: file.path,
      altText: file.originalname || "",
    }));

    const categoryData = { categoryId,images };
    const savecategory = await createSubCategoryDb(categoryData);
    return res.status(201).json({
      status: "success",
      message: "SubCategory created successfully ",
      data: savecategory,
    });
  },

  //  ===================== get sub category  by category =========================

  getsubCategoryByCategoryId: async (req, res) => {
    const { categoryId } = req.body;

    if (!productId) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: Category id is required",
      });
    }

    const fetchVariants = await getsubCategoryByCategoryIdDb(categoryId);
    return res.status(201).json({
      status: "success",
      message: "Successfully fetched SubCategories",
      data: fetchVariants,
    });
  },

  //  ===================== update sub category by id =========================

  updateSubCategoryById: async (req, res) => {
    const { categoryId} = req.body;
    const images = req.files;
    const subcategoryId = req.params.variantId;

    if ((!categoryId || !images)) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }

    let imageData = [];
    if (images && images.length > 0) {
      imageData = images.map((image) => ({
        url: image.path,
        altText: image.originalname,
      }));
    }

    const categoryData = {
      categoryId,
      subcategoryId,
      images: imageData,
    };
    const updateSubCategory = await updateSubCategoryByIdDb(categoryData);
    return res.status(201).json({
      status: "success",
      message: "SubCategory updated successfully ",
      data: updateSubCategory,
    });
  },

  //  ===================== delete sub category by id =========================

  deleteSubCategoryById: async (req, res) => {
    const subcategoryId = req.params.variantId;
    const removeSubCategory = await deleteSubCategoryByIdDb(subcategoryId);
    return res.status(201).json({
      status: "success",
      message: "SubCategory deleted successfully ",
      data: removeSubCategory,
    });
  },
};
