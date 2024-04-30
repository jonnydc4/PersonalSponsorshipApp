import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Paper
} from '@mui/material';
import NewChatRoomDialog from "./newChatRoomDialog";
import MessageInput from "./messageInput";

function Messenger() {
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  const localUser = localStorage.getItem(userId);

  const [selectedContactId, setSelectedContactId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);


  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await fetch(`/api/getChatRoomsForUser?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chat rooms');
        }
        const data = await response.json();
        setChatRooms(data);
        console.log(localUser)
        if (data.length > 0 && selectedContactId === null) {
          // Set the first chat room as the selected one by default
          setSelectedContactId(data[0]._id);
        }
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error);
      }
    };
    fetchChatRooms();
  }, [userId, renderTrigger]);

  useEffect(() => {
    const newContacts = chatRooms.map(chatRoom => ({
      id: chatRoom._id,
      name: userId === chatRoom.user1Id ? chatRoom.user2Name : chatRoom.user1Name
    }));
    setContacts(newContacts);
  }, [chatRooms, userId]);

  useEffect(() => {
    const selectedChatRoom = chatRooms.find(room => room._id === selectedContactId);
    if (selectedChatRoom) {
      setMessages(selectedChatRoom.messages);
    }
  }, [selectedContactId, chatRooms]);

  const handleContactClick = roomId => {
    setSelectedContactId(roomId);
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
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {contacts.map(contact => (
              <ListItem key={contact.id} button onClick={() => handleContactClick(contact.id)}>
                <ListItemText primary={contact.name} />
              </ListItem>
            ))}
            <ListItem>
              <NewChatRoomDialog
                currentUserId={userId}
                renderTrigger={renderTrigger}
                setRenderTrigger={setRenderTrigger}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

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
                        {messages.map((message) => (
                            <ListItem key={message.id} alignItems="flex-start" sx={{
                                display: 'flex',
                                justifyContent: message.sender == localUser ? 'flex-end' : 'flex-start',
                            }}>
                                <Box
                                    sx={{
                                        maxWidth: '70%',
                                        backgroundColor: message.sender === localUser ? 'white' : '#8e44ad', 
                                        color: message.sender === localUser ? 'black' : 'white',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        textAlign: message.sender === localUser ? 'right' : 'left',
                                        wordBreak: 'break-word',
                                        boxShadow: 1,
                                    }}
                                >
                                    <ListItemText primary={message.text} />
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Paper>

        {selectedContactId && <MessageInput selectedRoomId={selectedContactId} renderTrigger={renderTrigger} setRenderTrigger={setRenderTrigger} />}
      </Box>
    </Box>
  );
}

export default Messenger;
