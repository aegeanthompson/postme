const mongoose = require('mongoose');

const activitiesSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: String,
    tags: {type: String, required: true},
    date/time: String,
    location: String,
    info: String
  }
);

const Activities  = mongoose.model('Activities', activitiesSchema);

module.exports = Activities;
