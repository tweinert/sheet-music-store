const Period = require("../models/period");
const Song = require("../models/song");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all periods.
exports.period_list = asyncHandler(async (req, res, next) => {
  const allPeriods = await Period.find({}, "name")
    .sort({ name: 1 })
    .exec();
  
  res.render("period_list", { title: "Period List", period_list: allPeriods });
});

// Display detail page for a specific period.
exports.period_detail = asyncHandler(async (req, res, next) => {
  const [period, songsInPeriod] = await Promise.all([
    Period.findById(req.params.id).exec(),
    Song.find({ period: req.params.id }, "name")
      .populate("composer")
      .exec(),
  ]);
  
  if (period === null) {
    // No results
    const err = new Error("Period not found");
    err.status = 404;
    return next(err);
  }

  res.render("period_detail", {
    title: "Period Detail",
    period: period,
    period_songs: songsInPeriod,
  });
});

// Display period create form on GET.
exports.period_create_get = asyncHandler(async (req, res, next) => {
  res.render("period_form", { title: "Create Period" });
});

// Handle period create on POST.
exports.period_create_post = [
  body("name", "Name must be at least 3 characters long")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const period = new Period({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("period_form", {
        title: "Create Period",
        period: period,
        errors: errors.array(),
      }); 
      return;
    } else {
      const periodExists = await Period.findOne({ name: req.body.name })
        .exec();
      if (periodExists) {
        res.redirect(periodExists.url);
      } else {
        await period.save();
        res.redirect(period.url);
      }
    }
  })
];

// Display period delete form on GET.
exports.period_delete_get = asyncHandler(async (req, res, next) => {
  const [period, allSongsWithPeriod] = await Promise.all([
    Period.findById(req.params.id).exec(),
    Song.find({ period: req.params.id }, "name").exec(),
  ]);

  if (period === null) {
    res.redirect("/catalog/periods");
  }

  res.render("period_delete", {
    title: "Delete Period",
    period: period,
    period_songs: allSongsWithPeriod,
  });
});

// Handle period delete on POST.
exports.period_delete_post = asyncHandler(async (req, res, next) => {
  const [period, allSongsWithPeriod] = await Promise.all([
    Period.findById(req.params.id).exec(),
    Song.find({ period: req.params.id }, "name").exec(),
  ]);

  if (allSongsWithPeriod.length > 0) {
    res.render("period_delete", {
      title: "Delete Period",
      period: period,
      period_songs: allSongsWithPeriod,
    });
    return;
  } else {
    await Period.findByIdAndDelete(req.body.periodid);
    res.redirect("/catalog/periods");
  }
});

// Display period update form on GET.
exports.period_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Period update GET");
});

// Handle period update on POST.
exports.period_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Period update POST");
});
