import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

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

function createData(document, progress, documentFeel, ofensiveContent) {
  return { document, progress, documentFeel, ofensiveContent };
}

const rows = [{document:"LOR", progress: "100", documentFeel: "Hapyy", ofensiveContent: "No"},
{document:"LOR2", progress: "50", documentFeel: "Angry", ofensiveContent: "Si"},
{document:"LOR3", progress: "10", documentFeel: "Ofensive", ofensiveContent: "Si"}];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Progress = () => {
  const classes = useStyles();
  const [rows, set_rows] = React.useState([]);

  useEffect(async () => {
    const response = await fetch('http://localhost:4000/Progress', {
      method: 'GET',
      headers : {
        Accept: '*/*',
        'Content-Type': 'text/plain',
        user: localStorage.getItem("account")
      },
    });
    const json = await response.json();
    //console.log(json);
    set_rows(json);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Document</StyledTableCell>
            <StyledTableCell >Progress</StyledTableCell>
            <StyledTableCell >Document Feel</StyledTableCell>
            <StyledTableCell >Ofensive Content</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.document}>
              <StyledTableCell component="th" scope="row">
                {row.document}
              </StyledTableCell>
              <StyledTableCell>{row.progress}</StyledTableCell>
              <StyledTableCell>{row.documentFeel}</StyledTableCell>
              <StyledTableCell>{row.ofensiveContent}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Progress;