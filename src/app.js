import express from "express";
import connectDB from "./config/db.js";
import "dotenv/config";
import { responseMiddleware } from "./middlewares/index.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

// app.use((req, res, next) => {
//   req.defaultSuccessStatusCode = 200;
//   req.defaultErrorStatusCode = 400;
//   next();
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(responseMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Hello from Naivaidyam API!</h1>");
});

app.use("/api/v1/auth", authRoutes);

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
})();

export default app;
