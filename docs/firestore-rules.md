# Firestore Security Rules

If you're getting permission errors during registration, you need to update your Firestore security rules in the Firebase Console.

## Required Rules for User Registration

Go to Firebase Console → Firestore Database → Rules and update to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - allow users to create and read their own document
    match /users/{userId} {
      // Allow create only if the user ID matches the authenticated user
      allow create: if request.auth != null && request.auth.uid == userId;
      
      // Allow read/update only for the user's own document
      allow read, update: if request.auth != null && request.auth.uid == userId;
      
      // Deny delete for safety
      allow delete: if false;
    }
    
    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Testing Rules (Development Only - NOT for production)

For testing purposes only, you can temporarily use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**⚠️ WARNING:** The testing rules allow any authenticated user to read/write all documents. Only use during development!

## How to Update Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to Firestore Database
4. Click on the "Rules" tab
5. Paste the rules above
6. Click "Publish"

The rules will take effect immediately.
