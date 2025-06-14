const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 3000;
require("express-async-errors");

const { UPLOADS_FOLDER } = require("./configs/upload");

const AppError = require("./utils/AppError");
const routes = require("./routes");

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

app.use(express.json({ limit: '5mb' }));

app.use(routes);

app.use('/files', express.static(UPLOADS_FOLDER));

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
