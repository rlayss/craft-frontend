"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function BomPage() {
  const [rows, setRows] = useState([]);

  useEffect(function () {
    fetch("http://127.0.0.1:8080/api/bom", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRows(data.boms);
      });
  }, []);

  return (
    <>
      <h1>BOM</h1>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Parent Product</TableCell>
              <TableCell align="right">Child Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.parentProduct.id}
                </TableCell>
                <TableCell align="right">{item.childProduct.id}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
