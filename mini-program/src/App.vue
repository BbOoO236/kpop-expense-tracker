<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';
import { login } from './api/auth';
import { setAuth } from './store/auth';

onLaunch(async () => {
  // Application bootstrap: WeChat login (wx.login -> POST /auth/login) and
  // store the issued token (Phase 2 foundational auth flow).
  try {
    const { token, user } = await login();
    setAuth(token, user);
  } catch (error) {
    // Non-fatal: the app still loads; auth can be retried on demand later.
    console.error('[auth] bootstrap failed:', error);
  }
});
</script>

<style>
/* Global styles. */
</style>
