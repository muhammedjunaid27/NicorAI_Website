require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 4000;
const REDIS_URL = process.env.REDIS_URL;

// Redis client setup
const redisClient = createClient({
    url: REDIS_URL
});

redisClient.on('error', (err) => {
    console.error('❌ Redis Client Error:', err.message);
});

// Connect to Redis
(async () => {
    try {
        await redisClient.connect();
        console.log('✅ Redis connected!');
    } catch (err) {
        console.error('❌ Failed to connect to Redis:', err.message);
    }
})();

// Middleware
app.use(cors());
app.use(express.json());  // Body parser for JSON

// ✅ Day 2 Task: /chat POST endpoint
app.post('/chat', async (req, res) => {
    console.log('➡️ Incoming request body:', req.body);

    const { userId, sessionId, message, timestamp } = req.body;

    // Basic request validation (FR-AG-04)
    if (!message) {
        return res.status(400).json({
            error: 'Missing required field: message'
        });
    }

    // ✅ Mocked response (FR-AG-01)
    const response = {
        responseId: '1',  // Mock ID
        responseType: 'text',
        content: {
            text: 'Mock API response'
        },
        timestamp: new Date().toISOString()
    };

    console.log('⬅️ Sending mock response:', response);
    return res.json(response);
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ API Gateway running on port ${PORT}`);
});
