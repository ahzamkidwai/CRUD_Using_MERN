const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const DBConnect = require("./config/database");
const errorMiddleware = require("./middlewares/error-middleware");
const serviceRouter = require("./router/services-router");
const adminRouter = require("./router/admin-router")
const PORT = 5000;

//Using Cors to connect FrontEnd to BackEnd (React to MongoDB Atlas)
const corsOptions = {
  origin: "http://localhost:3000",
  method: "GET, POST, DELETE, PATCH, PUT",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());
app.use("/", authRouter);
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);
app.use("/api/admin", adminRouter);

// To handle all errors using Express
app.use(errorMiddleware);

// To connect Database,
DBConnect().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`Server is running at PORT ${PORT}`);
  });
});
