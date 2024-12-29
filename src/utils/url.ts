
export type URLParts = {
    prefix: string;
    host: string;
    port?: string;
    resources?: string;
};

export function parseURL(url: string): URLParts {
    if (!url.match(/^(https?:\/\/)/)) {
        throw new Error(`Invalid URL: ${url}`);
    }
    try {
        const urlObject = new URL(url); // Parse the URL
        const prefix = urlObject.protocol.replace(":", "");
        const host = urlObject.hostname;
        const port = urlObject.port || undefined;
        const resources =
            urlObject.pathname !== "/" ? urlObject.pathname.slice(1).replace(/\//g, ".") : undefined;

        return { prefix, host, ...(port && { port }), ...(resources && { resources }) };
    } catch (error) {
        throw new Error(`Invalid URL: ${url}`);
    }
}


export function constructURLWithQueryParams(baseUrl: string, urlParts: URLParts): string {
    try {
        const url = new URL(baseUrl);

        // Add query parameters for each URL part
        url.searchParams.append('prefix', urlParts.prefix);
        url.searchParams.append('host', urlParts.host);

        if (urlParts.port) {
            url.searchParams.append('port', urlParts.port);
        }

        if (urlParts.resources) {
            url.searchParams.append('resources', urlParts.resources);
        }

        return url.toString();
    } catch (error) {
        throw new Error(`Invalid base URL: ${baseUrl}`);
    }
}

export function hasQueryParameter(url: string, parameter: string): boolean {
    try {
        const urlObject = new URL(url); // Parse the URL
        return urlObject.searchParams.has(parameter); // Check if the query parameter exists
    } catch (error) {
        throw new Error(`Invalid URL: ${url}`);
    }
}
