/*
 * Project 2
 * JS for FileSaveAsDialog component
 * Author: Jordan Rudman
 */

import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import TextField from "@mui/material/TextField";

let fileName = null;

// Dialog for Save As screen
const FileSaveAsDialog = (props) => {

    const handleChange = (file) => {
        fileName = file;
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Save File</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the file name:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="File Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => handleChange(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleFileSaveAs(null)}>Cancel</Button>
                <Button onClick={() => props.handleFileSaveAs(fileName)}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FileSaveAsDialog;