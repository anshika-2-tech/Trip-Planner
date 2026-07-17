const { GoogleGenAI } = require("@google/genai");

const buildPrompt = (userInput) => `
You are a travel planner. Based on the user's trip request, generate a detailed day-by-day itinerary.

User request: "${userInput}"

Respond with ONLY valid JSON. No markdown, no code blocks, no extra text.

Use this exact structure:
{
  "tripSummary": {
    "destination": "string",
    "duration": "string",
    "budget": "string",
    "travelStyle": "string",
    "highlights": ["string", "string", "string"]
  },
  "days": [
    {
      "day": 1,
      "title": "string",
      "activities": [
        {
          "id": "day1-act1",
          "time": "9:00 AM",
          "title": "string",
          "description": "string",
          "type": "sightseeing | food | trek | travel | leisure | shopping | photography"
        }
      ]
    }
  ],
  "accommodations": [
    {
      "name": "string",
      "area": "string",
      "pricePerNight": "string",
      "reason": "string"
    }
  ],
  "mustVisit": [
    {
      "name": "string",
      "description": "string"
    }
  ],
  "costBreakdown": [
    {
      "category": "string",
      "percentage": 25,
      "amount": "string"
    }
  ],
  "localTips": [
    {
      "icon": "string",
      "tip": "string"
    }
  ]
}

Rules:
- 3 to 5 activities per day.
- Every field in tripSummary and days must be present and non-empty.
- accommodations: provide 2-3 hotel or hostel recommendations that match the trip budget. Each must have name, area (locality/neighbourhood), pricePerNight (e.g. "₹800/night"), and reason (one short sentence why it fits).
- mustVisit: provide 4-6 famous landmarks or attractions for the destination (separate from the day itinerary). Each must have name and a one-line description.
- costBreakdown: split the total budget into 4-5 categories (e.g. Stay, Food, Transport, Activities, Miscellaneous). percentage values must add up to 100. amount is an approximate ₹ range string.
- localTips: provide 2-3 practical tips (best time to visit, local transport, what to carry, etc.). icon should be a single relevant emoji.
- Output raw JSON only — no surrounding text.
`;

async function callGemini(userInput) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing. Please set it in your .env file.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  let response;
  try {
    response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: buildPrompt(userInput),
    });
  } catch (err) {
    throw new Error(`Gemini request failed: ${err.message}`);
  }

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  // Strip markdown fences in case the model adds them despite instructions
  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

module.exports = { callGemini };
