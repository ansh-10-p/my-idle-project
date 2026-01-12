const { GoogleGenAI } = require("@google/genai");

// 1. Initialize the client with your API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Service function to interact with Gemini
 * @param {string} prompt - The user's code to review
 */
async function generateContent(prompt) {
  try {
    // 2. Pass instructions and prompt to the model
    // Note: gemini-1.5-flash is the currently supported stable model
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      systemInstruction: `You are a senior software engineer. Perform a professional code review.
        Identify bugs, security risks, and suggest improvements with code snippets.
        Separate Critical Issues, Warnings, and Suggestions.`,
      contents: [
        {
          role: "user",
          parts: [{ text: `Review the following code:\n\n${prompt}` }]
        }
      ]
    });

    // 3. Return the text result to the controller
    return result.text;

  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw error; // Let the controller's catch block handle the response
  }
}

// 4. Export the function using CommonJS syntax
module.exports = { generateContent };