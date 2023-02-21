/*
 * JS for FileLoadDialog component
 */

import * as React from 'react';
import {Button, Dialog, DialogActions, DialogTitle, List, ListItemButton, ListItemText} from "@mui/material";

// Dialog for Loading screen
const FileLoadDialog = (props) => {

    return (
        <Dialog open={props.open}>
            <DialogTitle>List of Files</DialogTitle>
            <List sx={{ pt: 0 }}>
                {props.files.map((file) => (
                    <ListItemButton onClick={() => props.handleFileLoad(file)} key={file}>
                        <ListItemText primary={file} />
                    </ListItemButton>
                ))}
                <DialogActions>
                    <Button onClick={() => props.handleFileLoad(null)}>Cancel</Button>
                </DialogActions>
            </List>
        </Dialog>
    );
}

export default FileLoadDialog;