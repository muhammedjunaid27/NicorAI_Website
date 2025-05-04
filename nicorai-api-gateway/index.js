require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');   // ✅ Add axios for HTTP calls
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 4000;
const REDIS_URL = process.env.REDIS_URL;
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;  // <-- Add this in .env!
console.log('✅ N8N Webhook URL:', N8N_WEBHOOK_URL);

const redisClient = createClient({
    url: REDIS_URL
});

redisClient.on('error', (err) => {
    console.error('❌ Redis Client Error:', err.message);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('✅ Redis connected!');
    } catch (err) {
        console.error('❌ Failed to connect to Redis:', err.message);
    }
})();

app.use(cors());
app.use(express.json());

// ✅ Day 3 Task: /chat with n8n call
app.post('/chat', async (req, res) => {
    console.log('➡️ Incoming request body:', req.body);

    const { userId, sessionId, message, timestamp } = req.body;

    // Basic validation
    if (!message) {
        return res.status(400).json({
            error: 'Missing required field: message'
        });
    }

    try {
        // Prepare request for n8n (contract 4.3.2)
        const n8nRequestBody = {
            requestId: `${Date.now()}`,  // Mocked request ID
            userId,
            sessionId,
            message,
            conversationContext: [],  // Empty for now
            timestamp: timestamp || new Date().toISOString()
        };

        console.log('➡️ Sending to n8n:', n8nRequestBody);

        // Call n8n webhook
        const n8nResponse = await axios.post(N8N_WEBHOOK_URL, n8nRequestBody);

        console.log('⬅️ Received from n8n:', n8nResponse.data);

        // Transform n8n response (contract 4.3.2) to frontend (4.3.1)
        console.log('⬅️ Received from n8n:', n8nResponse.data);

        // NEW: Transform n8n response properly
        const firstFAQ = (n8nResponse.data.data && n8nResponse.data.data.length > 0)
            ? n8nResponse.data.data[0]
            : null;
        
        const transformedResponse = {
            responseId: firstFAQ ? String(firstFAQ.id) : "0",
            responseType: "text",   // We're returning text type
            content: {
                text: firstFAQ
                    ? firstFAQ.answer
                    : "Sorry, no answer found."
            },
            timestamp: new Date().toISOString()
        };
        
        console.log('⬅️ Sending to frontend:', transformedResponse);
        
        return res.json(transformedResponse);
        
        

    } catch (err) {
        console.error('❌ Error calling n8n or transforming response:');
    
        if (err.response) {
            // The server responded with a status code out of 2xx
            console.error('🔴 n8n Response Error:', err.response.status, err.response.data);
        } else if (err.request) {
            // The request was made but no response was received
            console.error('🟠 No response from n8n:', err.request);
        } else {
            // Something else went wrong
            console.error('⚠️ General Error:', err.message);
        }
    
        return res.status(500).json({
            error: 'Something went wrong while processing your request.'
        });
    }
    
});

app.listen(PORT, () => {
    console.log(`✅ API Gateway running on port ${PORT}`);
});
