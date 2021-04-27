import express from "express";

//  connecting database
import "./config/dbConnect";

// importing routes
import postRoutes from "./routers/postRoutes";
import authRoutes from "./routers/authRoutes";

const app = express();
app.use(express.json());

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ message: `Cannot find ${req.originalUrl} on the server` });
});

//
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});

const server = app.listen(4000, () => console.log("server running"));
export default server;
