import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import postroutes from "./routes/postsroutes.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blogpost api",
      description: "api för att hantera blogpost",
      version: "1.0.0",
    },
  },
  apis: ["index.js", "./routes/*.js"],
};

const docs = swaggerJSDoc(options);

const server = express();
server.use(express.json());
const PORT = 3000;

server.use("/swagger-docs", swaggerUI.serve, swaggerUI.setup(docs));
server.use("/insider", postroutes);

server.listen(PORT || 3000, () =>
  console.log(`Up and running at port ${PORT}`)
);
