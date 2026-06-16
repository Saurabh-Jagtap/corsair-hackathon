// backend/src/test.ts

import "dotenv/config";
import { corsair } from "./corsair.js";
// console.log(corsair);
// console.log(Object.keys(corsair));

const threads = await corsair
  .withTenant("dev")
  .gmail.api.threads.list();

const firstThread = threads.threads[0];

const details = await corsair
  .withTenant("dev")
  .gmail.api.threads.get({
    id: firstThread.id,
  });

const headers =
  details.messages[0].payload.headers;

const subject = headers.find(
  (h) => h.name === "Subject"
);

const from = headers.find(
  (h) => h.name === "From"
);

const date = headers.find(
  (h) => h.name === "Date"
);

console.log({
  subject,
  from,
  date,
});

// console.log(JSON.stringify(details, null, 2));