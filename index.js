import express from 'express';
import productRouter from './src/routes/products.routes.js'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('/api/v1/products', productRouter);

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