import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  role: {
    type: String,
    require: true,
    minlength: 1,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

UserSchema.pre('save', function(next) {
  const user = this;
  if (user.isModified('password')) {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else next();
});

const User = mongoose.model('User', UserSchema);
export default User;
