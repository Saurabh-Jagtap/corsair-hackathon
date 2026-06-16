// backend/src/test-gmail.ts
import "dotenv/config";
import { corsair } from "./corsair.js";

async function main() {
    // console.log(process.env.DATABASE_URL);

    // console.log(
    //     await corsair.manage.tenants.list()
    // );

    // console.log(
    //     corsair.manage.connectionStatus
    // );

    const messages = await corsair.withTenant("dev").gmail.api.threads.list()

    console.log(messages);
}

main();