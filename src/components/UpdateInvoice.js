import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebase";
import { Link, useNavigate, useParams } from "react-router-dom";

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

const UpdateInvoice = () => {
  const [itemName, setItemName] = useState("");
  const [item, setItem] = React.useState("");
  const [price, setPrice] = React.useState("0");
  const [invoiceName, setInvoiceName] = React.useState("");
  const invoicesCollectionRef = collection(db, "Invoice");

  const navigate = useNavigate();

  useEffect(() => {
    const getInvoiceList = async () => {
      try {
        const data = await getDoc(doc(invoicesCollectionRef, params.id));
        setItemName(data.data().itemName);
        setItem(data.data().item);
        setPrice(data.data().price);
        setInvoiceName(data.data().invoiceName);
      } catch (err) {
        console.error(err);
      }
    };
    getInvoiceList();
  }, []);

  const validation = () => {
    if (itemName !== "" && item !== "" && price !== "" && invoiceName !== "") {
      return true;
    }

    return false;
  };

  const updateInvoiceFn = async (e) => {
    e.preventDefault();

    if (validation()) {
      let invoice = doc(invoicesCollectionRef, params.id);

      await setDoc(invoice, {
        itemName,
        item,
        price,
        invoiceName,
      }).then(() => {
        alert("Updated");
      });
      navigate("/");
    }
  };

  const params = useParams();
  return (
    <Container maxWidth={"md"} sx={{ marginTop: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Update Invoice</Typography>
        <Link to={"/"}>
          <Button sx={{ textTransform: "capitalize" }} size="small">
            Invoice List
          </Button>
        </Link>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
        }}
        noValidate
        autoComplete="off"
      >
        <InputLabel>Invoice</InputLabel>
        <TextField
          value={invoiceName}
          id="outlined-basic"
          label="Invoice    "
          variant="outlined"
          size="small"
          onChange={(event) => setInvoiceName(event.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell align="center">Items</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
              {/* <StyledTableCell align="center"></StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {[rows].map((row) => ( */}
            <StyledTableRow key={1}>
              <StyledTableCell component="th" scope="row">
                <TextField
                  value={itemName}
                  id="outlined-basic"
                  label="Item Name"
                  variant="outlined"
                  size="small"
                  onChange={(event) => setItemName(event.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField
                  value={item}
                  id="outlined-basic"
                  label="Item"
                  variant="outlined"
                  size="small"
                  type="number"
                  onChange={(event) => setItem(event.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextField
                  value={price}
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  size="small"
                  type="number"
                  onChange={(event) => setPrice(event.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="right">{price}</StyledTableCell>
              {/* <StyledTableCell align="right">*</StyledTableCell> */}
            </StyledTableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={{ textTransform: "capitalize", width: "150px" }}
              variant="outlined"
              disabled
            >
              Add Item
            </Button>
            <Button
              sx={{ textTransform: "capitalize", width: "150px" }}
              variant="outlined"
              onClick={updateInvoiceFn}
            >
              Create
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Stack direction="row" spacing={3}>
              <Typography variant="body1">Sub Total</Typography>
              <Typography variant="body1">{price}</Typography>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Typography variant="body1">Tax</Typography>
              <Typography variant="body1">{price}</Typography>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Typography variant="body1">Total</Typography>
              <Typography variant="body1">{price}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UpdateInvoice;
