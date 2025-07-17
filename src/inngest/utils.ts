import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, Message, TextMessage } from "@inngest/agent-kit";

export async function getSandbox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
};

export function lastAiMessage(result: AgentResult) {
  const index = result.output.findLastIndex(
    (message) => message.role === "assistant",
  );
  const message = result.output[index] as 
  | TextMessage
  | undefined;

  return message?.content
  ? typeof message.content === "string"
    ? message.content
    : message.content.map((m) => m.text).join("")
  : undefined;
};

export const parseAgentOutput = (value: Message[]) => {
  const output = value[0];
  
  if (output.type !== "text") return "Fragment";

  if (Array.isArray(output.content)) {
    return output.content.map((txt) => txt).join(" ");
  }

  return output.content;
};