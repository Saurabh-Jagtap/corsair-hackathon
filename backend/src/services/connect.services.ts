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
        const { url, state } =
            await generateOAuthUrl(
                corsair,
                plugin,
                {
                    tenantId,
                    redirectUri,
                }
            );

        return {
            url,
            state,
        };
    }
}