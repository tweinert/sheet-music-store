const Song = require("../models/song");
const Composer = require("../models/composer");
const Instrument = require("../models/instrument");
const Period = require("../models/period");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [
    numSongs,
    numComposers,
    numInstruments,
    numPeriods,
  ] = await Promise.all([
    Song.countDocuments({}).exec(),
    Composer.countDocuments({}).exec(),
    Instrument.countDocuments({}).exec(),
    Period.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Sheet Music Store Home",
    song_count: numSongs,
    composer_count: numComposers,
    instrument_count: numInstruments,
    period_count: numPeriods,
  });
});

// Display list of all songs.
exports.song_list = asyncHandler(async (req, res, next) => {
  const allSongs = await Song.find({}, "name composer")
    .sort({ name: 1 })
    .populate("composer")
    .exec();
  
  res.render("song_list", { title: "Song List", song_list: allSongs });
});

// Display detail page for a specific song.
exports.song_detail = asyncHandler(async (req, res, next) => {
  const song = await Song.findById(req.params.id)
    .populate("composer")
    .populate("instrument")
    .populate("period")
    .exec();

  if (song === null) {
    const err = new Error("Song not found");
    err.status = 404;
    return next(err);
  }

  res.render("song_detail", {
    name: song.name,
    song: song, 
  });
});

// Display song create form on GET.
exports.song_create_get = asyncHandler(async (req, res, next) => {
  const [allComposers, allInstruments, allPeriods] = await Promise.all([
    Composer.find().sort({ family_name: 1 }).exec(),
    Instrument.find().sort({ name: 1 }).exec(),
    Period.find().sort({ name: 1 }).exec(),
  ]);

  res.render("song_form", {
    title: "Create Song",
    composers: allComposers,
    instruments: allInstruments,
    periods: allPeriods,
  });
});

// Handle song create on POST.
exports.song_create_post = [
  // convert instrument to an array
  (req, res, next) => {
    if (!Array.isArray(req.body.instrument)) {
      req.body.intrument = 
        typeof req.body.instrument === "undefined" ? [] : [req.body.instrument];
    }
    next();
  },

  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1})
    .escape(),
  body("composer", "Composer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("difficulty").escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("number_in_stock", "Number in stock must be specified.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("instrument.*").escape(),
  body("period").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const song = new Song({
      name: req.body.name,
      composer: req.body.composer,
      difficulty: req.body.difficulty,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      instrument: req.body.instrument,
      period: req.body.period,
    });

    if (!errors.isEmpty()) {
      const [allComposers, allInstruments, allPeriods] = await Promise.all([
        Composer.find().sort({ family_name: 1 }).exec(),
        Instrument.find().sort({ name: 1 }).exec(),
        Period.find().sort({ name: 1 }).exec(),
      ]);

      for (const instrument of allInstruments) {
        if (song.instrument.includes(instrument._id)) {
          instrument.checked = "true";
        }
      }
      res.render("song_form", {
        title: "Create Song",
        composers: allComposers,
        instruments: allInstruments,
        periods: allPeriods,
        song: song,
        errors: errors.array(),
      });
    } else {
      await song.save();
      res.redirect(song.url);
    }
  }),
];

// Display song delete form on GET.
exports.song_delete_get = asyncHandler(async (req, res, next) => {
  const song = await Song.findById(req.params.id).exec();

  if (song === null) {
    res.redirect("/catalog/songs");
  }

  res.render("song_delete", {
    title: "Delete Song",
    song: song,
  });
});

// Handle song delete on POST.
exports.song_delete_post = asyncHandler(async (req, res, next) => {
  const song = Song.findById(req.params.id).exec();

  await Song.findByIdAndDelete(req.body.songid);
  res.redirect("/catalog/songs");
});

// Display song update form on GET.
exports.song_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song update GET");
});

// Handle song update on POST.
exports.song_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song update POST");
});
