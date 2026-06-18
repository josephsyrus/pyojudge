import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //cookies
});

//in memory accessToken, instead of localStorage
let accessToken: string | null = null;
export function setAccessToken(token: string | null): void {
  accessToken = token;
}
export function getAccessToken(): string | null {
  return accessToken;
}

// attach access token to every request
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// silent refresh on 401 responses
apiClient.interceptors.response.use(
  (response) => response, //success
  async (error) => {
    //failue - may or may not be 401
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      //if its not a retry already
      original._retry = true;
      try {
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`, //validate refresh token, get new access token
          {},
          { withCredentials: true },
        );
        setAccessToken(data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(original);
      } catch {
        setAccessToken(null);
        window.dispatchEvent(new CustomEvent("auth:logout")); //clear auth state, listening in AuthContext.tsx
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
