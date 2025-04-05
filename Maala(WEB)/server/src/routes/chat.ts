import express from 'express';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { auth } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Start negotiation chat
router.post('/negotiate', auth, async (req, res) => {
  try {
    const { productId, initialOffer } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const sessionId = uuidv4();
    const session = {
      sessionId,
      productId,
      messages: [
        {
          role: 'user',
          content: `Initial offer: ${initialOffer}`,
          timestamp: new Date(),
        },
        {
          role: 'assistant',
          content: `Thank you for your offer of ${initialOffer}. I'll help you negotiate the best price for this product.`,
          timestamp: new Date(),
        },
      ],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    user.chatHistory.push(session);
    await user.save();

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error starting negotiation' });
  }
});

// Send message in negotiation
router.post('/negotiate/:sessionId/message', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const session = user.chatHistory.find(
      (chat) => chat.sessionId === req.params.sessionId
    );

    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    if (session.status !== 'active') {
      return res.status(400).json({ error: 'Chat session is not active' });
    }

    // Add user message
    session.messages.push({
      role: 'user',
      content,
      timestamp: new Date(),
    });

    // Simulate AI response
    const product = await Product.findById(session.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Simple AI response logic (can be replaced with more sophisticated AI)
    const lastUserMessage = session.messages[session.messages.length - 1];
    const currentPrice = product.price;
    const userOffer = parseFloat(lastUserMessage.content.match(/\d+(\.\d+)?/)?.[0] || '0');

    let aiResponse = '';
    if (userOffer < currentPrice * 0.8) {
      aiResponse = `I apologize, but that offer is too low. The current price is ${currentPrice}. Would you like to make a higher offer?`;
    } else if (userOffer > currentPrice * 0.95) {
      aiResponse = `That's a good offer! I can accept ${userOffer} for this product. Would you like to proceed with the purchase?`;
    } else {
      aiResponse = `Thank you for your offer of ${userOffer}. I can offer you a price of ${currentPrice * 0.9}. Would you like to accept this offer?`;
    }

    session.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    });

    session.updatedAt = new Date();
    await user.save();

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
});

// End negotiation
router.post('/negotiate/:sessionId/end', auth, async (req, res) => {
  try {
    const { finalPrice } = req.body;
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const session = user.chatHistory.find(
      (chat) => chat.sessionId === req.params.sessionId
    );

    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    if (session.status !== 'active') {
      return res.status(400).json({ error: 'Chat session is not active' });
    }

    session.status = 'completed';
    session.finalPrice = finalPrice;
    session.updatedAt = new Date();

    await user.save();

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error ending negotiation' });
  }
});

// Get chat history
router.get('/history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.chatHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chat history' });
  }
});

// Start voice chat
router.post('/voice/start', auth, async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const sessionId = uuidv4();
    const session = {
      sessionId,
      productId,
      duration: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    user.voiceChatHistory.push(session);
    await user.save();

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error starting voice chat' });
  }
});

// End voice chat
router.post('/voice/:sessionId/end', auth, async (req, res) => {
  try {
    const { duration } = req.body;
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const session = user.voiceChatHistory.find(
      (chat) => chat.sessionId === req.params.sessionId
    );

    if (!session) {
      return res.status(404).json({ error: 'Voice chat session not found' });
    }

    if (session.status !== 'active') {
      return res.status(400).json({ error: 'Voice chat session is not active' });
    }

    session.status = 'completed';
    session.duration = duration;
    session.updatedAt = new Date();

    await user.save();

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error ending voice chat' });
  }
});

// Get voice chat history
router.get('/voice/history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.voiceChatHistory);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching voice chat history' });
  }
});

export default router; 