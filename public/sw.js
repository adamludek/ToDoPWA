const CACHE_NAME = "todopwa-v2";
const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/pwa-64x64.png",
    "/pwa-192x192.png",
    "/pwa-512x512.png",
    "/screenshot.png",
    "/screenshot-wide.png",
    "index.css",
    "index.js"
];

// Instalacja Service Workera i cache'owanie plików
self.addEventListener("install", (event) => {
    console.log("🛠️ Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("📦 Caching static assets...");
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting(); // 📌 Aktywacja nowego SW natychmiast
});

// Aktywacja i czyszczenie starego cache
self.addEventListener("activate", (event) => {
    console.log("⚡ Service Worker activating...");
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("🗑️ Usuwam stary cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim(); // 📌 Od razu przejmujemy kontrolę nad otwartymi stronami
});

// Obsługa kliknięcia powiadomienia
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    console.log("🔔 Powiadomienie kliknięte:", event.notification);
});

// Obsługa push notifications z wibracjami
self.addEventListener("push", (event) => {
    console.log("🔔 Otrzymano event push w Service Workerze");
    const data = event.data ? event.data.json() : { title: "Nowe zadanie", body: "Dodano nowe zadanie!" };

    const options = {
        body: data.body,
        icon: "/pwa-192x192.png",
        badge: "/pwa-64x64.png",
        vibrate: [200, 100, 200], // 📳 Wibracja na mobilnych (ignorowane na PC)
        requireInteraction: true // ⏳ Na PC powiadomienie nie zniknie samo
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
            .catch(err => console.error("❌ Błąd wyświetlania powiadomienia:", err))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // 🔄 Pobieramy nową wersję w tle i aktualizujemy cache
                fetch(event.request).then((networkResponse) => {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        console.log(`📦 Zaktualizowano cache dla: ${event.request.url}`);
                    });
                }).catch(() => console.warn("⚠ Brak sieci, używam cache"));

                return cachedResponse; // Zwracamy natychmiast wersję z cache
            }

            // 📡 Jeśli pliku nie ma w cache, pobieramy z sieci
            return fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(() => {
                console.warn(`⚠ Błąd pobierania: ${event.request.url}, a brak w cache`);
                return caches.match("/offline.html"); // Opcjonalnie: podstawić stronę offline
            });
        })
    );
});