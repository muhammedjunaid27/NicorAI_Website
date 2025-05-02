const express = require('express');
const cors = require('cors');
const axios = require('axios');  // Install axios if you haven't: npm install axios

const app = express();
app.use(cors());
app.use(express.json());

const N8N_WEBHOOK_URL = 'https://n8n.srv810314.hstgr.cloud/webhook/chat';  // Replace with real URL

app.post('/chat', async (req, res) => {
    console.log('Incoming request:', req.body);

    try {
        // Forward to n8n webhook
        const response = await axios.post(N8N_WEBHOOK_URL, req.body);

        // Send n8n's response back to Frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error forwarding to n8n:', error.message);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ API Gateway running on port ${PORT}`));
