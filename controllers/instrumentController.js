const Instrument = require("../models/instrument");
const Song = require("../models/song");
const asyncHandler = require("express-async-handler");

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
  res.send("NOT IMPLEMENTED: Instrument create GET");
});

// Handle instrument create on POST.
exports.instrument_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument create POST");
});

// Display instrument delete form on GET.
exports.instrument_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument delete GET");
});

// Handle instrument delete on POST.
exports.instrument_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument delete POST");
});

// Display instrument update form on GET.
exports.instrument_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument update GET");
});

// Handle instrument update on POST.
exports.instrument_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instrument update POST");
});
