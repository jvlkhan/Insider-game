import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import routes from "./routes/routes.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Insider Game",
      description: "api för Insider Game",
      version: "1.0.0",
    },
  },
  apis: ["index.js", "./routes/*.js"],
};

const docs = swaggerJSDoc(options);

const server = express();
server.use(express.json());
const PORT = 5000;

server.use("/swagger-docs", swaggerUI.serve, swaggerUI.setup(docs));
server.use("/insider", routes);

server.listen(PORT || 5000, () =>
  console.log(`Up and running at port ${PORT}`)
);
