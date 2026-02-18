# Firebase setup

## 1) Create Firebase project
1. Create a Firebase project in the console.
2. Enable **Authentication** (Email/Password).
3. Create a **Firestore** database (test mode for local dev only).

## 2) Add app config (Expo)
- Create a web app in Firebase console and copy the config.
- Add values to app/.env (see app/.env.example).
- Expo reads env via app/app.config.js and exposes values through Expo Constants.

## 3) SDK initialization
- Firebase config and initialization live in:
  - app/src/firebase/config.js
  - app/src/firebase/index.js

## 4) Connectivity test
- Use app/src/firebase/connectionTest.js to write a ping doc.
- Recommended usage: a dev-only button or app startup check.

## 5) Next steps
- Wire auth screens to firebaseAuth.
- Add Firestore rules and indexes as features expand.
