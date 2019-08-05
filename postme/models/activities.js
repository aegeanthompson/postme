const mongoose = require('mongoose');

const activitiesSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: String,
    tags: {type: String, required: true},
  }
);

const Activities  = mongoose.model('Activities', activitiesSchema);

module.exports = Activities;
