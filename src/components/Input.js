import React, { useState } from "react";

const Input = ({ onSendMessage }) => {
	const [message, setMessage] = useState("");

	const handleSend = (event) => {
		event.preventDefault();
		if ((event && event.keyCode == 13) || message.trim()) {
			onSendMessage(message);
			setMessage("");
		}
	};

	return (
		<form onSubmit={handleSend} className="input-container">
			<input
				type="text"
				placeholder="Type your message..."
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className="input-box"
			/>
			<button
				type="submit"
				onClick={(event) => handleSend(event)}
				className="input-btn"
			>
				Send
			</button>
		</form>
	);
};

export default Input;
