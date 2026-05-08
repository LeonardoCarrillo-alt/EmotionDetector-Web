const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? '/dev'
    : 'https://ao8lb9a0o2.execute-api.us-east-1.amazonaws.com/dev');

type AuthResponse = {
  message?: string;
  token?: string;
  accessToken?: string;
  idToken?: string;
  jwt?: string;
  user?: { id?: string; username?: string; createdAt?: string };
};

const parseJson = async (response: Response) => {
  const text = await response.text();
  if (!text) {
    return {};
  }
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

export const register = async (username: string, password: string): Promise<AuthResponse> => {
  console.log('[register] request', { username, hasPassword: !!password });
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password })
    });
    const data = await parseJson(response);
    console.log('[register] response', { ok: response.ok, status: response.status, data });

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Error en el registro');
    }
    return data;
  } catch (error) {
    console.error('[register] error', error);
    throw error instanceof Error ? error : new Error('Error en el registro');
  }
};

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  console.log('[login] request', { username, hasPassword: !!password });
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password })
    });
    const data = await parseJson(response);
    console.log('[login] response', { ok: response.ok, status: response.status, data });

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Error en el login');
    }

    const resolvedToken = data.token || data.accessToken || data.idToken || data.jwt;
    if (resolvedToken) {
      localStorage.setItem('emotion_detector_token', resolvedToken);
      console.log('[login] token guardado en localStorage');
    }

    return data;
  } catch (error) {
    console.error('[login] error', error);
    throw error instanceof Error ? error : new Error('Error en el login');
  }
};

export const logout = () => {
  localStorage.removeItem('emotion_detector_token');
  localStorage.removeItem('emotion_detector_user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('emotion_detector_user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!localStorage.getItem('emotion_detector_token');
