const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: String,
  email: String,
  googleId: String,
  facebookId: String,
  profileImageUrl: String,
  credits: {
    type: Number,
    default: 0
  }
});

mongoose.model('users', userSchema);
