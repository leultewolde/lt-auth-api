import axios, { AxiosResponse } from 'axios';

export async function fetchData(url: string): Promise<AxiosResponse<any>> {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        throw new Error(`Failed to fetch data from ${url}: ${error}`);
    }
}
