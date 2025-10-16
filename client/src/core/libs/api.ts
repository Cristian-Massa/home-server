interface Options {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: BodyInit | null;
}

interface ApiProps {
  url: string;
  options: Options;
}

const BASE_URL = "http://192.168.1.5:8080";

export const api = async <T extends object>({
  url,
  options,
}: ApiProps): Promise<T> => {
  const { method, headers, body } = options;

  const init: RequestInit = { method, headers, body };

  const response = await fetch(`${BASE_URL}${url}`, init);

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  return result as T;
};
