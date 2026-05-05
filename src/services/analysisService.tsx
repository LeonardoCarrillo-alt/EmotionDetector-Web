const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? '/dev'
    : 'https://ao8lb9a0o2.execute-api.us-east-1.amazonaws.com/dev');

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = (error) => reject(error);
  });

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

export const analyzeImage = async (file: File) => {
  console.log('[analyzeImage] request file', {
    name: file?.name,
    size: file?.size,
    type: file?.type
  });
  try {
    if (!file) {
      throw new Error('Debes seleccionar una imagen');
    }

    const dataUrl = await fileToBase64(file);
    const base64Image = dataUrl.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
    const token = localStorage.getItem('emotion_detector_token');
    console.log('[analyzeImage] base64 length', base64Image.length);

    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ image: base64Image })
    });

    const data = await parseJson(response);
    console.log('[analyzeImage] response', { ok: response.ok, status: response.status, data });

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Error al analizar la imagen');
    }
    return data;
  } catch (error) {
    console.error('[analyzeImage] error', error);
    throw error instanceof Error ? error : new Error('Error al analizar la imagen');
  }
};