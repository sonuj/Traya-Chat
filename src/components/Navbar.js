import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { formatName } from "../utils/helper";

const Navbar = () => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const [displayName, setDisplayName] = useState("");
	const handleLogout = async () => {
		await signOut(auth);
		navigate("/login");
	};
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setDisplayName(user.displayName || "User");
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<AppBar position="static" className="main-bg">
			<Toolbar>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					{currentUser
						? `Welcome ${formatName(displayName) || "User"}`
						: "Chat App"}
				</Typography>
				{currentUser && (
					<Button color="inherit" onClick={handleLogout}>
						Logout
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
