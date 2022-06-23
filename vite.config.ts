import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    createStyleImportPlugin({
      libs: [
        {
          libraryName: '@fect-ui/vue',
          esModule: true,
          resolveStyle: (name) => {
            console.log(name)
            return `@fect-ui/vue/dist/esm/${name}/style`
          }
        }
      ]
    }), 
  ]
})
