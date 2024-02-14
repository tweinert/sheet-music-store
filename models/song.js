const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  composer: { type: Schema.Types.ObjectId, ref: "Composer", required: true },
  difficulty: { 
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced" ],
    default: "Beginner",
  },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
  instrument: [{ type: Schema.Types.ObjectId, ref: "Instrument"}],
  period: { type: Schema.Types.ObjectId, ref: "Period"},
  img: { type: String },

});

SongSchema.virtual("url").get(function() {
  return `/catalog/song/${this._id}`;
});

module.exports = mongoose.model("Song", SongSchema);