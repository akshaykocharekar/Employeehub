import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are EmployeeHub AI, an intelligent HR assistant.

Rules:
- Be concise.
- Prefer bullet points.
- Answer only from the provided context whenever possible.
- If information is unavailable, clearly state it.
`;

export const summarizeAnnouncement = async (announcement) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
${SYSTEM_PROMPT}

Summarize the following company announcement into 3 concise bullet points.

Announcement:
${announcement}
`,
    });

    return response.text;
  } catch (error) {
    console.error(error);

    throw new Error(
      "Unable to generate summary. Please try again."
    );
  }
};

export const askHR = async (question, context = "") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
${SYSTEM_PROMPT}

Employee Data:
${context}

Employee Question:
${question}
`,
    });

    return response.text;
  } catch (error) {
    console.error(error);

    throw new Error(
      "Unable to contact Gemini."
    );
  }
};