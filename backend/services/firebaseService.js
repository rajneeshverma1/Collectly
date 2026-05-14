const admin = require("firebase-admin");

/**
 * Initialize Firebase Admin
 * Expects FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env
 */
try {
  if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log("Firebase Admin initialized successfully");
  } else {
    console.warn("Firebase credentials missing. Firebase service will run in mock mode.");
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

const db = process.env.FIREBASE_PROJECT_ID ? admin.firestore() : null;

/**
 * Sync Client to Firebase Firestore
 */
exports.syncClientToFirebase = async (client) => {
  if (!db) return null;

  try {
    const clientRef = db.collection("clients").doc(client.id);
    await clientRef.set({
      name: client.name,
      email: client.email,
      phone: client.phone || null,
      company: client.company || null,
      status: client.status || 'active',
      organizationId: client.organizationId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    return true;
  } catch (error) {
    console.error("Firebase sync failed:", error);
    return false;
  }
};
