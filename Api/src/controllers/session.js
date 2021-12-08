const CentauriService = require('../services/Centauri');
const { promisify } = require('util');
class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    CentauriService.loginUser({ user: { email, password } }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.json(result);
      }
    });
  }
}

module.exports = new SessionController();
