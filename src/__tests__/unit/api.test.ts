import { fetchData, patchData, deleteData } from '../../api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API functions', () => {
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

    it("should make a successful PATCH request", async () => {
        const url = "http://example.com/resource";
        const payload = { key: "value" };
        const mockResponse = { data: { success: true } };

        mockedAxios.patch.mockResolvedValueOnce(mockResponse);

        const response = await patchData(url, payload);
        expect(response).toEqual(mockResponse);
        expect(mockedAxios.patch).toHaveBeenCalledWith(url, payload);
    });

    it("should handle a PATCH request failure", async () => {
        const url = "http://example.com/resource";
        const payload = { key: "value" };
        mockedAxios.patch.mockRejectedValueOnce(new Error("Network Error"));

        await expect(patchData(url, payload)).rejects.toThrow(
            "Failed to patch data to http://example.com/resource: Error: Network Error"
        );
    });

    it("should make a successful DELETE request", async () => {
        const url = "http://example.com/resource";
        const mockResponse = { data: { success: true } };

        mockedAxios.delete.mockResolvedValueOnce(mockResponse);

        const response = await deleteData(url);
        expect(response).toEqual(mockResponse);
        expect(mockedAxios.delete).toHaveBeenCalledWith(url);
    });

    it("should handle a DELETE request failure", async () => {
        const url = "http://example.com/resource";
        mockedAxios.delete.mockRejectedValueOnce(new Error("Network Error"));

        await expect(deleteData(url)).rejects.toThrow(
            "Failed to delete data from http://example.com/resource: Error: Network Error"
        );
    });
});
