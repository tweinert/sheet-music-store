const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: 'public/images/' });

// Require controller modules
const song_controller = require("../controllers/songController");
const composer_controller = require("../controllers/composerController");
const instrument_controller = require("../controllers/instrumentController");
const period_controller = require("../controllers/periodController");

// Song routes

// GET catalog home page
router.get("/", song_controller.index);

// GET request for creating a Song
router.get("/song/create", song_controller.song_create_get);

// POST request for creating a Song
router.post("/song/create", song_controller.song_create_post);

// GET request to delete Song
router.get("/song/:id/delete", song_controller.song_delete_get);

// POST request to delete Song
router.post("/song/:id/delete", song_controller.song_delete_post);

// GET request to update Song
router.get("/song/:id/update", song_controller.song_update_get);

// POST request to update Song
router.post("/song/:id/update", song_controller.song_update_post);

// GET request for one Song
router.get("/song/:id", song_controller.song_detail);

// Get request for all Songs
router.get("/songs", song_controller.song_list);

// Composer routes

// GET request for creating a Composer
router.get("/composer/create", composer_controller.composer_create_get);

// POST request for creating a Composer
router.post("/composer/create", composer_controller.composer_create_post);

// GET request to delete Composer
router.get("/composer/:id/delete", composer_controller.composer_delete_get);

// POST request to delete Composer
router.post("/composer/:id/delete", composer_controller.composer_delete_post);

// GET request to update Composer
router.get("/composer/:id/update", composer_controller.composer_update_get);

// POST request to update Composer
router.post("/composer/:id/update", composer_controller.composer_update_post);

// GET request for one Composer
router.get("/composer/:id", composer_controller.composer_detail);

// Get request for all Composers
router.get("/composers", composer_controller.composer_list);

// Instrument routes

// GET request for creating a Instrument
router.get("/instrument/create", instrument_controller.instrument_create_get);

// POST request for creating a Instrument
router.post("/instrument/create", instrument_controller.instrument_create_post);

// GET request to delete Instrument
router.get("/instrument/:id/delete", instrument_controller.instrument_delete_get);

// POST request to delete Instrument
router.post("/instrument/:id/delete", instrument_controller.instrument_delete_post);

// GET request to update Instrument
router.get("/instrument/:id/update", instrument_controller.instrument_update_get);

// POST request to update Instrument
router.post("/instrument/:id/update", instrument_controller.instrument_update_post);

// GET request for one Instrument
router.get("/instrument/:id", instrument_controller.instrument_detail);

// Get request for all Instruments
router.get("/instruments", instrument_controller.instrument_list);

// Period routes

// GET request for creating a Period
router.get("/period/create", period_controller.period_create_get);

// POST request for creating a Period
router.post("/period/create", period_controller.period_create_post);

// GET request to delete Period
router.get("/period/:id/delete", period_controller.period_delete_get);

// POST request to delete Period
router.post("/period/:id/delete", period_controller.period_delete_post);

// GET request to update Period
router.get("/period/:id/update", period_controller.period_update_get);

// POST request to update Period
router.post("/period/:id/update", period_controller.period_update_post);

// GET request for one Period
router.get("/period/:id", period_controller.period_detail);

// Get request for all Periods
router.get("/periods", period_controller.period_list);


module.exports = router;