# Maani - AI-Powered Shopping Platform

Maani is an e-commerce platform that uses AI to help users find the best deals and negotiate prices with sellers.

## Features

- User authentication (login/register)
- Product browsing and search
- Product details with reviews
- Price negotiation through AI-powered chat
- Voice shopping capabilities
- Price tracking and alerts
- Saved products and favorites
- User profiles and chat history

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd maani
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/maani
JWT_SECRET=your_jwt_secret_key_here
```

5. Start MongoDB:
```bash
# Make sure MongoDB is running on your system
```

6. Start the server:
```bash
cd server
npm run dev
```

7. Start the client:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user
- PATCH /api/auth/me - Update user profile
- DELETE /api/auth/me - Delete user account

### Products
- GET /api/products - Get all products with filters
- GET /api/products/:id - Get product by ID
- POST /api/products/:id/price-alert - Create price alert
- DELETE /api/products/:id/price-alert - Remove price alert
- POST /api/products/:id/save - Save product
- DELETE /api/products/:id/save - Remove saved product
- GET /api/products/:id/price-history - Get price history
- GET /api/products/:id/related - Get related products

### Chat
- POST /api/chat/negotiate - Start negotiation chat
- POST /api/chat/negotiate/:sessionId/message - Send message in negotiation
- POST /api/chat/negotiate/:sessionId/end - End negotiation
- GET /api/chat/history - Get chat history
- POST /api/chat/voice/start - Start voice chat
- POST /api/chat/voice/:sessionId/end - End voice chat
- GET /api/chat/voice/history - Get voice chat history

### Search
- GET /api/search - Search products
- POST /api/search/process-url - Process product URL
- GET /api/search/suggestions - Get search suggestions
- GET /api/search/history - Get search history
- DELETE /api/search/history - Clear search history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for AI capabilities
- MongoDB for database
- React and Node.js communities
- All contributors and supporters

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/maani](https://github.com/yourusername/maani)
