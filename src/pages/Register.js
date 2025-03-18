import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import {
	TextField,
	Button,
	Container,
	Typography,
	Box,
	Alert,
} from "@mui/material";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const isEmailValid = email.includes("@");
	const isPasswordValid = password.length >= 6;
	const isNameValid = name.trim().length > 0;
	const isFormValid = isEmailValid && isPasswordValid && isNameValid;

	const handleRegister = async (event) => {
		event.preventDefault();
		setError("");

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateProfile(userCredential.user, { displayName: name });

			const user = userCredential.user;
			await setDoc(doc(collection(db, "users"), user.uid), {
				uid: user.uid,
				name,
				email,
			});

			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<Container maxWidth="sm" className="white-bg">
			<Box className="box-container">
				<Typography variant="h4" gutterBottom>
					Register
				</Typography>

				{error && <Alert severity="error">{error}</Alert>}

				<TextField
					label="Name"
					fullWidth
					margin="normal"
					value={name}
					onChange={(e) => setName(e.target.value)}
					error={!isNameValid && name.length > 0}
					helperText={!isNameValid && name.length > 0 ? "Name is required" : ""}
				/>

				<TextField
					label="Email"
					fullWidth
					margin="normal"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={!isEmailValid && email.length > 0}
					helperText={
						!isEmailValid && email.length > 0 ? "Enter a valid email" : ""
					}
				/>

				<TextField
					label="Password"
					type="password"
					fullWidth
					margin="normal"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={!isPasswordValid && password.length > 0}
					helperText={
						!isPasswordValid && password.length > 0
							? "Password must be at least 6 characters"
							: ""
					}
				/>

				<Button
					variant="contained"
					fullWidth
					onClick={handleRegister}
					sx={{ mt: 2 }}
					disabled={!isFormValid}
					className={isFormValid && "login-reg-btn"}
				>
					Register
				</Button>

				<Button
					variant="outlined"
					fullWidth
					onClick={() => navigate("/login")}
					sx={{ mt: 2 }}
				>
					Login
				</Button>
			</Box>
		</Container>
	);
};

export default Register;
