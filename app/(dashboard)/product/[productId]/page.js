"use client";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [boms, setBoms] = useState([]);
  const [materials, setMaterials] = useState([]);
  useEffect(function () {
    fetch("http://127.0.0.1:8080/api/product/" + productId, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.product);
        setBoms(data.boms);
        setMaterials(data.materials);
      });
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        제품 상세 정보
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="subtitle2" color="textSecondary">
              제품명
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{product.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" color="textSecondary">
              제품 ID
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{product.id}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1">구성자재</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {materials.map((one) => (
              <Chip
                label={
                  one.product.name +
                  " (" +
                  one.quantity +
                  one.product.unit +
                  ")"
                }
              ></Chip>
            ))}
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ minHeight: 352, minWidth: 250 }}>
        <CardContent>
          <Typography variant="subtitle1">BOM 구성 트리</Typography>
          <RichTreeView items={boms} />
        </CardContent>
      </Card>
    </>
  );
}
