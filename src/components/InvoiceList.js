import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const InvoiceList = () => {
  const navigate = useNavigate();

  const [invoiceLists, setInvoiceLists] = React.useState([]);
  const invoicesCollectionRef = collection(db, "Invoice");

  useEffect(() => {
    const getInvoices = async () => {
      const data = await getDocs(invoicesCollectionRef);
      setInvoiceLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInvoices();
  }, []);

  useEffect(() => {
    const getInvoices = async () => {
      const data = await getDocs(invoicesCollectionRef);
      setInvoiceLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInvoices();
  }, [invoiceLists]);

  const deleteInvoice = async (id) => {
    const invoiceDoc = doc(invoicesCollectionRef, id);
    await deleteDoc(invoiceDoc);
    navigate("/");
  };

  return (
    <Container maxWidth={"md"}>
      <Typography variant="h6" mt={5}>
        Invoice List
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "space-between",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Search..." variant="outlined" />
        <Link to={"/add-new-invoice"}>
          <Button sx={{ textTransform: "capitalize" }} size="small">
            Add New
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell align="right">Item</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceLists.map((row) => (
              <StyledTableRow key={row.ItemName}>
                <StyledTableCell component="th" scope="row">
                  <Link to={`/update-invoice/${row.id}`}>{row.itemName}</Link>
                </StyledTableCell>
                <StyledTableCell align="right">{row.item}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.price}{" "}
                  <button
                    onClick={() => {
                      deleteInvoice(row.id);
                    }}
                  >
                    &#128465;
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default InvoiceList;
