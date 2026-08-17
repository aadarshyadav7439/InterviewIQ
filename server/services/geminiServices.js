import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeResume = async (resumeText) => {
  if (!resumeText?.trim()) {
    throw new Error("Resume text is empty");
  }

  const prompt = `
You are an expert resume analyst and ATS specialist.

Analyze the resume provided below.

IMPORTANT RULES:
- Only use information explicitly supported by the resume.
- Never invent companies, skills, projects, education, experience,
  certifications, achievements, or other facts.
- If a category is not present, return an empty array.
- Give an overall resume score from 0 to 100.
- Evaluate the resume from both ATS and recruiter perspectives.
- Identify useful missing keywords based on the candidate's existing
  profile and technical direction.
- Keep extracted items concise.
- Suggestions should be practical and specific.
- Return only the requested structured JSON.

RESUME:
-------------------------
${resumeText}
-------------------------
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          overallScore: {
            type: "integer",
          },

          summary: {
            type: "string",
          },

          skills: {
            type: "array",
            items: {
              type: "string",
            },
          },

          projects: {
            type: "array",
            items: {
              type: "string",
            },
          },

          education: {
            type: "array",
            items: {
              type: "string",
            },
          },

          experience: {
            type: "array",
            items: {
              type: "string",
            },
          },

          certifications: {
            type: "array",
            items: {
              type: "string",
            },
          },

          achievements: {
            type: "array",
            items: {
              type: "string",
            },
          },

          missingKeywords: {
            type: "array",
            items: {
              type: "string",
            },
          },

          strengths: {
            type: "array",
            items: {
              type: "string",
            },
          },

          weaknesses: {
            type: "array",
            items: {
              type: "string",
            },
          },

          suggestions: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },

        required: [
          "overallScore",
          "summary",
          "skills",
          "projects",
          "education",
          "experience",
          "certifications",
          "achievements",
          "missingKeywords",
          "strengths",
          "weaknesses",
          "suggestions",
        ],
      },
    },
  });

  return JSON.parse(response.text);
};