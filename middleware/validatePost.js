function validatePost(req, res, next) {
  const post = req.body;
  if (typeof post === 'undefined') res.status(400).json({ message: 'missing post data' });
  else if (typeof post.text === 'undefined') res.status(400).json({ message: 'missing required text field' });
  else {
    req.post = { ...req.post, ...post };
    next();
  }
}

module.exports = validatePost;
