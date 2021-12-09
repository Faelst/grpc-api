const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },
  generateToken({ id }) {
    return jwt.sign({ id }, 'salt123', { expiresIn: '1h' });
  },
};

UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, 'salt123', { expiresIn: '1h' });
  },
};

const UserModel = model('User', UserSchema);

module.exports = UserModel;
