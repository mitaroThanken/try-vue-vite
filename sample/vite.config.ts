import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import { SecureContextOptions } from 'node:tls'

import { CorsOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const HOST = 'sample'
const PORT = 5173
const HMR_PORT = 5174
const CLIENT_PORT = 443
const VHOST_FQDN = process.env.VHOST_FQDN ?? 'test.test'
const HTTPS_OPTIONS: SecureContextOptions = {
  key: fs.readFileSync(`../certs/${VHOST_FQDN}/key.pem`),
  cert: fs.readFileSync(`../certs/${VHOST_FQDN}/cert.pem`)
}
const PROTOCOL = 'https://'
const CORS_OPTION: CorsOptions = {
  origin: `${PROTOCOL}${VHOST_FQDN}`
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: HOST,
    origin: `${PROTOCOL}${VHOST_FQDN}`,
    https: HTTPS_OPTIONS,
    hmr: {
      path: '/hmr',
      port: HMR_PORT,
      clientPort: CLIENT_PORT
    },
    strictPort: true,
    cors: CORS_OPTION
  },
  preview: {
    host: HOST,
    port: PORT,
    https: HTTPS_OPTIONS,
    strictPort: true,
    cors: CORS_OPTION
  }
})
