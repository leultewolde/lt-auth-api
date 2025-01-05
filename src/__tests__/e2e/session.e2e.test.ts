import {
    getSessionByID,
    getSessionsByUserID,
    refreshSession,
    revokeSessionById,
    revokeSessionsByUserId
} from '../../sessionService';
import {generateLoginURL, generateRegisterURL} from '../../urlService';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Replace with your Spring Boot backend URL
// axios.defaults.baseURL = BASE_URL;

function getUrlParam(url: string, paramName: string): string | null {
    try {
        // Create a URL object to parse the given URL
        const parsedUrl = new URL(url);

        // Access the query parameters using URLSearchParams
        const params = parsedUrl.searchParams;

        // Return the value of the requested parameter
        return params.get(paramName);
    } catch (error) {
        // Handle invalid URL errors
        console.error("Invalid URL provided:", error);
        return null;
    }
}

describe('Session API End-to-End Tests', () => {
    let sessionId: number;
    let userId: number;
    let refreshToken = 'dummy-refresh-token';

    beforeAll(async () => {
        // Setup initial data (e.g., create user or session)
        const loginParams = {prefix: "http", host: "localhost", port: 3000, resources: "auth~login"};
        const registerUrl = `${BASE_URL}/auth/register?prefix=${loginParams.prefix}&host=${loginParams.host}&port=${loginParams.port}&resources=${loginParams.resources}`
        await axios.post(registerUrl, {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "password123",
            phone: "123-456-7890"
        });

        const redirectParams = {prefix: "http", host: "localhost", port: 3000, resources: "dashboard"};
        const loginUrl = `${BASE_URL}/auth/login?prefix=${redirectParams.prefix}&host=${redirectParams.host}&port=${redirectParams.port}&resources=${redirectParams.resources}`
        const loginResponse = await axios.post(loginUrl, {
            email: "john.doe@example.com",
            password: "password123",
            device: "web-123",
        });

        const redirectUrl = loginResponse.data.redirectUrl;
        const parsedSessionId = getUrlParam(redirectUrl, "sessionId");
        const parsedUserId = getUrlParam(redirectUrl, "userId");
        if (!parsedSessionId || !parsedUserId) throw new Error('Invalid session id provided');
        sessionId = Number(parsedSessionId);
        userId = Number(parsedUserId);


        const sessionResponse = await axios.get<{
            id: number;
            accessToken: string;
            refreshToken: string;
            device: string;
            userId: number;
        }>(`${BASE_URL}/sessions/${sessionId}`);
        refreshToken = sessionResponse.data.refreshToken
        userId = sessionResponse.data.userId
    });

    it('should fetch a session by ID', async () => {
        const session = await getSessionByID(sessionId.toString());
        expect(session).toBeDefined();
        expect(session.id).toEqual(sessionId);
    });

    it('should fetch sessions by user ID', async () => {
        const sessions = await getSessionsByUserID(userId.toString());
        expect(sessions).toBeInstanceOf(Array);
        expect(sessions.length).toBeGreaterThan(0);
    });

    it('should refresh a session', async () => {
        const updatedSession = await refreshSession(sessionId.toString(), refreshToken);
        expect(updatedSession).toBeDefined();
        expect(updatedSession.refreshToken).not.toEqual(refreshToken);
    });

    it('should revoke a session by ID', async () => {
        const responseMessage = await revokeSessionById(sessionId.toString());
        expect(responseMessage).toBe(`Session '${sessionId}' deleted successfully!`);
    });

    it('should revoke sessions by user ID', async () => {
        const responseMessage = await revokeSessionsByUserId(userId.toString());
        expect(responseMessage).toBe(`Sessions from User '${userId}' deleted successfully!`);
    });

    it('should generate a login URL with query params', () => {
        const redirectURL = 'http://localhost:3000/dashboard';
        const loginURL = generateLoginURL(redirectURL);
        expect(loginURL).toContain('http://localhost:8080/auth/login');
        expect(loginURL).toContain('prefix');
        expect(loginURL).toContain('host');
        expect(loginURL).toContain('port');
        expect(loginURL).toContain('resources');
    });

    it('should generate a register URL with query params', () => {
        const redirectURL = 'http://localhost:3000/dashboard';
        const registerURL = generateRegisterURL(redirectURL);
        expect(registerURL).toContain('http://localhost:8080/auth/register');
        expect(registerURL).toContain('prefix');
        expect(registerURL).toContain('host');
        expect(registerURL).toContain('port');
        expect(registerURL).toContain('resources');
    });

    afterAll(async () => {
        // Cleanup test data
        await axios.delete(`${BASE_URL}/users/${userId}`);
    });
});