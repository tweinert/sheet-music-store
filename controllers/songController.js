const Song = require("../models/song");
const Composer = require("../models/composer");
const Instrument = require("../models/instrument");
const Period = require("../models/period");

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
  res.send("NOT IMPLEMENTED: Song create GET");
});

// Handle song create on POST.
exports.song_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song create POST");
});

// Display song delete form on GET.
exports.song_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song delete GET");
});

// Handle song delete on POST.
exports.song_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song delete POST");
});

// Display song update form on GET.
exports.song_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song update GET");
});

// Handle song update on POST.
exports.song_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Song update POST");
});
