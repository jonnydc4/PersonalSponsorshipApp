import React, {useEffect, useState} from 'react';
import {useAuth} from '../../contexts/authContext';
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
import MessageInput from "./messageInput";

const initialMessages = {
    1: [{type: 'sent', text: 'Hi Alice! How are you?'}, {type: 'received', text: 'I\'m good. How are you?'}],
    2: [{type: 'sent', text: 'Hey Bob, wanna catch up tomorrow?'}],
    3: [{type: 'sent', text: 'Charlie, did you get the notes?'}]
};

function Messenger() {
    const {currentUser} = useAuth();
    const userId = currentUser.uid

    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false)
    const [chatRooms, setChatRooms] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [renderTrigger, setRenderTrigger] = useState(false)


    // const messageFunction = (messageObject) => {
    //     for (let message in messageObject) {
    //         // console.log("message func", message)
    //         // if (userId === message.sender) {
    //         //     message['type'] = 'sent'
    //         // } else {
    //         //     message['type'] = 'received'
    //         // }
    //     }
    //     setMessages(messageObject)
    //     // console.log("message func", messageObject)
    // }


    // On first render or for when the userId changes
    useEffect(() => {
        const fetchChatRooms = async () => {
            // This is just getting the chatRoom data from the backend
            // We will be using this to generate the contact list and the messages we need displayed
            try {
                const response = await fetch(`/api/getChatRoomsForUser?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("messenger.jsx data:", data);
                setChatRooms(data);  // Set state here
                return data;
            } catch (error) {
                console.error('Failed to fetch chat rooms:', error);
            }
        };

        fetchChatRooms()
    }, [userId, renderTrigger]);  // Ensure it re-runs if userId changes

    // If chatRooms changes, rerender and make a new contact list
    useEffect(() => {
        console.log("chatRooms updated:", chatRooms);
        const generateContacts = (chatRoomData) => {
            let contacts = []
            let index = 0

            chatRoomData.forEach((chatRoom) => {
                // We want the contact name to not be the current user's name but the other user who is in the chat.
                if (userId === chatRoom.user1Id) {
                    contacts.push({id: index, name: chatRoom.user2Name})
                    index += 1
                } else {
                    contacts.push({id: index, name: chatRoom.user1Name})
                    index += 1
                }
            });
            return contacts
        }

        let contactList = generateContacts(chatRooms)
        console.log("Contact List:", contactList)
        setContacts(contactList)
        // setSelectedContacts(0)
    }, [chatRooms]); // This useEffect will run after chatRooms is updated

    useEffect(() => {
        if (selectedContact !== null) {
            console.log("Selected Contact Updated:", selectedContact)
            console.log("Chat Room for selected contact", chatRooms[selectedContact])

            let messageList = chatRooms[selectedContact].messages
            setMessages(messageList)
        }
    }, [selectedContact, chatRooms]); // This useEffect will run after selectedContact is updated


    const handleContactClick = (id) => {
        setSelectedContact(id);
    };

    return (
        <Box sx={{display: 'flex'}}>
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
                <Toolbar/>
                {/* List of Conversations/Contacts */}
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {contacts.map((contact) => (
                            <ListItem button key={contact.id} onClick={() => handleContactClick(contact.id)}>
                                <ListItemText primary={contact.name}/>
                            </ListItem>
                        ))}
                        <ListItem>
                            <NewChatRoomDialog open={dialogOpen} setOpen={setDialogOpen} currentUserId={userId} renderTrigger={renderTrigger} setRenderTrigger={setRenderTrigger}/>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Messages Header */}
            <Box sx={{flexGrow: 1, p: 3}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Messenger
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Paper style={{height: 'calc(75% - 64px)', overflow: 'auto', marginTop: '24px'}}>
                    <List>
                        {messages.map((message) => (
                            <ListItem key={message.senderId} alignItems="flex-start" sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: message.senderId !== userId ? 'flex-end' : 'flex-start'
                            }}>
                                <Box
                                    sx={{
                                        maxWidth: '70%',
                                        backgroundColor: message.senderId === userId ? '#8e44ad' : '#ffffff',
                                        color: message.senderId === userId ? '#ffffff' : '#000000',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        textAlign: message.senderId !== userId ? 'right' : 'left',
                                        wordBreak: 'break-word',
                                        boxShadow: 1
                                    }}
                                >
                                    <ListItemText primary={message.text}
                                                  primaryTypographyProps={{style: {color: message.senderId === userId ? 'white' : 'black'}}}/>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                {/* Message Input */}
                <MessageInput selectedContact={selectedContact} chatRooms={chatRooms} renderTrigger={renderTrigger} setRenderTrigger={setRenderTrigger}/>
            </Box>
        </Box>
    );
}

export default Messenger;
