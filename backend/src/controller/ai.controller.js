
const { generateReview } = require("../services/ai.service");

const getReview = async (req, res) => {
  const { code, language, persona, focusArea, description } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    // 1. Define Schemas
    const seniorSchema = {
      type: "object",
      properties: {
        verdict: { type: "string" },
        riskLevel: { type: "string", enum: ["Low", "Medium", "High"] },
        score: { type: "integer" },
        focus: { type: "string" },
        tradeoff: { type: "string" },
        issues: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              severity: { type: "string", enum: ["Critical", "Medium", "Low"] },
              title: { type: "string" },
              impact: { type: "string" },
              trigger: { type: "string" }
            },
            required: ["id", "severity", "title", "impact", "trigger"]
          }
        }
      },
      required: ["verdict", "riskLevel", "score", "issues", "tradeoff"]
    };

    const juniorSchema = {
      type: "object",
      properties: {
        verdict: { type: "string" },
        score: { type: "integer" },
        summary: { type: "string" },
        tips: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              title: { type: "string" },
              desc: { type: "string" },
              fix: { type: "string" },
              codeSnippet: { type: "string" }
            },
            required: ["id", "title", "desc", "fix", "codeSnippet"]
          }
        }
      },
      required: ["verdict", "score", "summary", "tips"]
    };

    // 2. Select Prompt & Schema
    let systemPrompt = "";
    let selectedSchema = null;

    if (persona === "senior") {
      selectedSchema = seniorSchema;
      systemPrompt = `
        You are a Principal Software Engineer.
        Tone: Strict, critical, concise.
        Focus: ${focusArea} (Security, Scalability, Performance).
        Goal: Identify blocking issues.
        Context: ${description || "None"}.
      `;
    } else {
      selectedSchema = juniorSchema;
      systemPrompt = `
        You are a Friendly Senior Mentor.
        Tone: Encouraging, educational, use emojis.
        Focus: ${focusArea} (Readability, Best Practices).
        Goal: Teach the junior developer.
        Context: ${description || "None"}.
      `;
    }

    // 3. Call Service
    const reviewData = await generateReview(code, systemPrompt, selectedSchema);
    
    res.status(200).json(reviewData);

  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: "Failed to process review" });
  }
};

module.exports = { getReview };