import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export async function getQueryEmbedding(query: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
      encoding_format: "float",
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating query embedding: ", error);
    throw error;
  }
}
