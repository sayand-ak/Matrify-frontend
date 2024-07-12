import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server:{
        proxy:{
            '/api':{
                target:'https://bigbag.site/api',
                changeOrigin:true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    },
    define: {
        'process.env': process.env
    }

})