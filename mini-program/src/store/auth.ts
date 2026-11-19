import { reactive } from 'vue';
import type { AuthUser } from '../api/auth';

const TOKEN_KEY = 'kpop_token';
const USER_KEY = 'kpop_user';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

function readStorage<T>(key: string): T | null {
  try {
    const value = uni.getStorageSync(key);
    return value ? (value as T) : null;
  } catch {
    return null;
  }
}

export const authState = reactive<AuthState>({
  token: readStorage<string>(TOKEN_KEY),
  user: readStorage<AuthUser>(USER_KEY),
});

export function setAuth(token: string, user: AuthUser): void {
  authState.token = token;
  authState.user = user;
  uni.setStorageSync(TOKEN_KEY, token);
  uni.setStorageSync(USER_KEY, user);
}

export function clearAuth(): void {
  authState.token = null;
  authState.user = null;
  uni.removeStorageSync(TOKEN_KEY);
  uni.removeStorageSync(USER_KEY);
}

export function getToken(): string | null {
  return authState.token;
}
