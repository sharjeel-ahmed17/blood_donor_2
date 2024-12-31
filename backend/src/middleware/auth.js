import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  console.log('Authenticating request...');
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log('Authenticated user:', req.user);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
    console.log('Authentication failed:', error);
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access Denied' });
  }
  next();
};

