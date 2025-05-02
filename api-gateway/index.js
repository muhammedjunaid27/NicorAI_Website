const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // ✅ JSON parser

app.post('/chat', (req, res) => {
    console.log('Raw req.body:', req.body);

    const { userId, sessionId, message, timestamp } = req.body;

    console.log('Received request:', { userId, sessionId, message, timestamp });

    res.json({
        responseId: '123',
        responseType: 'text',
        content: {
            text: `You said: ${message}`
        },
        timestamp: new Date().toISOString()
    });
});

app.listen(3000, () => console.log('✅ API Gateway running on port 3000'));
