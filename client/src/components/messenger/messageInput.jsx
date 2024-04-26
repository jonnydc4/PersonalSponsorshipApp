import {Box, IconButton, InputBase} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {useState} from "react";
import {useAuth} from "../../contexts/authContext";

function MessageInput({selectedContact, chatRooms, renderTrigger, setRenderTrigger}) {
    const {currentUser} = useAuth();
    const userId = currentUser.uid
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = async () => {

        console.log({chatRoomId: chatRooms[selectedContact]._id, senderId: userId, message: newMessage})

        if (newMessage.trim() !== '') {
            try {
                const response = await fetch('/api/createNewMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chatRoomId: chatRooms[selectedContact]._id,
                        senderId: userId,
                        message: newMessage
                    }),
                })
                setNewMessage('')
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    // console.log("New message sent successfully messageinput.jsx")
                    setRenderTrigger(!renderTrigger)
                }

            } catch (error) {
                console.error('Failed to send message:', error);
                setNewMessage('')
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Type a message"
                inputProps={{'aria-label': 'type a message'}}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <IconButton sx={{p: '10px'}} aria-label="send" onClick={handleSendMessage}>
                <SendIcon/>
            </IconButton>
        </Box>
    )
}

export default MessageInput