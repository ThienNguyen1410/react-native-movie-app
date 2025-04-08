export const getRequest = async <T>(url: string, apiKey: string): Promise<T> => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data as T;
        } catch (error) {
            throw new Error(`Failed to fetch: ${error}`);
        }
}