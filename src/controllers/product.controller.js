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
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error ',
        error: error.message
      });
    }

    res.status(500).json({
      message: 'Error in Creating Products',
      error: error.message

    });
  }
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: 'Error in Finding Products',
      error: error.message

    });
  }
}

const updateProduct = async (req, res) => {
  try {
    const updateData = req.body;
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // This option returns the *updated* document
        runValidators: true // This runs your schema validators (like min: 0 on price)
      }
    )

    if (!updatedProduct) {
      res.status(404).json({
        message: 'Product Not Found'
      })
    }

    res.status(200).json(updatedProduct)


  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation Error',
        error: error.message
      })
    }

    res.status(500).json({
      message: 'Error While Updating Product ',
      error: error.message
    })
  }
}


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(
      id,
      // {
      //   new: true,
      // }
    )
    if (!deletedProduct) {
      res.status(404).json({
        message: 'Product NOt Found ',
      })
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      id: deletedProduct._id

    })
  } catch (error) {

    res.status(500).json({
      message: 'Error Occured While Delete Product',
      error: error.message
    })
  }
}

export { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct }