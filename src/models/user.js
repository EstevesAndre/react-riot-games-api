const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
  {
    darkMode: { type: Boolean, default: false },
    favorites: { type: [String], default: [] },
    recentSearch: { type: [String], default: [] },
  },
  { timestamps: true },
)

module.exports = mongoose.model('users', User)