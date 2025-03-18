import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useChat } from "../context/ChatContext";
import { List, ListItem, ListItemText, Box } from "@mui/material";
import { formatName } from "../utils/helper";

const Sidebar = () => {
	const { setSelectedUser } = useChat();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const usersRef = collection(db, "users");
				const snapshot = await getDocs(usersRef);
				const usersList = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setUsers(usersList);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	const getImageUrl = () => {
		const value = Math.random();
		let path = "/person1.jpg";
		if (value > 0 && value < 0.2) {
			path = "/person2.jpg";
		} else if (value > 0.2 && value < 0.4) {
			path = "/person3.jpg";
		} else if (value > 0.4 && value < 0.6) {
			path = "/person4.jpg";
		} else if (value > 0.6 && value < 0.8) {
			path = "/person5.jpg";
		}
		return path;
	};
	return (
		<Box className="sidebar-container">
			<List>
				{users.map((user) => (
					<ListItem button key={user.uid} onClick={() => setSelectedUser(user)}>
						<img src={getImageUrl()} className="sidebar-img"></img>
						<ListItemText
							className="sidebar-list-item"
							primary={formatName(user.name)}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default Sidebar;
