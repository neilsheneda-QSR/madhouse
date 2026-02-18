import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firebaseDb } from "./index";

// Simple Firestore write to validate connectivity.
// Call this from a dev-only button or startup check.
export async function testFirebaseConnection() {
  const pingRef = doc(firebaseDb, "__debug__", "ping");
  await setDoc(pingRef, { ok: true, at: serverTimestamp() }, { merge: true });
  return true;
}
