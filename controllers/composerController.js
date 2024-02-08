const composer = require("../models/composer");
const Composer = require("../models/composer");
const Song = require("../models/song");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  const [composer, allSongsByComposer] = await Promise.all([
    Composer.findById(req.params.id).exec(),
    Song.find({ composer: req.params.id }, "name")
      .populate("instrument")
      .populate("period")
      .exec(),
  ]);

  if (composer === null) {
    const err = new Error("Composer not found");
    err.status = 404;
    return next(err);
  }

  res.render("composer_detail", {
    name: composer.first_name,
    composer: composer,
    composer_songs: allSongsByComposer,
  });
});

// Display composer create form on GET.
exports.composer_create_get = asyncHandler(async (req, res, next) => {
  res.render("composer_form", { title: "Create Composer"});
});

// Handle composer create on POST.
exports.composer_create_post = [
  body("first_name", "First name field must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("family_name", "Family name field must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("nationality", "Invalid nationality.")
    .optional({ values: "falsy" })
    .trim()
    .isAlphanumeric()
    .escape(),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const composer = new Composer({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      nationality: req.body.nationality,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      res.render("composer_form", {
        title: "Create Composer",
        composer: composer,
        errors: errors.array(),
      });
      return;
    } else {
      await composer.save();
      res.redirect(composer.url);
    }
  }),
];

// Display composer delete form on GET.
exports.composer_delete_get = asyncHandler(async (req, res, next) => {
  const [composer, allSongsByComposer] = await Promise.all([
    Composer.findById(req.params.id).exec(),
    Song.find({ composer: req.params.id }, "name").exec(),
  ]);

  if (composer === null) {
    res.redirect("/catalog/composers");
  }

  res.render("composer_delete", {
    title: "Delete Composer",
    composer: composer,
    composer_songs: allSongsByComposer,
  });
});

// Handle composer delete on POST.
exports.composer_delete_post = asyncHandler(async (req, res, next) => {
  const [composer, allSongsByComposer] = await Promise.all([
    Composer.findById(req.params.id).exec(),
    Song.find({ composer: req.params.id }, "name").exec(),
  ]);

  if (allSongsByComposer.length > 0) {
    res.render("composer_delete", {
      title: "Delete Composer",
      composer: composer,
      composer_songs: allSongsByComposer,
    });
    return;
  } else {
    await Composer.findByIdAndDelete(req.body.composerid);
    res.redirect("/catalog/composers");
  }
});

// Display composer update form on GET.
exports.composer_update_get = asyncHandler(async (req, res, next) => {

  const composer = await Composer.findById(req.params.id).exec();

  if (composer === null) {
    const err = new Error("Composer not found");
    err.status = 404;
    return next(err);
  }

  res.render("composer_form", {
    title: "Update Composer",
    composer: composer,
  });
});

// Handle composer update on POST.
exports.composer_update_post = [

  body("first_name", "First name field must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("family_name", "Family name field must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("nationality", "Invalid nationality.")
    .optional({ values: "falsy" })
    .trim()
    .isAlphanumeric()
    .escape(),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const composer = new Composer({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      nationality: req.body.nationality,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("composer_form", {
        title: "Update Composer",
        composer: composer,
        errors: errors.array(),
      });
      return; 
    } else {
      const updatedComposer = await Composer.findByIdAndUpdate(req.params.id, 
        composer, {});
      res.redirect(updatedComposer.url);
    }
  }),
];
