const express = require("express");
const connectDB = require("./config/dbConnect");
const errorHandler = require("./middleware/error");
//  connecting database
connectDB();

// importing routes
const postRoutes = require("./routers/postRoutes");
const authRoutes = require("./routers/authRoutes");

const app = express();
app.use(express.json());

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ message: `Cannot find ${req.originalUrl} on the server` });
});

const PORT = process.env.PORT || 4000;
//
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});

const server = app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`)
);
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
