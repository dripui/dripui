import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
import packageJson from './package.json';

const { name } = packageJson;
const entryRoot = resolve('src', 'components');
const entry = resolve(entryRoot, 'index.ts');

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({
      entryRoot,
      rollupTypes: true,
    }),
  ],
  // Vite Library Mode
  build: {
    lib: {
      entry,
      name,
    },
    rollupOptions: {
      // dependencies that shouldn't be bundled into the library
      external: ['react', 'react-dom'],
      output: {
        // Global variables to use in the UMD build for externalized dependencies
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
