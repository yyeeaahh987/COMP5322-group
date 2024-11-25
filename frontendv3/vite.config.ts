import { defineConfig } from "vitest/config"
import { loadEnv } from 'vite'
import react from "@vitejs/plugin-react"

// const env = loadEnv(mode, process.cwd(), '');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_ENV': JSON.stringify(env.REACT_APP_ENV),
      'process.env.REACT_APP_DOMAIN': JSON.stringify(env.REACT_APP_DOMAIN),
      'process.env.REACT_APP_BACKEND_SERVER': JSON.stringify(env.REACT_APP_BACKEND_SERVER)
    },
    plugins: [react()],
  }
})








// // https://vitejs.dev/config/
// export default defineConfig({
//   define: {
//     'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY)
//   },
//   plugins: [react()],
//   server: {
//     open: true,
//   },
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "src/setupTests",
//     mockReset: true,
//   },
// })
