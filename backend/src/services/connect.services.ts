import { generateOAuthUrl } from "corsair/oauth";
import { corsair } from "../corsair.js";

type ConnectParams = {
    plugin: string;
    tenantId: string;
    redirectUri: string;
};

export class ConnectService {
    static async generateConnectionUrl({
        plugin,
        tenantId,
        redirectUri,
    }: ConnectParams) {
        console.log({
            plugin,
            tenantId,
            redirectUri,
        });
        const { url, state } =
            await generateOAuthUrl(
                corsair,
                plugin,
                {
                    tenantId,
                    redirectUri,
                }
            );
        console.log({
            url,
            state,
        });

        return {
            url,
            state,
        };
    }
}