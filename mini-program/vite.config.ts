import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

// uni-app (Vue 3 + Vite) build configuration.
// The `uni()` plugin compiles the app for the platform selected via
// `-p` (e.g. `uni build -p mp-weixin`) or the default H5 build.
export default defineConfig({
  plugins: [uni()],
});
