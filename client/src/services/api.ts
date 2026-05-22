const BASE_URL = 'http://localhost:5000/api';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  };
}

interface CurrentUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  };
}

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('ddd_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    const message = responseData?.message || 'API request failed';
    throw new Error(message);
  }

  return responseData as T;
};

export const authSignup = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  return request<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const authLogin = async (email: string, password: string): Promise<AuthResponse> => {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const getCurrentUser = async (token: string): Promise<CurrentUserResponse> => {
  return request<CurrentUserResponse>('/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
