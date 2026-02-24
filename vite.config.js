import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom'],
                    'vendor-inertia': ['@inertiajs/react'],
                    'vendor-tiptap': ['@tiptap/react', '@tiptap/pm', '@tiptap/starter-kit'],
                    'vendor-utils': ['date-fns', 'clsx', 'tailwind-merge'],
                },
            },
        },
    },
});
