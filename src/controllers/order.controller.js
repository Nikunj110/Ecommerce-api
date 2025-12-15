import Order from "../models/order.model.js";

const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      orderItems,
      user: req.user.userId, // <--- This links the order to the logged-in user
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({
      message: 'Error creating order',
      error: error.message,
    });
  }
}

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ user: userId });


    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching your orders',
      error: error.message
    });
  }
}

const getOrderById = async (req, res) => {
  try {
    // 1. Find the order using the URL Parameter (req.params.id)
    // 2. POPULATE: Go to the 'user' collection, grab 'name' and 'email'
    // User Have Many Orders
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // If the logged-in user is NOT the owner AND NOT an admin, block them atyarej.
    // We convert IDs to strings to compare them safely.
    if (order.user._id.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to view this order'
      })
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching order details',
      error: error.message
    });
  }
}

const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user._id.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // const paymetUpdate = await Order.updateMany({
    //   isPaid: true,
    //   paidAt: Date.now()
    // })

    // return res.status(200).json({
    //   paymetUpdate
    // });

    // Update the Order Status
    order.isPaid = true;
    order.paidAt = Date.now();
    // Save the Payment Result (Simulating PayPal/Stripe)
    // In a real app, this data comes from req.body (from PayPal)
    order.paymentResult = {
      id: req.body.id || 'PAY-SIMULATED-123',
      status: req.body.status || 'COMPLETED',
      update_time: req.body.update_time || Date.now(),
      email_address: req.body.email_address || 'customer@example.com',
    }
    // Save the updated object
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);

  } catch (error) {
    res.status(500).json({
      message: 'Error updating payment status',
      error: error.message
    });
  }

}


const getOrders = async (req, res) => {
  try {

    const orders =await Order.find({}).populate("user","id name");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching all orders',
      error: error.message
    });
  }
}
export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid,getOrders };