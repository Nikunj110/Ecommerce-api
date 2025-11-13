import express from 'express';
import productRouter from './src/routes/products.routes.js'
import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;

app.use('/api/v1/products',productRouter);

app.get('/' , (req,res)=>{
  res.send('E-commerce API is running!');
})

app.get('/aka' , (req,res)=>{
  res.send('E-commerce API is running At Aka ');
})

app.listen(PORT,()=>{
  console.log(`Server is Running on PORT ${PORT}`)
})