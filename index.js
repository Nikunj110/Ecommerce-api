import express from 'express';
import productRouter from './src/routes/products.route.js'
import authRouter from './src/routes/auth.route.js'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js';
import {authenticateUser} from './src/middlewares/auth.middleware.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.use('/api/v1/products', authenticateUser, productRouter);

app.get('/', (req, res) => {
  res.send('E-commerce API is running!');
})

app.get('/aka', (req, res) => {
  res.send('E-commerce API is running At Aka ');
})

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is Running on PORT ${PORT}`)
    })
  } catch (error) {
    console.log("The Error Occured When Running the Program ", error.message)
    process.exit(1);
  }
}

startServer();