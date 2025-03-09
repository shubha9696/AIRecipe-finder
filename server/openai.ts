import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://replit.com",
    "X-Title": "AI Recipe Finder"
  }
});

export async function generateRecipe(ingredients: string[]): Promise<{
  name: string;
  description: string;
  instructions: string;
  ingredients: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-ai-r1:free",
      messages: [
        {
          role: "system",
          content: "You are a professional chef who creates recipes based on available ingredients. Return recipe in JSON format.",
        },
        {
          role: "user",
          content: `Create a recipe using these ingredients: ${ingredients.join(", ")}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to generate recipe: ${errorMessage}`);
  }
}