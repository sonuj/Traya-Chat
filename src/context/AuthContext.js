import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(() => {
		console.log(JSON.parse(localStorage.getItem("currentUser")), "11111");
		return JSON.parse(localStorage.getItem("currentUser")) || null;
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			localStorage.setItem("currentUser", JSON.stringify(user));
		});
		return () => unsubscribe();
	}, []);

	const logout = () => {
		signOut(auth);
		setCurrentUser(null);
		localStorage.removeItem("currentUser");
	};
	return (
		<AuthContext.Provider value={{ currentUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
