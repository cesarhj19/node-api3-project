const postDb = require('../posts/postDb');

async function validatePostId(req, res, next) {
  try {
    await postDb.getById(req.params.id)
      .then((post) => {
        if (post) {
          req.post = { ...post, ...req.post };
          next();
        } else res.status(404).json({ message: 'invalid post id' });
      });
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while retrieving the post from the database',
      message: err.message,
    });
  }
}

module.exports = validatePostId;
