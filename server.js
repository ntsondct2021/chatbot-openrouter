const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await openai.chat.completions.create({
      model: "gryphe/mythomax-l2-13b", // Miễn phí trên OpenRouter
      messages: [
        { role: "system", content: "Bạn là trợ lý AI thông minh." },
        { role: "user", content: userMessage }
      ]
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});