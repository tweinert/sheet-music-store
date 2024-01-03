const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 250 },
});

InstrumentSchema.virtual("url").get(function() {
  return `catalog/instrument/${this._id}`;
});

module.exports = mongoose.model("Instrument", InstrumentSchema);