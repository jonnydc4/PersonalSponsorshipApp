import React, { useState } from 'react';
import { Grid, Paper, List, ListItem, ListItemText, Typography } from '@mui/material';

const CommonFrame = ({ items, children, onSelectItem, searchBar }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        onSelectItem?.(item);
    };

    return (
        <Grid container spacing={2}>
            {/* Sidebar for Selectable List */}
            <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ maxHeight: 'calc(100vh - 64px)', overflow: 'auto' }}>
                    {searchBar}
                    <List>
                        {items.map((item, index) => (
                            <ListItem button key={index} onClick={() => handleItemClick(item)}>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>

            {/* Main Content Area */}
            <Grid item xs={12} md={8}>
                <Paper elevation={1} sx={{ padding: 2 }}>
                    {selectedItem ? (
                        <>
                            <Typography variant="h5">{selectedItem.name}</Typography>
                            {Object.entries(selectedItem).map(([key, value]) => (
                                key !== 'id' && <Typography key={key}><strong>{key}:</strong> {value}</Typography>
                            ))}
                        </>
                    ) : (
                        <Typography>Select an item from the list to view its details.</Typography>
                    )}
                    {/* Additional Content Area */}
                    {children}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default CommonFrame;
