const authorizeAdmin = (req,res,next) =>{
  try {
    if (!req.user) {
      return res.status(401).json({
        message:'Access Denied. User not authenticated.',
      })
    }

    if (req.user.role!=='admin') {
      return res.status(403).json({
        message:'Access Denied Admin Only'
      })

      next();
    }
  } catch (error) {
    res.status(500).json({
      message:'Error In Admin Middleware',
      error:error.message
    })
  }
}