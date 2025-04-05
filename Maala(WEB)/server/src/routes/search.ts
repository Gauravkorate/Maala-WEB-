import express from 'express';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { auth } from '../middleware/auth';
import axios from 'axios';
import cheerio from 'cheerio';

const router = express.Router();

// Search products
router.get('/', async (req, res) => {
  try {
    const {
      query,
      filters,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const searchQuery: any = { isActive: true };

    // Apply text search
    if (query) {
      searchQuery.$text = { $search: query as string };
    }

    // Apply filters
    if (filters) {
      const parsedFilters = JSON.parse(filters as string);
      Object.entries(parsedFilters).forEach(([key, value]) => {
        if (value) {
          searchQuery[key] = value;
        }
      });
    }

    // Apply sorting
    const sortOptions: any = {};
    sortOptions[sort as string] = order === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(searchQuery);
    const products = await Product.find(searchQuery)
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
    res.status(500).json({ error: 'Error searching products' });
  }
});

// Process product URL
router.post('/process-url', async (req, res) => {
  try {
    const { url } = req.body;

    // Fetch webpage content
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract product information (this is a basic example, adjust based on target websites)
    const name = $('h1').first().text().trim();
    const price = parseFloat($('.price').first().text().replace(/[^0-9.]/g, ''));
    const description = $('.description').first().text().trim();
    const images = $('.product-image img')
      .map((_, el) => $(el).attr('src'))
      .get();
    const brand = $('.brand').first().text().trim();
    const category = $('.category').first().text().trim();

    // Check if product already exists
    let product = await Product.findOne({ url });

    if (!product) {
      product = new Product({
        name,
        description,
        price,
        images,
        brand,
        category,
        url,
        specifications: {}, // Add more specific extraction logic
        stock: 1, // Add more specific extraction logic
        seller: {
          name: 'Default Seller', // Add more specific extraction logic
          rating: 0,
          location: 'Unknown',
        },
      });

      await product.save();
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error processing URL' });
  }
});

// Get search suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.json([]);
    }

    const suggestions = await Product.find(
      { $text: { $search: query as string } },
      { name: 1, _id: 0 }
    )
      .limit(5)
      .sort({ score: { $meta: 'textScore' } });

    res.json(suggestions.map((s) => s.name));
  } catch (error) {
    res.status(500).json({ error: 'Error getting suggestions' });
  }
});

// Get search history
router.get('/history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.searchHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching search history' });
  }
});

// Clear search history
router.delete('/history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.searchHistory = [];
    await user.save();

    res.json({ message: 'Search history cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error clearing search history' });
  }
});

export default router; 