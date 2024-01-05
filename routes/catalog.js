const express = require("express");
const router = express.Router();

// Require controller modules
const song_controller = require("../controllers/songController");
const composer_controller = require("../controller/composerController");
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
router.post("song/:id/update", song_controller.song_update_post);

// GET request for one Song
router.get("song/:id", song_controller.song_detail);

// Get request for all Songs
router.get("songs", song_controller.song_list);

module.exports = router;