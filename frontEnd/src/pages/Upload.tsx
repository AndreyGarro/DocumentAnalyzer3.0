import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import uploadFileToBlob from './storage-blob';
import * as contName from './storage-blob';

var SAS = "";
const storageConfigured = true;
let userA = localStorage.getItem("account");
export var containerName = (userA || '');

const UploadDocument = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    async function getLink() {
      var Hearders = {
        'Accept': '*/*',
        'Content-Type': 'text/plain',
        'user': containerName
      };
      const response = await fetch('http://localhost:4000/Link', {
      method : 'GET',
      headers : new Headers (Hearders)
    });
    const json = await response.json();
    SAS = json[0].sas;
    console.log(SAS);    
    }
    getLink();
  }, []);

  // all blobs in container
  const [blobList, setBlobList] = useState<string[]>([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState(null);

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  const onFileChange = (event: any) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  async function post(file : any) {
    try {
        console.log("Account: " + localStorage.getItem("account"));
        console.log("Container: " + contName.containerName);
        let test = await fetch('http://localhost:4000/Upload', {
                method: 'GET',
                headers : {
                Accept: '*/*',
                'Content-Type': 'text/plain',
                documentName: file,
                user: containerName,
                }});
        const json = await test.json(); 
        console.log(json); 
        if (json[0].status === "ok"){
          console.log("aqui")
          setOpen(true);
        }          
    } catch(err) {
        console.error(`ERROR: ${err}`);
    }
}
  const onFileUpload = async () => {
    // prepare UI
    setUploading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer: string[] = await uploadFileToBlob(fileSelected, SAS);
    
    // prepare UI for results
    setBlobList(blobsInContainer);

    console.log("marcador: " + localStorage.getItem('nameFile'));
    post(localStorage.getItem('nameFile'));

    // reset state/form
    setFileSelected(null);
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };

  // display form
  const DisplayForm = () => (
    <div>
      <Input type="file" color="primary" onChange={onFileChange} key={inputKey || ''} />
      <p />
      <Button variant="contained" color="primary" onClick={onFileUpload}>
        Upload
      </Button>
    </div>
  )
  return (
    <div>
      <Typography variant="h4" >Upload file to analize</Typography>
      <hr />  
      {storageConfigured && !uploading && DisplayForm()}
      {storageConfigured && uploading && <Typography variant = "h6">Uploading...</Typography>}
      
      <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Successful"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  File uploaded successfully!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Accept
                </Button>
              </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadDocument;
