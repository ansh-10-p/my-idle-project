const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateReview(code, systemPrompt, jsonSchema) {
  try {
    // 1. Try the Preview Model you found
    const modelId = "gemini-3-flash-preview"; 

    // 2. Configure the request
    // We REMOVED 'thinkingConfig' because it breaks JSON parsing.
    // We REMOVED 'stream' because your frontend waits for a full response.
    const result = await ai.models.generateContent({
      model: modelId,
      config: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema,
      },
      contents: [
        {
          role: "user",
          parts: [
            { text: systemPrompt },
            { text: `CODE TO REVIEW:\n\n${code}` }
          ]
        }
      ]
    });

    // 3. Handle the response
    const candidates = result.candidates;

    if (!candidates || candidates.length === 0) {
      throw new Error("Gemini returned no response. (Model might be restricted)");
    }

    const responseText = candidates[0].content.parts[0].text;
    
    return JSON.parse(responseText);

  } catch (error) {
    console.error("AI Service Error:", error.message);

    // 4. Smart Fallback
    // If 'gemini-3' fails (404), tell the user to switch back to 'gemini-2.0'
    if (error.message.includes("404") || error.message.includes("not found")) {
      console.error("\n⚠️ CRITICAL: 'gemini-3-flash-preview' is not available for your API Key yet.");
      console.error("👉 PLEASE CHANGE 'modelId' to 'gemini-2.0-flash-exp' in aiService.js\n");
    }

    throw new Error("Failed to communicate with Gemini API");
  }
}

module.exports = { generateReview };