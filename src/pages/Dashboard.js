import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import Navbar from "../components/Navbar";
import { getUsers } from "../firebase/firebaseConfig";

const Dashboard = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const allUsers = await getUsers(); // Function to fetch Firebase-authenticated users
			setUsers(allUsers);
		};
		fetchUsers();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="dashboard-container">
				<Sidebar users={users} />
				<ChatWindow />
			</div>
		</div>
	);
};

export default Dashboard;
