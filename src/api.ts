import axios, { AxiosResponse } from 'axios';

export async function fetchData<T>(url: string): Promise<AxiosResponse<T>> {
    try {
        return await axios.get<T>(url);
    } catch (error) {
        throw new Error(`Failed to fetch data from ${url}: ${error}`);
    }
}

export async function patchData<T, D>(url: string, data: D): Promise<AxiosResponse<T>> {
    try {
        return await axios.patch<T>(url, data);
    } catch (error) {
        throw new Error(`Failed to patch data to ${url}: ${error}`);
    }
}

export async function deleteData<T>(url: string): Promise<AxiosResponse<T>> {
    try {
        return await axios.delete<T>(url);
    } catch (error) {
        throw new Error(`Failed to delete data from ${url}: ${error}`);
    }
}