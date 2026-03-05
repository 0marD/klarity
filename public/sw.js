const CACHE_NAME = 'klarity-v1'
const OFFLINE_URL = '/offline'

const PRECACHE_ASSETS = [
  OFFLINE_URL,
  '/favicon/favicon-32x32.png',
  '/favicon/apple-touch-icon.png',
  '/favicon/site.webmanifest',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/')) return

  const isAsset =
    url.pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|ico|woff2?|css|js)$/) !== null

  if (isAsset) {
    event.respondWith(
      caches.match(request).then(
        (cached) => cached ?? fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
      )
    )
    return
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return response
      })
      .catch(() =>
        caches.match(request).then(
          (cached) => cached ?? caches.match(OFFLINE_URL)
        )
      )
  )
})
