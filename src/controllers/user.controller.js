import User from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please provide name, email, and password'
      })
    }
    const existingUser = User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'User With this Email Already Exists'
      })
    }
    const newUser = await User.create({
      name,
      email,
      password
    });

    if (!savedUser) {
      return res.status(500).json({
        message: 'Error Occured In Save User '
      })
    }

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    }

    res.status(201).json(userResponse);

  } catch (error) {

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Enter All the data ',
        error: error.message,
      })
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Email Already in Use'
      })
    }

    return res.status(500).json({
      message: 'Error Occured in register User ',
      error: error.message,
    })
  }

}


export { registerUser }