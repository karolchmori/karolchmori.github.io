// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://karolchmori.github.io',
    base: '/',
    integrations: [mdx(), sitemap(), react()],
    fonts: [
        {
            provider: fontProviders.local(),
            name: 'Atkinson',
            cssVariable: '--font-atkinson',
            fallbacks: ['sans-serif'],
            options: {
                variants: [
                    {
                        src: ['./src/assets/fonts/atkinson-regular.woff'],
                        weight: 400,
                        style: 'normal',
                        display: 'swap',
                    },
                    {
                        src: ['./src/assets/fonts/atkinson-bold.woff'],
                        weight: 700,
                        style: 'normal',
                        display: 'swap',
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: 'SandorTrial',
            cssVariable: '--font-sandor',
            fallbacks: ['serif'],
            options: {
                variants: [
                    {
                        src: ['./src/assets/fonts/SandorTrial.woff2'],
                        weight: 400,
                        style: 'normal',
                        display: 'swap',
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: 'Barqen',
            cssVariable: '--font-barqen',
            fallbacks: ['serif'],
            options: {
                variants: [
                    {
                        src: ['./src/assets/fonts/Barqen.woff2'],
                        weight: 400,
                        style: 'normal',
                        display: 'swap',
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: 'Citylight',
            cssVariable: '--font-citylight',
            fallbacks: ['serif'],
            options: {
                variants: [
                    {
                        src: ['./src/assets/fonts/Citylight.woff2'],
                        weight: 400,
                        style: 'normal',
                        display: 'swap',
                    },
                ],
            },
        },
    ],
});