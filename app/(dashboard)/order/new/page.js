"use client";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export default function NewOrderPage() {
  const [dueDate, setDueDate] = useState();
  const [items, setItems] = useState([{}]);

  const addOrderHandle = function () {
    console.log(dueDate);
    console.log(items);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5">주문 등록</Typography>
      </Paper>
      <Box sx={{ p: 2 }}>
        <TextField
          type="date"
          size="small"
          onChange={(evt) => {
            setDueDate(evt.target.value);
          }}
        />
      </Box>
      <Box>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setItems([...items, {}]);
            }}
          >
            + 항목 추가
          </Button>
          <Button variant="outlined" onClick={addOrderHandle}>
            {" "}
            주문 등록
          </Button>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>제품 코드</TableCell>
              <TableCell>수량</TableCell>
              <TableCell align="center">삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((e, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <TextField
                    size="small"
                    onChange={(evt) => {
                      items[idx].productId = evt.target.value;
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    onChange={(evt) => {
                      items[idx].quantity = evt.target.value;
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button>삭제</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
