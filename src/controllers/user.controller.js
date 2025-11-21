import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please provide name, email, and password'
      })
    }
    const existingUser = await User.findOne({ email });

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



    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    }
    const token = jwt.sign({
      userId: newUser._id,
      role: newUser.role,
    },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h'
      }
    )
    return res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token: token
    });

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({
      email: email
    })

    if (!findUser) {
      return res.status(404).json({
        message: 'User Not Found Register First',

      })
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Incorrect Password'
      });
    }
    const token = jwt.sign({
      userId: findUser._id,
      role: findUser.role,
    },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h'
      }
    )
    console.log(token);
    return res.status(200).json({
      message: 'You logged in successfully',
      user: {
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email,
      },
      token
    })

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Enter All the data ',
        error: error.message,
      })
    }

    return res.status(500).json({
      message: 'Error Occured Where u trying to login',
      error: error.message
    })
  }
}

export { registerUser, loginUser }