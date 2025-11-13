import Product from "../models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Error in Fetching Products',
      error: error.message

    })
  }

};


const createProduct = async (req, res) => {
  try {

    const { name, description, price, stock } = req.body;
    const newProduct = await Product.create({ name, description, price, stock });
    res.status(201).json(newProduct);

  } catch (error) {
    if (error.name==='ValidationError') {
      return res.status(400).json({
        message:'Validation Error ',
        error:error.message
      });
    }

    res.status(500).json({
      message: 'Error in Creating Products',
      error: error.message

    });
  }
}

export { getAllProducts, createProduct }