import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/produk", async (_, res) => {
  try {
    const dataProduk = await prisma.produk.findMany();
    dataProduk && res.status(200).json(dataProduk);
  } catch (error) {
    console.log(`Error saat get produk data: ${error}`);
  }
});

app.post("/produk", async (req, res) => {
  try {
    const insertProduk = await prisma.produk.create({ data: req.body });
    insertProduk &&
      res.status(201).json({ message: "Data Berhasil Ditambahkan" });
  } catch (error) {
    console.log(`Error saat post data produk ${error}`);
  }
});
app.listen(PORT, () =>
  console.log(`server up and runnning on http://localhost:${PORT}`)
);
