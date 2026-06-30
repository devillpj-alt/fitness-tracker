// Self-unregistering service worker - clears any old broken caches
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  await self.registration.unregister();
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.navigate(client.url));
  });
});
