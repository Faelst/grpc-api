const UserModel = require('../../schemas/User');

module.exports = {
  getUserById: async (call, callback) => {
    const { id } = call.request;

    const user = await UserModel.findById(id);

    return callback(null, { user: user });
  },

  createUser: async (call, callback) => {
    const { email, username, password } = call.request;

    const newUser = await UserModel.create({ email, username, password });

    return callback(null, { user: newUser });
  },

  loginUser: async (call, callback) => {
    console.log(`-- loginUser --`);
    const { username, password } = call.request;

    const user = await UserModel.findOne({ username, password });

    if (!user) {
      return callback(null, { user: 'User not found' });
    }

    if (!(await user.compareHash(password))) {
      return callback(null, { user: 'Wrong password' });
    }

    return callback(null, { user: user, token: user.generateToken(user) });
  },
};
