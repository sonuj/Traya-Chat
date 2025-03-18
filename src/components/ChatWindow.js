import React, { useEffect, useState } from "react";
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import Input from "./Input";
import { db } from "../firebase/firebaseConfig";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { formatName } from "../utils/helper";

const ChatWindow = () => {
	const { selectedUser } = useChat();
	const { currentUser } = useAuth();
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (!selectedUser) return;

		const chatId = [currentUser.uid, selectedUser.id].sort().join("_");
		const messagesRef = collection(db, "chats", chatId, "messages");
		const q = query(messagesRef, orderBy("timestamp", "asc"));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			setMessages(snapshot.docs.map((doc) => doc.data()));
		});

		return () => unsubscribe();
	}, [selectedUser, currentUser]);

	const sendMessage = async (text) => {
		if (!text.trim()) return;

		const chatId = [currentUser.uid, selectedUser.id].sort().join("_");
		const messagesRef = collection(db, "chats", chatId, "messages");

		await addDoc(messagesRef, {
			senderId: currentUser.uid,
			text,
			timestamp: serverTimestamp(),
		});
	};

	return (
		<div className="chat-container">
			{selectedUser ? (
				<>
					<div className="chat-selected-user">
						<strong>{formatName(selectedUser.name)}</strong>
					</div>
					<div className="chat-message">
						{messages.map((msg, index) => (
							<div
								key={index}
								style={{
									display: "flex",
									justifyContent:
										msg.senderId === currentUser.uid
											? "flex-end"
											: "flex-start",
									marginBottom: "10px",
								}}
							>
								<div
									style={{
										background:
											msg.senderId === currentUser.uid ? "#007bff" : "#e4e6eb",
										color: msg.senderId === currentUser.uid ? "white" : "black",
										padding: "10px",
										borderRadius: "15px",
										maxWidth: "60%",
									}}
								>
									{msg.text}
								</div>
							</div>
						))}
					</div>
					<Input onSendMessage={sendMessage} />
				</>
			) : (
				<div className="user-chat">Select a user to start chatting</div>
			)}
		</div>
	);
};

export default ChatWindow;
