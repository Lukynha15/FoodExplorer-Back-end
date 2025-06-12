const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 3333;
require("express-async-errors");

const AppError = require("./utils/AppError");
const routes = require("./routes");

app.use(express.json());

app.use(routes);
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173/"],
  credentials: true
}));

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
