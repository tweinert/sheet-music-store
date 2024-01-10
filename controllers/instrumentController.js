const Instrument = require("../models/instrument");
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
  res.send(`NOT IMPLEMENTED: Instrument detail: ${req.params.id}`);
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
