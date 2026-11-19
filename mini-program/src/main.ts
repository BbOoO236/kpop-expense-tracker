import { createSSRApp } from 'vue';
import App from './App.vue';

// uni-app Vue 3 entry. The exported `createApp` factory is required so
// uni-app can create an SSR app instance per platform target.
export function createApp() {
  const app = createSSRApp(App);
  return { app };
}
