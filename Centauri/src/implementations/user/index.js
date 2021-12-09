const UserModel = require('../../schemas/User');

module.exports = {
  getUserById: async (call, callback) => {
    const { id } = call.request;

    const user = await UserModel.findById({ _id: id });

    return callback(null, { user: user });
  },

  createUser: async (call, callback) => {
    console.log(`-- createUser --`);

    const { email, username, password } = call.request.user;

    const newUser = await UserModel.create({ email, username, password });

    delete newUser._doc.password;

    return callback(null, { user: newUser });
  },

  loginUser: async (call, callback) => {
    console.log(`-- loginUser --`);

    const { username, password } = call.request.user;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return callback(null, { user: {}, token: null });
    }

    if (!(await user.compareHash(password))) {
      return callback(null, { user: {}, token: null });
    }

    delete user._doc.password;

    return callback(null, {
      id: user._id,
      user: user,
      token: user.generateToken({ id: user._id }),
    });
  },
};
