const mongoose = require('mongoose');

const favsSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: String,
    tags: {type: String, required: true},
    hours: String,
    location: String,
    info: String
  }
);

const Favs  = mongoose.model('Favs', favsSchema);

module.exports = Favs;
