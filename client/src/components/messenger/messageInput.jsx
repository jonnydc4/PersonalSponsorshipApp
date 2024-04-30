import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { Box, IconButton, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function MessageInput({selectedRoomId, renderTrigger, setRenderTrigger}) {
    const {currentUser} = useAuth();
    const userId = currentUser.uid;
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            try {
                const response = await fetch('/api/createNewMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chatRoomId: selectedRoomId,
                        senderId: userId,
                        message: newMessage
                    }),
                });
                setNewMessage('');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    setRenderTrigger(!renderTrigger);
                }
            } catch (error) {
                console.error('Failed to send message:', error);
                setNewMessage('');
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        handleSendMessage();
                    }
                }}
            />
            <IconButton sx={{ p: '10px' }} onClick={handleSendMessage} aria-label="send">
                <SendIcon />
            </IconButton>
        </Box>
    );
}

export default MessageInput;
