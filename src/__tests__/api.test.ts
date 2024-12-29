import { fetchData } from '../api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchData', () => {
    it('should fetch data successfully', async () => {
        const mockResponse = { data: { message: 'success' } };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const result = await fetchData('https://api.example.com');
        expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the API call fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

        await expect(fetchData('https://api.example.com')).rejects.toThrow('Failed to fetch data from https://api.example.com: Error: Network Error');
    });
});
