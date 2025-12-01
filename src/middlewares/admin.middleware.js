import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config';

const authorizeAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Admin Acess Denied',
        error: error.message
      })
    }
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Access Denied. No token provided.'
      });
    }

    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(400).json({
      message: "Error Occurs When You Fetch The Admin Data",
      error: error.message
    })
  }
}