import admin from 'firebase-admin';
import fs from 'fs';

// Read the service account JSON file
const serviceAccount = JSON.parse(fs.readFileSync('C:/Users/Admin/Desktop/Resume-Builder/server/src/configure/serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore and Auth
const db = admin.firestore();
const auth = admin.auth();

// Exporting db and auth to be used in other files
export { db, auth };
