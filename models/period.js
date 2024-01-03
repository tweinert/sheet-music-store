const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PeriodSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
});

PeriodSchema.virtual("url").get(function() {
  return `catalog/period/${this._id}`;
});

module.exports = mongoose.model("Period", PeriodSchema);