import React, {useEffect} from 'react';
import { makeStyles, withStyles, InputLabel, MenuItem, FormControl, Select, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, } from '@material-ui/core';
import { BlobServiceClient } from '@azure/storage-blob';

let userA = localStorage.getItem("account");
export var containerName = (userA || '');
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  table: {
    minWidth: 700,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createBook(name) {
  return { name };
}

export const getBlobNames = async (sas, contName) => {
  const blobService = new BlobServiceClient(
    `https://proyectosoa.blob.core.windows.net/?${sas}`
  );
  const containerClient = blobService.getContainerClient(contName);
  const blobNames = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    blobNames.push(blob.name);
  }
  return blobNames;
}

const WorkerList = () => {
  const classes = useStyles();
  const [book, setBook] = React.useState('');
  const [rowsBook, set_rowsBook] = React.useState([]);
  const [rowsWorkers, set_rowsWorkers] = React.useState([]);
  
  const handleChange = (event) => {
    setBook(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {
    const user = localStorage.getItem("account");
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
    var SAS = json[0].sas;
    console.log(SAS)
    let list = [];
    let listBooks = [];
    list = await getBlobNames(SAS, user);
    for(var i =0; i < list.length; i++){
      listBooks[i] = createBook(list[i]);
    }
    console.log("list books: " + listBooks);
    set_rowsBook(listBooks);
  }, []);

  const handleOpen = async () => {
    let test = await fetch('http://localhost:4000/Workers', {
      method: 'GET',
      headers : {
        Accept: '*/*',
        'Content-Type': 'text/plain',
        documentName: book
      },
    });
    const json = await test.json();  
    console.log("lo que llega: -------- " + json);
    set_rowsWorkers(json);
  };

  return (
    <div>
      <Typography variant="h6" color="initial"> Select the book's name for  consult:</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Book name</InputLabel>
        <Select
          value={book}
          onChange={handleChange}
        >
          {rowsBook.map((rowBook) => (
          <MenuItem value={rowBook.name}>{rowBook.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <p></p>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Accept
      </Button>
      <p></p>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Times appeared</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsWorkers.map((row) => (
              <StyledTableRow key={row.person_name}>
                <StyledTableCell component="th" scope="row">
                  {row.person_name}
                </StyledTableCell>
                <StyledTableCell>{row.times}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default WorkerList;