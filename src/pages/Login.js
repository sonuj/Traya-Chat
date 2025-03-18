import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import {
	TextField,
	Button,
	Container,
	Typography,
	Box,
	Alert,
} from "@mui/material";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const isEmailValid = email.includes("@");
	const isPasswordValid = password.length >= 6;
	const isFormValid = isEmailValid && isPasswordValid;

	const handleLogin = async () => {
		setError("");
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/dashboard");
		} catch (error) {
			if (error.message === "Firebase: Error (auth/invalid-credential).") {
				setError("Please enter valid credential");
			} else {
				setError("Something went wrong, Please try after some time");
			}
		}
	};

	return (
		<Container maxWidth="sm" className="white-bg">
			<Box className="box-container">
				<Typography variant="h4" gutterBottom>
					Login
				</Typography>

				{error && <Alert severity="error">{error}</Alert>}

				<TextField
					label="Email"
					fullWidth
					margin="normal"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setError("");
					}}
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
					onChange={(e) => {
						setPassword(e.target.value);
						setError("");
					}}
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
					onClick={handleLogin}
					sx={{ mt: 2 }}
					disabled={!isFormValid}
					className={isFormValid && "login-reg-btn"}
				>
					Login
				</Button>

				<Button
					variant="outlined"
					fullWidth
					onClick={() => navigate("/register")}
					sx={{ mt: 2 }}
				>
					Register
				</Button>
			</Box>
		</Container>
	);
};

export default Login;
