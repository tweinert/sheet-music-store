const Instrument = require("../models/instrument");
const Song = require("../models/song");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all instruments.
exports.instrument_list = asyncHandler(async (req, res, next) => {
  const allInstruments = await Instrument.find({}, "name description")
    .sort({ name: 1 })
    .exec();
  
  res.render("instrument_list", { title: "Instrument List", instrument_list: allInstruments });
});

// Display detail page for a specific instrument.
exports.instrument_detail = asyncHandler(async (req, res, next) => {
  const [instrument, songsWithInstrument] = await Promise.all([
    Instrument.findById(req.params.id).exec(),
    Song.find({ instrument: req.params.id }, "name")
      .populate("composer")
      .exec(),
  ]);

  if (instrument === null) {
    const err = new Error("Instrument not found");
    err.status = 404;
    return next(err);
  }

  res.render("instrument_detail", {
    title: "Instrument Detail",
    instrument: instrument,
    instrument_songs: songsWithInstrument,
  });
});

// Display instrument create form on GET.
exports.instrument_create_get = asyncHandler(async (req, res, next) => {
  res.render("instrument_form", { title: "Create Instrument" });
});

// Handle instrument create on POST.
exports.instrument_create_post = [
  // validate and sanitize the name field
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const instrument = new Instrument({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("instrument_form", {
        title: "Create Instrument",
        instrument: instrument,
        errors: errors.array(), 
      });
      return;
    } else {
      const instrumentExists = await Instrument.findOne({ name: req.body.name})
        .exec();
      if (instrumentExists) {
        res.redirect(instrumentExists.url);
      } else {
        await instrument.save();
        res.redirect(instrument.url);
      }
    }
  })
];

// Display instrument delete form on GET.
exports.instrument_delete_get = asyncHandler(async (req, res, next) => {
  const [instrument, allSongsWithInstrument] = await Promise.all([
    Instrument.findById(req.params.id).exec(),
    Song.find({ instrument: req.params.id }, "name").exec(),
  ]);

  if (instrument === null) {
    res.redirect("/catalog/instruments");
  }

  res.render("instrument_delete", {
    title: "Delete Instrument",
    instrument: instrument,
    instrument_songs: allSongsWithInstrument,
  });
});

// Handle instrument delete on POST.
exports.instrument_delete_post = asyncHandler(async (req, res, next) => {
  const [instrument, allSongsWithInstrument] = await Promise.all([
    Instrument.findById(req.params.id).exec(),
    Song.find({ instrument: req.params.id }, "name").exec(),
  ]);

  if (allSongsWithInstrument.length > 0) {
    res.render("instrument_delete", {
      title: "Delete Instrument",
      instrument: instrument,
      instrument_songs: allSongsWithInstrument,
    });
    return; 
  } else {
    await Instrument.findByIdAndDelete(req.body.instrumentid);
    res.redirect("/catalog/instruments");
  }
});

// Display instrument update form on GET.
exports.instrument_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument update GET");
});

// Handle instrument update on POST.
exports.instrument_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument update POST");
});
