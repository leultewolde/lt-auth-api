import axios, { AxiosResponse } from 'axios';

export async function fetchData(url: string): Promise<AxiosResponse<any>> {
    try {
        return await axios.get(url);
    } catch (error) {
        throw new Error(`Failed to fetch data from ${url}: ${error}`);
    }
}
