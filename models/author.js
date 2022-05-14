const mongoose = require('mongoose');
// creating schema or database
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Author', authorSchema);
