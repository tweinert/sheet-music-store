#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Song = require("./models/song");
const Composer = require("./models/composer");
const Instrument = require("./models/instrument");
const Period = require("./models/period");

const periods = [];
const instruments = [];
const composers = [];
const songs = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createPeriods();
  await createInstruments();
  await createComposers();
  await createSongs();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function periodCreate(index, name) {
  const period = new Period({ name: name });
  await period.save();
  periods[index] = period;
  console.log(`Added period: ${name}`);
}

async function instrumentCreate(index, name, description) {
  const instrumentDetail = {
    name: name,
    description: description,
  };

  const instrument = new Instrument(instrumentDetail);
  await instrument.save();
  instruments[index] = instrument;
  console.log(`Added instrument: ${imprint}`);
}

async function composerCreate(index, first_name, family_name, nationality, d_birth, d_death) {
  const composerDetail = { first_name: first_name, family_name: family_name };
  if (nationality != false) composerDetail.nationality = nationality;
  if (d_birth != false) composerDetail.date_of_birth = d_birth;
  if (d_death != false) composerDetail.date_of_death = d_death;

  const composer = new Composer(composerDetail);

  await composer.save();
  composers[index] = composer;
  console.log(`Added composer: ${first_name} ${family_name}`);
}

async function songCreate(index, name, composer, difficulty, price, 
    number_in_stock, instrument, period, img) {
  const songDetail = {
    name: name,
    composer: composer,
    difficulty: difficulty,
    price: price,
    number_in_stock: number_in_stock,
  };
  if (instrument != false) songDetail.instrument = instrument;
  if (period != false) songDetail.period = period;
  if (img != false) songDetail.img = img;

  const song = new Song(songDetail);
  await song.save();
  songs[index] = song;
  console.log(`Added song: ${name}`);
}

async function createPeriods() {
  console.log("Adding periods");
  await Promise.all([
    periodCreate(0, "Baroque"),
    periodCreate(1, "Classical"),
    periodCreate(2, "Romantic"),
  ]);
}

async function createInstruments() {
  console.log("Adding instruments");
  await Promise.all([
    instrumentCreate(0, "Piano", "description"),
    instrumentCreate(1, "Violin", "description"),
    instrumentCreate(2, "Guitar", "description"),
    instrumentCreate(3, "Cello", "description"),
    instrumentCreate(4, "Orchestra", "description"),
  ]);
}

async function createComposers() {
  console.log("Adding composers");
  await Promise.all([
    composerCreate(0, "Johann", "Bach", "German", "1685-03-21", false),
    composerCreate(1, "Ludwig", "Beethoven", false, "1770-12-17", "1827-03-26"),
    composerCreate(2, "Frederic", "Chopin", "Polish", "1810-03-01", "1849-10-17"),
    composerCreate(3, "Wolfgang", "Mozart", "Austrian", "1756-01-27", "1791-12-05"),
    composerCreate(4, "Pyotr", "Tchaikovsky", "Russian", false, false),
    composerCreate(5, "Antonio", "Vivaldi", "Italian", "1678-03-04", "1741-07-28"),
    composerCreate(6, "Test", "Composer", false, false, false),
  ]);
}

async function createSongs() {
  console.log("Adding songs");
  await Promise.all([
    songCreate(0,
      "Cello Suite no. 1 in G major",
      composers[0],
      "Beginner",
      9.95,
      10,
      [instruments[3]],
      periods[0],
      false
    ),
    songCreate(1,
      "Moonlight Sonata",
      composers[1],
      "Intermediate",
      15.00,
      5,
      [instruments[0]],
      periods[1],
      false
    ),
    songCreate(2,
      "Symphony No. 5 in C minor",
      composers[1],
      "Intermediate",
      21.95,
      12,
      [instruments[1], instruments[3], instruments[4]],
      periods[1],
      false
    ),
    songCreate(3,
      "Nocturne no. 20 in C-Sharp Minor",
      composers[2],
      "Intermediate",
      12.50,
      23,
      [instruments[0]],
      periods[2],
      false
    ),
    songCreate(4,
      "Concerto No. 4 in F Minor",
      composers[5],
      "Advanced",
      8.95,
      5,
      [instruments[1]],
      periods[0],
      false
    ),
    songCreate(5,
      "Test Song 1",
      composers[6],
      "Beginner",
      0.00,
      0,
      false,
      false,
      false
    ),
  ]);
}