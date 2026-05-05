const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? '/dev'
    : 'https://ao8lb9a0o2.execute-api.us-east-1.amazonaws.com/dev');

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

const api = async (path: string, options: RequestOptions = {}) => {
  const token = localStorage.getItem('emotion_detector_token');
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (response.status === 401) {
    localStorage.removeItem('emotion_detector_token');
    localStorage.removeItem('emotion_detector_user');
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Error en la petición');
  }
  return data;
};

export default api;