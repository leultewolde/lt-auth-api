import {deleteData, fetchData, patchData} from "./api";
import {SESSIONS_URL} from "./constants";

export interface Session {
    id: number;
    accessToken: string;
    refreshToken: string;
    device: string;
}

export async function getSessionByID(sessionId: string): Promise<Session> {
    try {
        const response = await fetchData<Session>(`${SESSIONS_URL}/${sessionId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error getting session with ID: ${sessionId}`);
    }
}

export async function getSessionsByUserID(userId: string): Promise<Session[]> {
    try {
        const response = await fetchData<Session[]>(`${SESSIONS_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error getting sessions for user with ID: ${userId}`);
    }
}

export async function refreshSession(sessionId: string, refreshToken:string): Promise<Session> {
    try {
        const response = await patchData<Session, {refreshToken:string}>(`${SESSIONS_URL}/${sessionId}`, {refreshToken});
        return response.data;
    } catch (error) {
        throw new Error(`Error refreshing session with ID: ${sessionId}: ${error}`);
    }
}

export async function revokeSessionById(sessionId: string): Promise<string> {
    try {
        const response = await deleteData<string>(`${SESSIONS_URL}/${sessionId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error revoking session with ID: ${sessionId}`);
    }
}

export async function revokeSessionsByUserId(userId: string): Promise<string> {
    try {
        const response = await deleteData<string>(`${SESSIONS_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error revoking sessions for user with ID: ${userId}`);
    }
}