"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "주문 ID", width: 100 },
  { field: "createdAt", headerName: "주문일시", width: 180 },
  { field: "dueDate", headerName: "납기일자", width: 150 },
  { field: "priority", headerName: "우선순위", width: 120 },
  { field: "status", headerName: "상태", width: 120 },
];

export default function OrderListPage() {
  const [rows, setRows] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get("http://127.0.0.1:8080/api/order").then((response) => {
      console.log(response.data);
      setRows(response.data.orders);
      // window.alert(response.data.status);
    });
  }, []);

  return (
    <Card className="p-4">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          📦 주문 목록
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          현재 시스템에 등록된 주문 정보입니다.
        </Typography>
        <div style={{ height: 500, marginTop: 16 }}>
          <DataGrid
            onRowClick={(data) => {
              console.log(router);
              router.push("/order/" + data.id);
            }}
            density="compact"
            rows={rows}
            disableColumnSelector
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
