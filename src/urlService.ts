import {parseURL, constructURLWithQueryParams} from "./utils/url";
import {LOGIN_URL, REGISTER_URL} from "./constants";

export function generateLoginURL(redirectURL: string): string {
    return generateURL(LOGIN_URL, redirectURL);
}

export function generateRegisterURL(redirectURL: string): string {
    return generateURL(REGISTER_URL, redirectURL);
}

export function generateURL(baseUrl: string, redirectURL: string): string {
    const urlParts = parseURL(redirectURL);
    return constructURLWithQueryParams(baseUrl, urlParts);
}
