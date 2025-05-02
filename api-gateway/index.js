const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const N8N_WEBHOOK_URL = 'https://n8n.srv810314.hstgr.cloud/webhook-test/chat';  // Replace with real

app.post('/chat', async (req, res) => {
    console.log('Incoming request:', req.body);

    // ✅ 1. Basic Validation
    const { message } = req.body;
    if (!message || message.trim() === '') {
        return res.status(400).json({
            error: "The 'message' field is required."
        });
    }

    try {
        // ✅ 2. Forward to n8n webhook
        const n8nResponse = await axios.post(N8N_WEBHOOK_URL, req.body);

        console.log('Response from n8n:', n8nResponse.data);

        // ✅ 3. Safely transform the n8n response
        const transformedResponse = {
            responseId: 'generated-id-123',
            responseType: 'text',
            content: {
                text: n8nResponse.data.finalMessage || 'No response text provided.'
            },
            timestamp: new Date().toISOString()
        };

        res.json(transformedResponse);

    } catch (error) {
        console.error('Error forwarding to n8n:', error.message);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ API Gateway running on port ${PORT}`));
