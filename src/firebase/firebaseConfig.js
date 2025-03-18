import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBSwvvGQTGgann-cLbEmBipqX7PwHiEihc",
	authDomain: "chat-893ca.firebaseapp.com",
	projectId: "chat-893ca",
	storageBucket: "chat-893ca.firebasestorage.app",
	messagingSenderId: "669331617815",
	appId: "1:669331617815:web:4d306b126bf580201f8452",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const getUsers = async () => {
	const usersCollection = collection(db, "users");
	const usersSnapshot = await getDocs(usersCollection);
	return usersSnapshot.docs.map((doc) => doc.data());
};

export { auth, db, getAuth };
