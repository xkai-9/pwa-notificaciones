self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_NOTIFICATION') {
        const delay = event.data.delay || 10000;
        
        setTimeout(() => {
            self.registration.showNotification('¡Llegó! ⏰', {
                body: '¡La app estaba cerrada y aún así llegó! 🎉',
                icon: 'https://via.placeholder.com/192/ff6b6b/fff?text=⏰',
                vibrate: [200, 100, 200, 100, 200],
                tag: 'delayed-notification',
                requireInteraction: false
            });
        }, delay);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (let client of clientList) {
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/pwa-notificaciones/');
        })
    );
});
