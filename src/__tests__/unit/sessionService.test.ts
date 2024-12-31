import {
    getSessionByID,
    getSessionsByUserID,
    refreshSession,
    revokeSessionById,
    revokeSessionsByUserId,
} from "../../sessionService";
import { fetchData, patchData, deleteData } from "../../api";
import {AxiosResponse} from "axios";
import {BASE_URL, SESSIONS_URL} from "../../constants";

jest.mock("../../api");

const mockedFetchData = fetchData as jest.MockedFunction<typeof fetchData>;
const mockedPatchData = patchData as jest.MockedFunction<typeof patchData>;
const mockedDeleteData = deleteData as jest.MockedFunction<typeof deleteData>;

describe("Session Service", () => {
    describe("getSessionByID", () => {
        it("should fetch a session by ID", async () => {
            const sessionId = "123";
            const mockSession = {
                id: 123,
                accessToken: "mockAccessToken",
                refreshToken: "mockRefreshToken",
                device: "mockDevice",
            };
            const mockAxiosResponse: AxiosResponse = {
                data: mockSession,
                status: 200,
                statusText: "OK",
                headers: {}
            } as AxiosResponse;

            mockedFetchData.mockResolvedValueOnce(mockAxiosResponse);

            const result = await getSessionByID(sessionId);

            expect(mockedFetchData).toHaveBeenCalledWith(`${SESSIONS_URL}/${sessionId}`);
            expect(result).toEqual(mockSession);
        });

        it("should throw an error when fetching a session fails", async () => {
            const sessionId = "123";
            mockedFetchData.mockRejectedValueOnce(new Error("Network Error"));

            await expect(getSessionByID(sessionId)).rejects.toThrow(
                "Error getting session with ID: 123"
            );
        });
    });

    describe("getSessionsByUserID", () => {
        it("should fetch all sessions for a user", async () => {
            const userId = "456";
            const mockSessions = [
                { id: 1, accessToken: "token1", refreshToken: "refresh1", device: "device1" },
                { id: 2, accessToken: "token2", refreshToken: "refresh2", device: "device2" },
            ];

            const mockAxiosResponse: AxiosResponse = {
                data: mockSessions,
                status: 200,
                statusText: "OK",
                headers: {}
            } as AxiosResponse;

            mockedFetchData.mockResolvedValueOnce(mockAxiosResponse);

            const result = await getSessionsByUserID(userId);

            expect(mockedFetchData).toHaveBeenCalledWith(`${SESSIONS_URL}/users/${userId}`);
            expect(result).toEqual(mockSessions);
        });

        it("should throw an error when fetching sessions fails", async () => {
            const userId = "456";
            mockedFetchData.mockRejectedValueOnce(new Error("Network Error"));

            await expect(getSessionsByUserID(userId)).rejects.toThrow(
                "Error getting sessions for user with ID: 456"
            );
        });
    });

    describe("refreshSession", () => {
        it("should refresh a session with a valid refresh token", async () => {
            const sessionId = "789";
            const refreshToken = "mockRefreshToken";
            const mockSession = {
                id: 789,
                accessToken: "newAccessToken",
                refreshToken: "newRefreshToken",
                device: "mockDevice",
            };

            const mockAxiosResponse: AxiosResponse = {
                data: mockSession,
                status: 200,
                statusText: "OK",
                headers: {}
            } as AxiosResponse;

            mockedPatchData.mockResolvedValueOnce(mockAxiosResponse);

            const result = await refreshSession(sessionId, refreshToken);

            expect(mockedPatchData).toHaveBeenCalledWith(`${SESSIONS_URL}/${sessionId}`, {
                refreshToken,
            });
            expect(result).toEqual(mockSession);
        });

        it("should throw an error when refreshing a session fails", async () => {
            const sessionId = "789";
            const refreshToken = "mockRefreshToken";
            mockedPatchData.mockRejectedValueOnce(new Error("Network Error"));

            await expect(refreshSession(sessionId, refreshToken)).rejects.toThrow(
                "Error refreshing session with ID: 789"
            );
        });
    });

    describe("revokeSessionById", () => {
        it("should revoke a session by ID", async () => {
            const sessionId = "123";
            const mockResponse = "Session revoked";

            const mockAxiosResponse: AxiosResponse = {
                data: mockResponse,
                status: 200,
                statusText: "OK",
                headers: {}
            } as AxiosResponse;

            mockedDeleteData.mockResolvedValueOnce(mockAxiosResponse);

            const result = await revokeSessionById(sessionId);

            expect(mockedDeleteData).toHaveBeenCalledWith(`${SESSIONS_URL}/${sessionId}`);
            expect(result).toBe(mockResponse);
        });

        it("should throw an error when revoking a session fails", async () => {
            const sessionId = "123";
            mockedDeleteData.mockRejectedValueOnce(new Error("Network Error"));

            await expect(revokeSessionById(sessionId)).rejects.toThrow(
                "Error revoking session with ID: 123"
            );
        });
    });

    describe("revokeSessionsByUserId", () => {
        it("should revoke all sessions for a user by user ID", async () => {
            const userId = "456";
            const mockResponse = "All sessions revoked";

            const mockAxiosResponse: AxiosResponse = {
                data: mockResponse,
                status: 200,
                statusText: "OK",
                headers: {}
            } as AxiosResponse;

            mockedDeleteData.mockResolvedValueOnce(mockAxiosResponse);

            const result = await revokeSessionsByUserId(userId);

            expect(mockedDeleteData).toHaveBeenCalledWith(`${BASE_URL}/users/${userId}/sessions`);
            expect(result).toBe(mockResponse);
        });

        it("should throw an error when revoking sessions fails", async () => {
            const userId = "456";
            mockedDeleteData.mockRejectedValueOnce(new Error("Network Error"));

            await expect(revokeSessionsByUserId(userId)).rejects.toThrow(
                "Error revoking sessions for user with ID: 456"
            );
        });
    });
});
