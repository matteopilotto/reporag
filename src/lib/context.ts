import { Pinecone } from "@pinecone-database/pinecone";
import { getQueryEmbedding } from "./embeddings";

export async function getSimilarContent(
  queryEmbedding: number[],
  namespace: string
) {
  try {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const pineconeIndex = pinecone.Index("codebase-rag");

    // TODO: implement dynamic namespace name
    // const namespace = "https://github.com/CoderAgent/SecureAgent";
    const relevantContent = await pineconeIndex.namespace(namespace).query({
      vector: queryEmbedding,
      topK: 2,
      includeMetadata: true,
    });

    return relevantContent.matches;
  } catch (error) {
    console.error("Error retrieving similar content from Pinecone: ", error);
    throw error;
  }
}

export async function getContext(query: string, namespace: string) {
  const queryEmbedding = await getQueryEmbedding(query);
  const relevantContent = await getSimilarContent(queryEmbedding, namespace);
  console.log("Relevant Content", relevantContent);

  const relevantContentFiltered = relevantContent.filter(
    (content) => content.score && content.score > 0.2
  );

  const relevantText = relevantContentFiltered.map(
    (content) => content.metadata?.text
  );

  return relevantText.join("\n----------\n\n");
}
