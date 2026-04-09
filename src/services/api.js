import axios from 'axios';

// ✅ DO NOT import store at the top level — it creates a circular dependency.
// Instead, we lazily get it only when a request is made (store is ready by then).
let _store;
export const injectStore = (store) => {
  _store = store;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = _store?.getState()?.auth?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, try to silently refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/refresh`,
          { withCredentials: true }
        );

        // ✅ Lazy import of actions to avoid circular deps
        const { setCredentials } = await import('../features/auth/authSlice');
        _store.dispatch(setCredentials({ token: data.token }));
        processQueue(null, data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        const { logout } = await import('../features/auth/authSlice');
        _store.dispatch(logout());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;