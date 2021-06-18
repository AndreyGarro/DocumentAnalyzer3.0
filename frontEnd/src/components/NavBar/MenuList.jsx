import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import { useHistory } from "react-router-dom";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const Listas = () => {
    const history = useHistory();
    return (
        <div>
            <List component='nav'>
                <ListItem button onClick={() => {
                let path = '/Upload'; 
                history.push(path);}}>
                    <ListItemIcon>
                        <CloudUploadIcon />
                    </ListItemIcon>
                    <ListItemText primary='Upload File'/>
                </ListItem>

                <ListItem button onClick={() => {
                let path = '/Progress'; 
                history.push(path);}}>
                    <ListItemIcon>
                        <FindReplaceIcon />
                    </ListItemIcon>
                    <ListItemText primary='Progress Status'/>
                </ListItem>

                <ListItem button onClick={() => {
                let path = '/DocuConsult'; 
                history.push(path);}}>
                    <ListItemIcon>
                        <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary='Documents Consult'/>
                </ListItem>

                <Divider />
            </List>
        </div>
)};

export default Listas;