import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Prasanna & Kiran',
    short_name: 'Prasanna & Kiran',
    description: 'The wedding invitation of Prasanna & Kiran.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fcfaf8',
    theme_color: '#5b3e7e',
    icons: [
      { src: '/app-icons/prasanna-kiran-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/app-icons/prasanna-kiran-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }
}
