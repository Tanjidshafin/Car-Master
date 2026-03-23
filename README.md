# Car Master Frontend

## Environment

Add these values to `.env.local` before running the app:

```env
VITE_API_BASE_URL=https://car-master-backend-three.vercel.app/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_IMGBB_API=...
```

`VITE_API_BASE_URL` is now the single source of truth for frontend backend communication. The standard API client, admin API client, and socket connection all derive from this value.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
