const validateLead = (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Please provide name, email, and phone number' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  next();
};

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (req.path === '/register') {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }
  } else if (req.path === '/login') {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
  }

  next();
};

module.exports = { validateLead, validateUser };