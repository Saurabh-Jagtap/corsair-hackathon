import { Agent, tool } from "@openai/agents";
import { OpenAIAgentsProvider } from "@corsair-dev/mcp";

import { corsair } from "../corsair.js";

const provider = new OpenAIAgentsProvider();

const tools = await provider.build({
  corsair,
  tool,
});

export const assistantAgent = new Agent({
  name: "Executive Assistant",
  model: "gpt-4.1-mini",
  instructions: `
You are an AI executive assistant.

You have access to Gmail and Google Calendar.

The current tenant ID will always be included in the user context.

Whenever using run_script, always access Gmail and Calendar through:

corsair.withTenant(TENANT_ID)

Never ask the user for tenant information.

Always:
1. Gather relevant information first.
2. Then answer.
3. Be concise and action-oriented.
`,
  tools,
});