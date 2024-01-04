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

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
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
    periodCreate(0, "Classical"),
    periodCreate(1, "Baroque"),
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
  ]);
}

async function createSongs() {
  console.log("Adding songs");
  await Promise.all([
    songCreate(0, "name",
      composers[0],
      "Beginner",
      9.95,
      10,
      [instruments[0]],
      periods[0],
      false
    ),
  ]);
}

async function createBooks() {
  console.log("Adding Books");
  await Promise.all([
    bookCreate(0,
      "The Name of the Wind (The Kingkiller Chronicle, #1)",
      "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
      "9781473211896",
      authors[0],
      [genres[0]]
    ),
    bookCreate(1,
      "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
      "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
      "9788401352836",
      authors[0],
      [genres[0]]
    ),
    bookCreate(2,
      "The Slow Regard of Silent Things (Kingkiller Chronicle)",
      "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
      "9780756411336",
      authors[0],
      [genres[0]]
    ),
    bookCreate(3,
      "Apes and Angels",
      "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
      "9780765379528",
      authors[1],
      [genres[1]]
    ),
    bookCreate(4,
      "Death Wave",
      "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
      "9780765379504",
      authors[1],
      [genres[1]]
    ),
    bookCreate(5,
      "Test Book 1",
      "Summary of test book 1",
      "ISBN111111",
      authors[4],
      [genres[0], genres[1]]
    ),
    bookCreate(6,
      "Test Book 2",
      "Summary of test book 2",
      "ISBN222222",
      authors[4],
      false
    ),
  ]);
}

async function createBookInstances() {
  console.log("Adding authors");
  await Promise.all([
    bookInstanceCreate(0, books[0], "London Gollancz, 2014.", false, "Available"),
    bookInstanceCreate(1, books[1], " Gollancz, 2011.", false, "Loaned"),
    bookInstanceCreate(2, books[2], " Gollancz, 2015.", false, false),
    bookInstanceCreate(3,
      books[3],
      "New York Tom Doherty Associates, 2016.",
      false,
      "Available"
    ),
    bookInstanceCreate(4,
      books[3],
      "New York Tom Doherty Associates, 2016.",
      false,
      "Available"
    ),
    bookInstanceCreate(5,
      books[3],
      "New York Tom Doherty Associates, 2016.",
      false,
      "Available"
    ),
    bookInstanceCreate(6,
      books[4],
      "New York, NY Tom Doherty Associates, LLC, 2015.",
      false,
      "Available"
    ),
    bookInstanceCreate(7,
      books[4],
      "New York, NY Tom Doherty Associates, LLC, 2015.",
      false,
      "Maintenance"
    ),
    bookInstanceCreate(8,
      books[4],
      "New York, NY Tom Doherty Associates, LLC, 2015.",
      false,
      "Loaned"
    ),
    bookInstanceCreate(9, books[0], "Imprint XXX2", false, false),
    bookInstanceCreate(10, books[1], "Imprint XXX3", false, false),
  ]);
}
