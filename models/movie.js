const mongoose = require('mongoose');
const npmvalidator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const isValid = npmvalidator.isURL(v);
        return isValid;
      },
      message: 'Некорректная ссылка на картинку',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const isValid = npmvalidator.isURL(v);
        return isValid;
      },
      message: 'Некорректная ссылка на трейлер',
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const isValid = npmvalidator.isURL(v);
        return isValid;
      },
      message: 'Некорректная ссылка на трейлер',
    },
  },
  movieId: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
