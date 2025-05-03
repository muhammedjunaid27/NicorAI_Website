const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('redis');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Redis Client Setup
const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await redisClient.connect();
    console.log('✅ Redis connected!');
})();

// Import routes
const chatRoutes = require('./routes/chat');
app.use('/chat', (req, res, next) => {
    req.redisClient = redisClient;  // pass redis client to routes
    next();
}, chatRoutes);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ API Gateway running on port ${PORT}`);
});
