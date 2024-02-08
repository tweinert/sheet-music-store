const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const ComposerSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  nationality: { type: String, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
ComposerSchema.virtual("name").get(function() {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

ComposerSchema.virtual("date_of_birth_formatted").get(function() {
  return this.date_of_birth ? 
    DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

ComposerSchema.virtual("date_of_death_formatted").get(function() {
  return this.date_of_death ? 
    DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

ComposerSchema.virtual("lifespan").get(function() {
  return this.date_of_birth_formatted + " - " + this.date_of_death_formatted;
});

ComposerSchema.virtual("date_of_birth_yyyy_mm_dd").get(function() {
  return DateTime.fromJSDate(this.date_of_birth).toISODate()
});

ComposerSchema.virtual("date_of_death_yyyy_mm_dd").get(function() {
  return DateTime.fromJSDate(this.date_of_death).toISODate()
});

ComposerSchema.virtual("url").get(function() {
  return `/catalog/composer/${this._id}`;
});

// Export model
module.exports = mongoose.model("Composer", ComposerSchema);