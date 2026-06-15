import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `You are NutriBot, an expert nutritionist AI assistant for the NutriVerse platform. You help users with:
- Personalized meal suggestions based on dietary goals
- Nutrition advice and calorie counting
- Weekly meal planning and prep strategies
- Understanding macronutrients (protein, carbs, fat)
- Special diets: Keto, Vegan, Mediterranean, Low-Carb, High-Protein
- Post-workout nutrition and recovery meals
- Healthy snack alternatives

Be friendly, concise, and evidence-based. Use bullet points and emojis for readability. 
If asked about medical conditions, recommend consulting a healthcare professional.
Keep responses under 400 words unless the user asks for detailed plans.`;

/**
 * POST /api/ai/chat
 * Proxy chat messages to Groq API with streaming
 */
export const chatWithAI = async (req, res, next) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      res.status(400);
      throw new Error('Please provide a message');
    }

    // Check for API key
    if (!process.env.GROQ_API_KEY) {
      res.status(500);
      throw new Error('Groq API key is not configured. Please add GROQ_API_KEY to your .env file.');
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Build messages array with system prompt + history + new message
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-20).map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ];

    // Set headers for SSE streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // Send done signal
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    // If headers already sent (streaming started), just end
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      return res.end();
    }
    next(error);
  }
};
