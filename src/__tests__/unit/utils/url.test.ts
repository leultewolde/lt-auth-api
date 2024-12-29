import {constructURLWithQueryParams, parseURL} from "../../../utils/url";

describe("URL Utils", () => {
    describe('parseURL', () => {
        it('should parse a URL with only prefix, host, and port', () => {
            const url = 'http://localhost:3000/';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'http',
                host: 'localhost',
                port: '3000',
            });
        });

        it('should parse a URL with prefix, host, port, and resources', () => {
            const url = 'http://localhost:3000/test/auth';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'http',
                host: 'localhost',
                port: '3000',
                resources: 'test.auth',
            });
        });

        it('should parse a URL with prefix, host, and resources (no port)', () => {
            const url = 'https://example.com/test/auth';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'https',
                host: 'example.com',
                resources: 'test.auth',
            });
        });

        it('should parse a URL with only prefix and host', () => {
            const url = 'https://www.example.com';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'https',
                host: 'www.example.com',
            });
        });

        it('should handle URLs without trailing slashes or paths', () => {
            const url = 'https://example.com';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'https',
                host: 'example.com',
            });
        });

        it('should handle URLs with unusual paths', () => {
            const url = 'http://localhost:8080/a/b/c';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'http',
                host: 'localhost',
                port: '8080',
                resources: 'a.b.c',
            });
        });

        it('should throw an error for a URL without a protocol', () => {
            const url = 'localhost:3000/test/auth';
            expect(() => parseURL(url)).toThrow('Invalid URL: localhost:3000/test/auth');
        });

        it('should throw an error for an invalid URL', () => {
            const url = 'http:/invalid-url';
            expect(() => parseURL(url)).toThrow('Invalid URL: http:/invalid-url');
        });

        it('should ignore query parameters in resources', () => {
            const url = 'http://localhost:3000/test/auth?key=value';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'http',
                host: 'localhost',
                port: '3000',
                resources: 'test.auth',
            });
        });
        it('should ignore fragments in resources', () => {
            const url = 'http://localhost:3000/test/auth#section';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'http',
                host: 'localhost',
                port: '3000',
                resources: 'test.auth',
            });
        });
        it('should return undefined resources for root path only', () => {
            const url = 'http://example.com/';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'http',
                host: 'example.com',
            });
        });
        it('should handle URLs without a port', () => {
            const url = 'http://example.com/test';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'http',
                host: 'example.com',
                resources: 'test',
            });
        });
        it('should handle special characters in resources', () => {
            const url = 'http://example.com/test/auth@';
            const result = parseURL(url);
            expect(result).toEqual({
                prefix: 'http',
                host: 'example.com',
                resources: 'test.auth@',
            });
        });

    });

    describe('constructURLWithQueryParams', () => {
        it('should construct a URL with all parts as query parameters', () => {
            const baseUrl = 'http://example.com/api/';
            const urlParts = {
                prefix: 'http',
                host: 'localhost',
                port: '3000',
                resources: 'test.auth',
            };
            const result = constructURLWithQueryParams(baseUrl, urlParts);
            expect(result).toBe('http://example.com/api/?prefix=http&host=localhost&port=3000&resources=test.auth');
        });

        it('should construct a URL without optional fields', () => {
            const baseUrl = 'http://example.com/api';
            const urlParts = {
                prefix: 'https',
                host: 'www.example.com',
            };
            const result = constructURLWithQueryParams(baseUrl, urlParts);
            expect(result).toBe('http://example.com/api?prefix=https&host=www.example.com');
        });

        it('should throw an error for an invalid base URL', () => {
            const baseUrl = 'invalid-url';
            const urlParts = {
                prefix: 'https',
                host: 'www.example.com',
            };
            expect(() => constructURLWithQueryParams(baseUrl, urlParts)).toThrow('Invalid base URL: invalid-url');
        });
    });

});