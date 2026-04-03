const { Order } = require('../models');

exports.getOrdersByDate = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        createdAt: req.query.date 
      }
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedOrder = await Order.findByPk(req.params.id);
      return res.status(200).json(updatedOrder);
    }
    throw new Error('Order not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.status(200).send("Order deleted");
    }
    throw new Error("Order not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
