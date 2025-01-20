const SubCategory = require("../model/subCategorySchema");
const Product = require("../../product/model/productSchema");
const AppError = require("../../../middlewares/appError");
const cloudinary = require("../../../utils/cloudinary");

module.exports = {

    //  ===================== create sub category =========================

  createSubCategoryDb: async (categoryData) => {
    const { categoryId } = categoryData;

    const findSubCategory = await SubCategory.findOne({
      categoryId: categoryId,
    });

    if (findSubCategory) {
      throw new AppError(
        "SubCategory already exists",
        "Field validation error : A SubCategory exists",
        409
      );
    }
    const saveSubCategory = new SubCategory({
      ...categoryData,
    });
    await saveSubCategory.save();
    return saveSubCategory;
  },

 //  ===================== get sub category  by category =========================

  getsubCategoryByCategoryIdDb: async (categoryId) => {
    const findSubCategorys = await SubCategory.find({ categoryId: categoryId });

    if (findSubCategorys.length === 0) {
      throw new AppError(
        "SubCategory not found",
        "Data not found : No SubCategory available. Please add some SubCategory.",
        404
      );
    }
    return findSubCategorys;
  },

 //  ===================== update sub category by id =========================

  updateSubCategoryByIdDb: async (SubCategoryData) => {
    const { SubCategoryId, images } = SubCategoryData;
    const updateVarinat = await SubCategory.findByIdAndUpdate(
      SubCategoryId,
      { ...SubCategoryData, images: images.length > 0 ? images : undefined },
      { new: true }
    );

    if (!updateVarinat) {
      throw new AppError(
        "SubCategory not found",
        "Data not found : SubCategory does not exist.",
        404
      );
    }

    return SubCategoryData;
  },

  //  ===================== delete sub category by id =========================

  deleteSubCategoryByIdDb: async (SubCategoryId) => {
    const SubCategory = await SubCategory.findById(SubCategoryId);

    if (!SubCategory) {
      throw new AppError(
        "SubCategory not found",
        "Data not found: SubCategory does not exist.",
        404
      );
    }

    // Delete images from Cloudinary
    if (SubCategory.images && SubCategory.images.length > 0) {
      const deleteImagePromises = SubCategory.images.map(async (image) => {
        const publicId = image.url.split("/").pop().split(".")[0]; // Extract public ID from the URL
        await cloudinary.uploader.destroy(publicId); // Delete image from Cloudinary
      });

      // Wait for all images to be deleted from Cloudinary
      await Promise.all(deleteImagePromises);
    }

    const removeSubCategory = await SubCategory.findByIdAndDelete(SubCategoryId);

    if (!removeSubCategory) {
      throw new AppError(
        "SubCategory not found",
        "Data not found: SubCategory does not exist.",
        404
      );
    }

    return removeSubCategory;
  },
};
