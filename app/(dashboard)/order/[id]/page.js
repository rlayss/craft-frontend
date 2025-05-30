"use client";

import {
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const itemColumns = [
  { field: "id", headerName: "아이템 ID", width: 100 },
  { field: "productId", headerName: "제품 코드", width: 160 },
  { field: "productName", headerName: "제품명", width: 180 },
  { field: "quantity", headerName: "수량", width: 100 },
  { field: "status", headerName: "상태", width: 120 },
];

export default function OrderDetailPage() {
  const [orderInfo, setOrderInfo] = useState({});
  const [itemRows, setItemRows] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/api/order/" + id).then((response) => {
      setOrderInfo(response.data.order);
      setItemRows(response.data.orderItems);
    });
  }, []);

  return (
    <Card className="p-6">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          📋 주문 상세 - #{orderInfo.id}
        </Typography>

        {/* 주문 정보 요약 */}
        <Table size="small" sx={{ mb: 3 }}>
          <TableBody>
            <TableRow>
              <TableCell>주문 ID</TableCell>
              <TableCell>#{orderInfo.id}</TableCell>
              <TableCell>주문일시</TableCell>
              <TableCell>{orderInfo.createdAt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>납기일자</TableCell>
              <TableCell>{orderInfo.dueDate}</TableCell>
              <TableCell>우선순위</TableCell>
              <TableCell>{orderInfo.priority}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>상태</TableCell>
              <TableCell colSpan={3}>
                <Chip label={orderInfo.status} color="primary" size="small" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Typography variant="subtitle1" gutterBottom>
          ▸ 주문 품목 목록
        </Typography>
        <div style={{ height: 400 }}>
          <DataGrid
            rows={itemRows}
            columns={itemColumns}
            density="compact"
            rowHeight={36}
            pageSizeOptions={[5]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
