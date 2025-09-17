const mongoose = require('mongoose');

const listSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Referência ao modelo User
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
      default: '#ffffff', // Cor padrão
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model('List', listSchema);

module.exports = List;
