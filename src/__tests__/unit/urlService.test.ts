import {generateLoginURL, generateRegisterURL, generateURL} from "../../urlService";
import {BASE_URL} from "../../constants";

describe("URL Service", () => {

    describe('generateURL', () => {
        it('should generate a URL with parsed parts as query parameters', () => {
            const redirectURL = 'http://example.com:3000/path/to/resource';
            const result = generateURL(BASE_URL, redirectURL);
            expect(result).toBe(
                'http://localhost:8080/?prefix=http&host=example.com&port=3000&resources=path.to.resource'
            );
        });

        it('should handle a redirect URL without a port', () => {
            const redirectURL = 'https://example.com/path/to/resource';
            const result = generateURL(BASE_URL, redirectURL);
            expect(result).toBe(
                'http://localhost:8080/?prefix=https&host=example.com&resources=path.to.resource'
            );
        });

        it('should handle a redirect URL without resources', () => {
            const redirectURL = 'https://example.com/';
            const result = generateURL(BASE_URL, redirectURL);
            expect(result).toBe('http://localhost:8080/?prefix=https&host=example.com');
        });

        it('should throw an error for an invalid redirect URL', () => {
            const redirectURL = 'invalid-url';
            expect(() => generateURL(BASE_URL, redirectURL)).toThrow('Invalid URL: invalid-url');
        });
    });

    describe('generateLoginURL', () => {
        it('should generate a login URL with parsed parts as query parameters', () => {
            const redirectURL = 'http://example.com:3000/path/to/resource';
            const result = generateLoginURL(redirectURL);
            expect(result).toBe(
                'http://localhost:8080/auth/login/?prefix=http&host=example.com&port=3000&resources=path.to.resource'
            );
        });

        it('should handle a redirect URL without a port', () => {
            const redirectURL = 'https://example.com/path/to/resource';
            const result = generateLoginURL(redirectURL);
            expect(result).toBe(
                'http://localhost:8080/auth/login/?prefix=https&host=example.com&resources=path.to.resource'
            );
        });

        it('should handle a redirect URL without resources', () => {
            const redirectURL = 'https://example.com/';
            const result = generateLoginURL(redirectURL);
            expect(result).toBe('http://localhost:8080/auth/login/?prefix=https&host=example.com');
        });

        it('should throw an error for an invalid redirect URL', () => {
            const redirectURL = 'invalid-url';
            expect(() => generateLoginURL(redirectURL)).toThrow('Invalid URL: invalid-url');
        });
    });

    describe('generateLoginURL', () => {
        it('should generate a login URL with parsed parts as query parameters', () => {
            const redirectURL = 'http://example.com:3000/path/to/resource';
            const result = generateRegisterURL(redirectURL);
            expect(result).toBe(
                'http://localhost:8080/auth/register/?prefix=http&host=example.com&port=3000&resources=path.to.resource'
            );
        });

        it('should handle a redirect URL without a port', () => {
            const redirectURL = 'https://example.com/path/to/resource';
            const result = generateRegisterURL(redirectURL);
            expect(result).toBe(
                'http://localhost:8080/auth/register/?prefix=https&host=example.com&resources=path.to.resource'
            );
        });

        it('should handle a redirect URL without resources', () => {
            const redirectURL = 'https://example.com/';
            const result = generateRegisterURL(redirectURL);
            expect(result).toBe('http://localhost:8080/auth/register/?prefix=https&host=example.com');
        });

        it('should throw an error for an invalid redirect URL', () => {
            const redirectURL = 'invalid-url';
            expect(() => generateRegisterURL(redirectURL)).toThrow('Invalid URL: invalid-url');
        });
    });
});