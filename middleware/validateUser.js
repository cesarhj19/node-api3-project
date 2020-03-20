function validateUser(req, res, next) {
  const user = req.body;
  if (typeof user === 'undefined') res.status(400).json({ message: 'missing user data' });
  else if (typeof user.name === 'undefined') res.status(400).json({ message: 'missing required name field' });
  else {
    req.user = { ...req.user, ...user };
    next();
  }
}

module.exports = validateUser;
