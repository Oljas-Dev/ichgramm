import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
