/**
 * Auth API client: WeChat login → POST /auth/login → token.
 * Base path matches the backend global prefix (see specs/.../contracts/api.md).
 */

export interface AuthUser {
  id: string;
  nickname: string | null;
  avatar: string | null;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

// TODO: make configurable per environment (e.g. VITE_API_BASE_URL) before deploy.
const API_BASE = 'http://localhost:3000/api/v1';

/** Normalise a backend error detail (string | string[] | object) to one message. */
function formatError(detail: unknown): string {
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) return detail.map(String).join('；');
  if (detail && typeof detail === 'object') {
    const obj = detail as Record<string, unknown>;
    const message = obj.message ?? obj.error ?? obj.msg;
    if (typeof message === 'string') return message;
    if (Array.isArray(message)) return message.map(String).join('；');
    return JSON.stringify(obj);
  }
  return '登录失败';
}

/** Obtain the WeChat login code via uni.login. */
function getWechatCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (res) => {
        if (res.code) resolve(res.code);
        else reject(new Error('微信登录未返回 code'));
      },
      fail: (err) => reject(new Error(err.errMsg ?? '微信登录失败')),
    });
  });
}

/** Call the backend /auth/login endpoint. */
function requestLogin(code: string): Promise<LoginResult> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${API_BASE}/auth/login`,
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: { code },
      success: (res) => {
        const status = res.statusCode;
        if (status >= 200 && status < 300) {
          resolve(res.data as LoginResult);
        } else {
          reject(new Error(formatError(res.data)));
        }
      },
      fail: (err) => reject(new Error(err.errMsg ?? '网络请求失败')),
    });
  });
}

/** Full auth flow: wx.login → POST /auth/login. */
export async function login(): Promise<LoginResult> {
  const code = await getWechatCode();
  return requestLogin(code);
}
