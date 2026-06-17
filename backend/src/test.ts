// backend/src/test.ts

import "dotenv/config";
// import { corsair } from "./corsair.js";
// console.log(corsair);
// console.log(Object.keys(corsair));
// backend/src/test-oauth.ts
// import { generateOAuthUrl } from "corsair/oauth";

// console.log(generateOAuthUrl);
// backend/src/test-callback.ts

// import { processOAuthCallback } from "corsair/oauth";

// console.log(processOAuthCallback);

// const threads = await corsair
//   .withTenant("dev")
//   .gmail.api.threads.list();

// const firstThread = threads.threads[0];

// const details = await corsair
//   .withTenant("dev")
//   .gmail.api.threads.get({
//     id: firstThread.id,
//   });

// const headers =
//   details.messages[0].payload.headers;

// const subject = headers.find(
//   (h) => h.name === "Subject"
// );

// const from = headers.find(
//   (h) => h.name === "From"
// );

// const date = headers.find(
//   (h) => h.name === "Date"
// );

// console.log({
//   subject,
//   from,
//   date,
// });

// console.log(JSON.stringify(details, null, 2));

// backend/src/test-agent.ts

import { OpenAIAgentsProvider } from "@corsair-dev/mcp";
import { tool } from "@openai/agents";
import { corsair } from "./corsair.js";

const provider = new OpenAIAgentsProvider();

const tools = await provider.build({
  corsair,
  tool,
});

console.log(tools);
console.log(tools.length);
console.log(tools[0]);