import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import ApplicationRouter from "./routes/application.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

const _dirname = path.resolve();

// ✅ Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

const corsOptions = {
  origin: [
  https://jobwebsite-ls18.onrender.com,
    "https://hoppscotch.io",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

//router apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", ApplicationRouter);

app.use(express.static(path.join(_dirname, "/frontend/dist")));

app.get(/^\/(?!api)/, (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// http://localhost:3030/api/v1/user/register

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server start failed:", error.message);
  }
};

startServer();
