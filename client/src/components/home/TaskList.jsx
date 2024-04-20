import React, { useState } from 'react';
import { Box, Button, TextField, List, ListItem, Typography } from '@mui/material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px' }}>
        <TextField
          variant="outlined"
          size="small"
          label="New Task"
          value={taskInput}
          onChange={handleInputChange}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" color="primary" type="submit">Add</Button>
      </form>
      <List sx={{ mt: 2 }}>
        {tasks.map((task, index) => (
          <ListItem key={index}>{task}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
