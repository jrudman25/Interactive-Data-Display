/*
 * JS for MenuBar component
 */

import React, {useState} from "react";
import {AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";

const MenuBar = (props) => {
    const [anchorElFile, setAnchorElFile] = useState(null);
    const openFile = Boolean(anchorElFile);
    const handleClickFile = (event) => {
        setAnchorElFile(event.currentTarget);
    };
    const handleCloseFile = (event) => {
        setAnchorElFile(null);
        if (event.target.attributes.id !== undefined) {
            props.onFile(event.target.attributes.id.value);
        }
    };

    const [anchorElEdit, setAnchorElEdit] = useState(null);
    const openEdit = Boolean(anchorElEdit);

    const handleClickEdit = (event) => {
        setAnchorElEdit(event.currentTarget);
    };

    const handleCloseEdit = (event) => {
        setAnchorElEdit(null);
        if (event.target.attributes.id !== undefined) {
            props.onEdit(event.target.attributes.id.value);
        }
    };

    return(
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button
                            id="file-button"
                            aria-controls={openFile ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openFile ? 'true' : undefined}
                            onClick={handleClickFile}
                            sx={{ bgcolor: 'white', color: 'blue', m: 0.5}}
                        >
                            File
                        </Button>
                        <Menu
                            id="file-menu"
                            MenuListProps={{
                                'aria-labelledby': 'file-button',
                            }}
                            anchorEl={anchorElFile}
                            open={openFile}
                            onClose={handleCloseFile}
                        >
                            <MenuItem id="new" onClick={handleCloseFile}>New</MenuItem>
                            <MenuItem id="load" onClick={handleCloseFile}>Load</MenuItem>
                            <MenuItem id="save" onClick={handleCloseFile}>Save</MenuItem>
                            <MenuItem id="saveas" onClick={handleCloseFile}>Save As</MenuItem>
                        </Menu>
                        <Button
                            id="edit-button"
                            aria-controls={openEdit ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openEdit ? 'true' : undefined}
                            onClick={handleClickEdit}
                            sx={{ bgcolor: 'white', color: 'blue', m: 0.5}}
                        >
                            Edit
                        </Button>
                        <Menu
                            id="edit-menu"
                            MenuListProps={{
                                'aria-labelledby': 'edit-button',
                            }}
                            anchorEl={anchorElEdit}
                            open={openEdit}
                            onClose={handleCloseEdit}
                        >
                            <MenuItem id="undo" onClick={handleCloseEdit}>Undo</MenuItem>
                            <MenuItem id="redo" onClick={handleCloseEdit}>Redo</MenuItem>
                            <MenuItem id="remove" onClick={handleCloseEdit}>Remove</MenuItem>
                            <MenuItem id="copy" onClick={handleCloseEdit}>Copy</MenuItem>
                            <MenuItem id="paste" onClick={handleCloseEdit}>Paste</MenuItem>
                        </Menu>
                        <Typography variant="h6" component="div" align="center" width="100%">
                            Interactive Data Visualization
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        );
};

export default MenuBar;
