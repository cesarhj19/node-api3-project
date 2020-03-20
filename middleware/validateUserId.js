const userDb = require('../users/userDb');

async function validateUserId(req, res, next) {
  try {
    await userDb.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = { ...user, ...req.user };
          next();
        } else {
          res.status(404).json({ message: 'invalid user id' });
        }
      });
  } catch (err) {
    res.status(500)
      .json({
        error: 'There was an error while saving the post to the database',
        message: err.message,
      });
  }
}

module.exports = validateUserId;
