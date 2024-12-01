import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { getQueryEmbedding } from "@/lib/embeddings";
import { getContext } from "@/lib/context";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("Input Messages", messages);
  const lastMessage = messages[messages.length - 1];
  const originalLastMessage = { ...lastMessage };
  // const queryEmbedding = await getQueryEmbedding(lastMessage.content);
  const context = await getContext(lastMessage.content);
  const augmentedMessages = [
    ...messages.slice(0, -1),
    {
      ...lastMessage,
      content: context
        ? `${lastMessage.content}\n\n<context>${context}</context>`
        : lastMessage.content,
    },
  ];

  const systemPrompt = {
    role: "system",
    content:
      "You are a senior software engineer. Answer the user's query about a GitHub repository with a short but detailed response. Whenever available use the information in the <context></context> tag to provide a more accurate response.",
  };

  // prepend system prompt if the first message is not a system message
  const messsagesWithSystemPrompt =
    messages[0]?.role === "system"
      ? augmentedMessages
      : [systemPrompt, ...augmentedMessages];

  // console.log(messsagesWithSystemPrompt);

  const result = streamText({
    model: anthropic("claude-3-5-haiku-latest"),
    messages: messsagesWithSystemPrompt,
  });

  // return result.toDataStreamResponse();
  const response = result.toDataStreamResponse();
  response.headers.set('X-Augmented-History', JSON.stringify(augmentedMessages));
  
  return response;
}
