const CACHE_NAME = 'halaqat-app-cache-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
  // أضف هنا أي ملفات CSS أو JS خارجية إذا كانت لديك
];

// 1. تثبيت الـ Service Worker وحفظ الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. جلب الملفات من ذاكرة التخزين المؤقت أولاً
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش، قم بإرجاعه
        if (response) {
          return response;
        }
        // وإلا، اذهب إلى الشبكة لجلبه
        return fetch(event.request);
      }
    )
  );
});
