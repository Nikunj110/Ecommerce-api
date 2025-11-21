import jwt from 'jsonwebtoken'
import 'dotenv/config'
// import User from '../models/user.model'

const authenticateUser = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Access Denied. No token provided.'
    });
  }
  try {
    console.log(authHeader);
    const token = authHeader.split(' ')[1]; //Extracting the token (remove "Bearer " string)

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {

    res.status(403).json({ 
      message: 'Invalid Token', 
      error: error.message 
    });
  }
}
export { authenticateUser };