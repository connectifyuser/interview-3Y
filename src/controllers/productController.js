const { Product, User } = require('../models');

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne(); 
    
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const price = product.sale_price.toFixed(2); 

    return res.json({
      id: product.id,
      price: product.cost_price, 
      formatted_price: price
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const data = await Product.findAll({
      offset: Number(page) * Number(limit), 
      limit: Number(limit),
      include: [{ model: User }] 
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { name: req.query.search } 
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      return res.status(200).json(updatedProduct);
    }
    throw new Error('Product not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.status(200).send("Product deleted");
    }
    throw new Error("Product not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
