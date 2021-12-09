const CentauriService = require('../services/Centauri');
const { promisify } = require('util');
class SessionController {
  async store(req, res) {
    const { username, password } = req.body;

    CentauriService.loginUser(
      { user: { username, password } },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
  }
}

module.exports = new SessionController();
