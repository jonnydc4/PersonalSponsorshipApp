import React, {useEffect, useState} from 'react';
import { useAuth } from '../../contexts/authContext';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    InputBase,
    IconButton,
    AppBar,
    Toolbar,
    Typography,
    Paper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import NewChatRoomDialog from "./newChatRoomDialog";

const contacts = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
];

const initialMessages = {
    1: [{type: 'sent', text: 'Hi Alice! How are you?'}, {type: 'received', text: 'I\'m good. How are you?'}],
    2: [{type: 'sent', text: 'Hey Bob, wanna catch up tomorrow?'}],
    3: [{type: 'sent', text: 'Charlie, did you get the notes?'}]
};

function Messenger() {
    const { currentUser } = useAuth();
    const userId = currentUser.uid

    const [selectedContact, setSelectedContact] = useState(1);
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false)
    const [chatRooms, setChatRooms] = useState([]);


    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const response = await fetch(`/api/getChatRoomsForUser?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setChatRooms(data);
            } catch (error) {
                console.error('Failed to fetch chat rooms:', error);
            }
        };

        fetchChatRooms();
        console.log("Chatrooms", chatRooms)
    }, []);




    const handleContactClick = (id) => {
        setSelectedContact(id);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const updatedMessages = { ...messages, [selectedContact]: [...messages[selectedContact], {type: 'sent', text: newMessage}] };
            setMessages(updatedMessages);
            setNewMessage('');
            console.log(messages)
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Box sx={{ display: 'flex'}}>
            {/* Side bar with contacts */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    marginLeft: '240px', // Set marginLeft equal to the width of the drawer
                    [`& .MuiDrawer-paper`]: {
                        width: 240,
                        boxSizing: 'border-box',
                        marginLeft: '240px' // Same adjustment for the inner paper
                    }
                }}
            >
                <Toolbar />
                {/* List of Conversations/Contacts */}
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {contacts.map((contact) => (
                            <ListItem button key={contact.id} onClick={() => handleContactClick(contact.id)}>
                                <ListItemText primary={contact.name} />
                            </ListItem>
                        ))}
                        <ListItem>
                            <NewChatRoomDialog open={dialogOpen} setOpen={setDialogOpen} currentUserId={userId}/>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Messages Header */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Messenger
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Paper style={{ height: 'calc(75% - 64px)', overflow: 'auto', marginTop: '24px' }}>
                    <List>
                        {messages[selectedContact]?.map((message, index) => (
                            <ListItem key={index} alignItems="flex-start" sx={{ display: 'flex', flexDirection: 'column', alignItems: message.type === 'sent' ? 'flex-end' : 'flex-start'}}>
                                <Box
                                    sx={{
                                        maxWidth: '70%',
                                        backgroundColor: message.type === 'sent' ? '#2196f3' : '#ffffff',
                                        color: message.type === 'sent' ? '#ffffff' : '#000000',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        textAlign: message.type === 'sent' ? 'right' : 'left',
                                        wordBreak: 'break-word',
                                        boxShadow: 1
                                    }}
                                >
                                    <ListItemText primary={message.text} primaryTypographyProps={{ style: { color: message.type === 'sent' ? 'white' : 'black' } }} />
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                {/* Message Input */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Type a message"
                        inputProps={{ 'aria-label': 'type a message' }}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <IconButton sx={{ p: '10px' }} aria-label="send" onClick={handleSendMessage}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default Messenger;
