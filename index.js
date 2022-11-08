import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";
import notesRouter from "./routes/notesRoute.js";
import userRouter from "./routes/userRoute.js";
import path from "path";

const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
