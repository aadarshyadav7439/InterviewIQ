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

export const generateInterviewQuestions = async ({
  resumeText,
  targetRole,
  company,
  interviewType,
  difficulty,
  questionCount,
}) => {
  if (!targetRole?.trim()) {
    throw new Error("Target role is required");
  }

  const count = Number(questionCount);

  if (![10, 20, 30, 40, 50].includes(count)) {
    throw new Error("Question count must be 10, 20, 30, 40, or 50");
  }

  const prompt = `
You are an expert interviewer for InterviewIQ.

Generate exactly ${count} interview questions for the candidate.

INTERVIEW DETAILS:
Target Role: ${targetRole}
Company: ${company?.trim() || "Not specified"}
Interview Type: ${interviewType}
Difficulty: ${difficulty}

CANDIDATE RESUME:
-------------------------
${
  resumeText?.trim() ||
  "No resume available. Generate questions based only on the target role and interview settings."
}
-------------------------

IMPORTANT RULES:
- Return exactly ${count} questions.
- Never return fewer or more.
- Questions must be relevant to the target role.
- Use the resume to personalize questions when resume information is available.
- Never invent facts about the candidate.
- For Technical interviews, focus on technical knowledge, problem solving, and role-relevant concepts.
- For Behavioral interviews, focus on behavioral and situational questions.
- For Mixed interviews, provide a balanced combination of technical and behavioral questions.
- Respect the requested difficulty: ${difficulty}.
- Avoid duplicate or near-duplicate questions.
- Keep questions concise and interview-ready.
- Return only the requested JSON structure.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          questions: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },

        required: ["questions"],
      },
    },
  });

  const result = JSON.parse(response.text);

  if (!Array.isArray(result.questions) || result.questions.length !== count) {
    throw new Error(
      `Gemini returned ${
        result.questions?.length || 0
      } questions instead of ${count}`,
    );
  }

  return result.questions;
};

//getting the evaluation of answers from gemini
export const evaluateInterviewAnswer = async ({
  question,
  answer,
  targetRole,
  interviewType,
  difficulty,
}) => {
  if (!question?.trim()) {
    throw new Error("Question is required");
  }

  if (!answer?.trim()) {
    throw new Error("Answer is required");
  }

  const prompt = `
You are an expert interviewer evaluating a candidate's answer.

INTERVIEW DETAILS:
Target Role: ${targetRole}
Interview Type: ${interviewType}
Difficulty: ${difficulty}

INTERVIEW QUESTION:
${question}

CANDIDATE ANSWER:
${answer}

Evaluate the candidate's answer based on:

1. Correctness
2. Relevance to the question
3. Technical accuracy where applicable
4. Clarity and communication
5. Depth of understanding
6. Completeness

SCORING:
- Give a score from 0 to 10.
- 0 = completely incorrect or irrelevant
- 10 = excellent, accurate, complete, and well-explained answer

FEEDBACK:
- Explain what the candidate did well.
- Explain what could be improved.
- Give practical advice for a better interview answer.
- Keep feedback concise and useful.
- Do not invent information about the candidate.

Return only the requested JSON structure.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,

    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          score: {
            type: "number",
          },
          feedback: {
            type: "string",
          },
        },
        required: ["score", "feedback"],
      },
    },
  });

  const result = JSON.parse(response.text);

  if(typeof result.score !== "number" ||result.score < 0 || result.score > 10 ||!result.feedback){
    throw new Error("Invalid evaluation returned by Gemini");
  }

  return {score: result.score, feedback: result.feedback};
};

export const generateInterviewFeedback = async ({
  targetRole,
  company,
  interviewType,
  difficulty,
  questions,
}) => {
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("Questions are required");
  }

  const questionSummary = questions
    .map(
      (item, index) => `
Question ${index + 1}:
${item.question}

Candidate Answer:
${item.answer}

Score:
${item.score}/10

Question Feedback:
${item.feedback}
`,
    )
    .join("\n");

  const prompt = `
You are an expert interview evaluator.

Analyze the candidate's complete interview performance.

INTERVIEW DETAILS:
Target Role: ${targetRole}
Company: ${company || "Not specified"}
Interview Type: ${interviewType}
Difficulty: ${difficulty}

INTERVIEW PERFORMANCE:
${questionSummary}

Provide an overall evaluation of the candidate.

Focus on:
- Overall performance
- Technical knowledge where applicable
- Communication
- Problem solving
- Strengths
- Areas that need improvement
- Practical advice for future interviews

IMPORTANT:
- Base your feedback only on the provided answers and scores.
- Do not invent candidate information.
- Do not calculate or change the numerical overall score.
- Keep the feedback concise but useful.

Return only the requested JSON structure.
`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          summary: {
            type: "string",
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
          "summary",
          "strengths",
          "weaknesses",
          "suggestions",
        ],
      },
    },
  });

  const result = JSON.parse(response.text);

  if (
    !result.summary ||
    !Array.isArray(result.strengths) ||
    !Array.isArray(result.weaknesses) ||
    !Array.isArray(result.suggestions)
  ) {
    throw new Error(
      "Invalid interview feedback returned by Gemini",
    );
  }

  return result;
};

