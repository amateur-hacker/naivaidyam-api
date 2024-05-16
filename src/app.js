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

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });
app.use(responseMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const whitelist = ["https://naivaidyam.vercel.app", "http://localhost:5173"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   // credentials: true,
// };
//
// app.use(cors(corsOptions));
app.use(function (req, res, next) {
  var allowedDomains = [
    "https://naivaidyam.vercel.app",
    "http://localhost:5173",
  ];
  var origin = req.headers.origin;
  if (allowedDomains.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept",
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
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
