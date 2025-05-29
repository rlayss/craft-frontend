"use client";

import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

function ProductPage() {
  const columns = [
    { headerName: "ID", field: "id", width: 190 },
    {
      headerName: "NAME",
      field: "name",
      width: 150,
      editable: true,
    },
    {
      headerName: "TYPE",
      field: "type",
      width: 150,
      editable: true,
    },
    {
      headerName: "UNIT",
      field: "unit",
      width: 90,
      editable: true,
    },
    {
      headerName: "STANDARD COST",
      field: "standardCost",
      width: 160,
      editable: true,
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/product", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRows(data.products);
      });
  }, []);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  return (
    <Box sx={{ width: "100%", height: 600 }}>
      <h1>Product</h1>
      <Button
        onClick={function () {
          console.log(rows);
        }}
      >
        테스트
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 8 } },
        }}
      />
    </Box>
  );
}

export default ProductPage;
