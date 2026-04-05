const webpush = require('web-push');
require('dotenv').config();

const vapidEmail = process.env.VAPID_EMAIL;
const vapidPublic = process.env.VAPID_PUBLIC_KEY;
const vapidPrivate = process.env.VAPID_PRIVATE_KEY;

if (vapidEmail && vapidPublic && vapidPrivate) {
  webpush.setVapidDetails(vapidEmail, vapidPublic, vapidPrivate);
  console.log('[WebPush] VAPID configured successfully');
} else {
  console.warn('[WebPush] VAPID keys not set — push notifications disabled');
}

module.exports = webpush;
