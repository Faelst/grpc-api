const CentauriService = require('../services/Centauri');

class UserController {
  async show(req, res) {
    const { id } = req.params;

    CentauriService.getUserById({ id }, (err, user) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      delete user.user.password;

      return res.json(user);
    });
  }

  async store(req, res) {
    const { username, email, password } = req.body;

    CentauriService.createUser(
      { user: { username, email, password } },
      (err, user) => {
        if (err) return res.status(400).json({ error: err });
        return res.json(user);
      }
    );
  }
}

module.exports = new UserController();
