import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import uploadRoute from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoute);

// Backend check up routes
app.get("/", (req, res) => {
  res.send("Backend is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listining on port ${PORT}`));