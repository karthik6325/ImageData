const mongoose = require('mongoose');

const imageDetailSchema = new mongoose.Schema(
  {
    image: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    collection: 'imageDetail',
  }
);

module.exports = mongoose.model('imageDetail', imageDetailSchema);
