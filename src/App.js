/*
 * JS for App component
 */

import React, {useEffect, useState} from 'react';
import Item from './Item.js';
import MenuBar from './MenuBar';
import BarChart from './BarChart';
import Table from './Table';
import ScatterPlot from './ScatterPlot'
import {Box, Container} from "@mui/system";
import FileLoadDialog from './FileLoadDialog.js';
import FileSaveAsDialog from "./FileSaveAsDialog";
import './load.js';

let history = []; // to track changes
let future = []; // to track undone changes
let didMount = true;
const { defaultData } = require('./load');

const App = (props) => {
    const [fileName, setFileName] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [data, setData] = useState(defaultData);
    const [selection, setSelection] = useState([]);
    const [clipboard, setClipboard] = useState([]);
    const [fileLoadDialog, setFileLoadDialog] = useState(false);
    const [fileSaveAsDialog, setFileSaveAsDialog] = useState(false);

    // gets list of files
    const init = () => {
        let newFileList = [];
        for (let i = 0; i < localStorage.length; i++) {
            newFileList.push(localStorage.key(i));
         }
        setFileList(newFileList);
    }
    // Invoked by components when selecting a data point (a click on a bar)
    const handleSelection = (event) => {
        // Copy the current selection into a new array, otherwise the state won't update
        let newSelection = [];
        // Get the data point index from the event. parseInt invoked if a string is passed instead of a number.
        let index = parseInt(event.target.dataPointIndex);
        // If the index is not selected, select it (add it to the array)
        if (!selection.includes(index)) {
            newSelection.push(index);
        }
        // Add the current selection, otherwise the state won't update
        selection.forEach((item) => {
            // If the index is already selected, unselect it (don't copy it to the new array)
            if (item !== index) {
                newSelection.push(item);
            }
        });
        setSelection(newSelection);
    };

    // Handles all changes
    const handleChange = (event) => {
        let newData = structuredClone(data);
        let pointIndex = event.target.attributes.pointId.value;
        let keys = newData.data.length > 0 ? Object.keys(newData.data[0]) : ["key1", "key2"];
        if (pointIndex === "append") {
            let newPoint = {};
            newPoint[keys[0]] = "x";
            newPoint[keys[1]] = 1;
            history.push(structuredClone(data));
            future = [];
            newData.data.push(newPoint);
        }
        else if (pointIndex === "caption") {
            newData.title = event.target.value;
        }
        else if (event.target.attributes.pointId !== undefined) {
            let attributeIndex = event.target.attributes.attributeId.value;
            if (pointIndex === "header") {
                let newKey = event.target.value;
                newData.data.forEach((item, index) => {
                    let tmp = {};
                    keys.forEach((attribute, index1) => {
                        if (index1 === attributeIndex) {
                            tmp[newKey] = item[attribute];
                        }
                        else {
                            tmp[attribute] = item[attribute];
                        }
                    });
                    newData.data[index] = structuredClone(tmp);
                });
            }
            else {
                newData.data[pointIndex][keys[attributeIndex]] = attributeIndex === 0?  event.target.value : parseFloat(event.target.value);
            }
        }
        setData(newData);
    };

    // File functionality
    const handleFile = (event) => {
        if (event === undefined) {
            return;
        }
        switch (event) {
            case "new":
                let newFile = {};
                newFile.title = "Untitled";
                newFile.data = [];
                setFileName(null);
                setData(newFile);
                break;
            case "load":
                setFileLoadDialog(true);
                break;
            case "save":
                if (fileName == null){
                    setFileSaveAsDialog(true);
                }
                else {
                    localStorage.setItem(fileName, JSON.stringify(data));
                }
                break;
            case "saveas":
                setFileSaveAsDialog(true);
                break;
            default:
                console.log("default");
        }
    }

    // Edit functionality
    const handleEdit = (event) => {
        if (event === undefined) {
            return;
        }
        switch (event) {
            case "undo":
                if (history.length > 0) {
                    future.push(structuredClone(data));
                    setData(history.pop());
                }
                break;
            case "redo":
                if (future.length > 0) {
                    history.push(structuredClone(data));
                    setData(future.pop());
                }
                break;
            case "remove":
                if (selection.length > 0) {
                    history.push(structuredClone(data));
                    let newData = structuredClone(data);
                    selection.sort().reverse().forEach((index) => {
                        newData.data.splice(index, 1);
                    });
                    setData(newData);
                    setSelection([]);
                    future = [];
                }
                break;
            case "copy":
                let newClipboard = [];
                selection.forEach((item) => {
                    newClipboard.push(item);
                });
                setClipboard(newClipboard);
                break;
            case "paste":
                if (clipboard.length > 0) {
                    history.push(structuredClone(data));
                    let newData = structuredClone(data);
                    clipboard.sort().forEach((item) => {
                        newData.data.push(structuredClone(data.data[item]));
                    });
                    setData(newData);
                }
                break;
            default:
                console.log("default");
        }

    }

    // Loading
    const handleFileLoad = (selectedFileName) => {
        setFileLoadDialog(false);
        if (selectedFileName != null) {
            setFileName(selectedFileName);
            setData(JSON.parse(localStorage.getItem(selectedFileName)));
        }
    }

    // Save As
    const handleFileSaveAs = (selectedFileName) => {
        setFileSaveAsDialog(false);
        console.log(selectedFileName);
        if (selectedFileName != null) {
            if (!fileList.includes(selectedFileName)) {
                let newFileList = structuredClone(fileList);
                newFileList.push(selectedFileName);
                setFileName(selectedFileName);
                localStorage.setItem(selectedFileName, JSON.stringify(data));
                setFileList(newFileList);
            }
        }
    }
    useEffect(() => {
        // ComponentDidMount check
        if (didMount) {
            didMount = false;
            init();
        }
    });

    return (
        <Container className="App" >
            <MenuBar
                onFile={handleFile}
                onEdit={handleEdit}
            >
            </MenuBar>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 3fr)' }} >
                <Item>
                    <Table
                        dataset={data}
                        handleChange={handleChange}
                        onSelect={handleSelection}
                        selection={selection}
                        sx={{ bgcolor: 'white', width: '100%', height: '100%'}}
                    >
                    </Table>
                </Item>
                <Item>
                    <BarChart
                        min={0}
                        dataset={data}
                        onSelect={handleSelection}
                        selection={selection}
                        sx={{ bgcolor: 'white', width: '100%', height: '100%'}}
                    >
                    </BarChart>
                </Item>
                <Item>
                    <ScatterPlot
                        min={0}
                        onSelect = {handleSelection}
                        selection = {selection}
                        dataset={data}
                        sx={{ bgcolor: 'white', width: '100%', height: '100%'}}
                    >
                    </ScatterPlot>
                </Item>
            </Box>
            <FileLoadDialog
                files={fileList}
                open={fileLoadDialog}
                handleFileLoad={handleFileLoad}
            />
            <FileSaveAsDialog
                open={fileSaveAsDialog}
                handleFileSaveAs={handleFileSaveAs}
            />
        </Container>
    );

}

export default App;
