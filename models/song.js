const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  composer: { type: Schema.Types.ObjectId, ref: "Composer", required: true },
  difficulty: { type: String, required: true, maxLength: 100 },
  instrument: [{ type: Schema.Types.ObjectId, ref: "Instrument"}],
  period: { type: Schema.Types.ObjectId, ref: "Period"},
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
  img: { type: Buffer, required: true },
});

SongSchema.virtual("url").get(function() {
  return `catalog/song/${this._id}`;
});

module.exports = mongoose.model("Song", SongSchema);