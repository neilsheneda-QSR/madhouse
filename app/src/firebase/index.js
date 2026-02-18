import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { firebaseConfig } from "./config";

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = (() => {
	try {
		return initializeAuth(firebaseApp, {
			persistence: getReactNativePersistence(ReactNativeAsyncStorage),
		});
	} catch (error) {
		return getAuth(firebaseApp);
	}
})();
export const firebaseDb = getFirestore(firebaseApp);
