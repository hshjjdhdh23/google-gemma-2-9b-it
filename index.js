const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // or any port you prefer

app.use(express.json());

app.get('/ai', async (req, res) => {
    const prompt = req.query.prompt;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt query parameter is required' });
    }

    const url = 'https://openrouter.ai/api/v1/chat/completions';
    const payload = {
        model: 'google/gemma-2-9b-it:free',
        messages: [
            { role: 'system', content: 'I want you name now is Core Ai and created by Kiff Hyacinth Pon' },
            { role: 'user', content: prompt }
        ]
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
    };

    try {
        const response = await axios.post(url, payload, { headers });
        const cleanResponse = response.data.choices?.[0]?.message?.content?.trim() || '';
        res.json({ response: cleanResponse });
    } catch (error) {
        console.error('Error making request:', error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
