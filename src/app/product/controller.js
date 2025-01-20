const {
  createProductDb,
  getAllProductsByCategoryDb,
  getProductByIdDb,
  updateProductDb,
  deleteProductDb,
} = require("./services/db");

module.exports = {
  //  ===================== create product =========================

  createProduct: async (req, res) => {
    const {
      productName,
      description,
      price,
      productCode,
      brandName,
      category,
      variants,
    } = req.body;

    if (
      !productName ||
      !description ||
      !price ||
      !productCode ||
      !brandName ||
      !category
    ) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }

    const productData = {
      productName,
      description,
      price,
      productCode,
      brandName,
      category,
      variants,
    };
    const saveProduct = await createProductDb(productData);
    return res.status(201).json({
      status: "success",
      message: "Product created successfully ",
      data: saveProduct,
    });
  },

  //  ===================== get all products sub category wise =========================

  getAllProductsBySubCategory: async (req, res) => {
    const subCategoryId = req.params.subCategoryId;

    const fetchAllProducts = await getAllProductsByCategoryDb(subCategoryId);
    return res.status(200).json({
      status: "success",
      message: "Successfully fetched all products ",
      data: fetchAllProducts,
    });
  },

  //  ===================== get products by id =========================

  getProductById: async (req, res) => {
    const productId = req.params.productId;

    const fetchProduct = await getProductByIdDb(productId);
    return res.status(200).json({
      status: "success",
      message: "Successfully fetched product ",
      data: fetchProduct,
    });
  },

  //  ===================== update product by id =========================

  updateProduct: async (req, res) => {
    const productId = req.params.productId;
    const {
      productName,
      description,
      price,
      productCode,
      brandName,
      category,
      variants,
    } = req.body;

    if (
      !productName ||
      !description ||
      !price ||
      !productCode ||
      !brandName ||
      !category ||
      !variants
    ) {
      return res.status(400).json({
        status: "failure",
        message: "Missing required fields",
        error_message: "Field validation error: All fields are required",
      });
    }

    const productData = {
      productName,
      description,
      price,
      productCode,
      brandName,
      category,
      variants,
    };
    const updateProduct = await updateProductDb(productData, productId);
    return res.status(200).json({
      status: "success",
      message: "Successfully updated the product details",
      data: updateProduct,
    });
  },

  //  ===================== delete product by id =========================

  deleteProduct: async (req, res) => {
    const productId = req.params.productId;
    const removeProduct = await deleteProductDb(productId);
    return res.status(200).json({
      status: "success",
      message: "Successfully deleted the product",
      data: removeProduct,
    });
  },
};
