"use server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyAv4C3R3BdMJj5Q2rxwjIg0hgil4xG7qGw";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp-01-21",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: "text/plain",
};

export async function action(formData: FormData) {
  const prompt = formData.get("prompt") as string;
  if (!prompt) return;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(JSON.stringify(result));
  const cleanedText = result.response.text().replace(/\*\*/g, "").trim();
  return cleanedText;
}
