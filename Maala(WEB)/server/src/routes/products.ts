import express from 'express';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get all products with filters and pagination
router.get('/', async (req, res) => {
  try {
    const {
      query,
      category,
      brand,
      minPrice,
      maxPrice,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const filter: any = { isActive: true };

    // Apply search query
    if (query) {
      filter.$text = { $search: query as string };
    }

    // Apply category filter
    if (category) {
      filter.category = category;
    }

    // Apply brand filter
    if (brand) {
      filter.brand = brand;
    }

    // Apply price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Apply sorting
    const sortOptions: any = {};
    sortOptions[sort as string] = order === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      products,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// Create price alert
router.post('/:id/price-alert', auth, async (req, res) => {
  try {
    const { targetPrice } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if price alert already exists
    const existingAlert = user.priceAlerts.find(
      (alert) => alert.productId.toString() === product._id.toString()
    );

    if (existingAlert) {
      return res.status(400).json({ error: 'Price alert already exists' });
    }

    // Add price alert
    user.priceAlerts.push({
      productId: product._id,
      targetPrice,
      createdAt: new Date(),
    });

    await user.save();

    res.json({ message: 'Price alert created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating price alert' });
  }
});

// Remove price alert
router.delete('/:id/price-alert', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.priceAlerts = user.priceAlerts.filter(
      (alert) => alert.productId.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: 'Price alert removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing price alert' });
  }
});

// Save product
router.post('/:id/save', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if product is already saved
    if (user.savedProducts.includes(product._id)) {
      return res.status(400).json({ error: 'Product already saved' });
    }

    user.savedProducts.push(product._id);
    await user.save();

    res.json({ message: 'Product saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving product' });
  }
});

// Remove saved product
router.delete('/:id/save', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.savedProducts = user.savedProducts.filter(
      (productId) => productId.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: 'Product removed from saved items' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing saved product' });
  }
});

// Get product price history
router.get('/:id/price-history', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product.priceHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching price history' });
  }
});

// Get related products
router.get('/:id/related', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
    })
      .limit(4)
      .sort({ createdAt: -1 });

    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching related products' });
  }
});

export default router; 