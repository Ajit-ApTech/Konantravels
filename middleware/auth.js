// Admin Authentication Middleware
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authenticateAdmin = async (req, res, next) => {
  // Check for token in header or cookie
  const token = req.headers['authorization']?.split(' ')[1] ||
                req.cookies?.adminToken ||
                req.query?.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'konan-secret');
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

const authorizeAdmin = (requiredRole = 'admin') => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const roleHierarchy = { superadmin: 3, admin: 2, manager: 1 };
    const userRole = roleHierarchy[req.admin.role] || 0;
    const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

    if (userRole < requiredRoleLevel) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

module.exports = { authenticateAdmin, authorizeAdmin };
