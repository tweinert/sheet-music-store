const Composer = require("../models/composer");
const asyncHandler = require("express-async-handler");

// Display list of all Composers.
exports.composer_list = asyncHandler(async (req, res, next) => {
  const allComposers = await Composer.find().sort({ family_name: 1 }).exec()

  res.render("composer_list", {
    title: "Composer List",
    composer_list: allComposers,
  });
});

// Display detail page for a specific composer.
exports.composer_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Composer detail: ${req.params.id}`);
});

// Display composer create form on GET.
exports.composer_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Composer create GET");
});

// Handle composer create on POST.
exports.composer_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Composer create POST");
});

// Display composer delete form on GET.
exports.composer_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Composer delete GET");
});

// Handle composer delete on POST.
exports.composer_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Composer delete POST");
});

// Display composer update form on GET.
exports.composer_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Composer update GET");
});

// Handle composer update on POST.
exports.composer_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Composer update POST");
});
