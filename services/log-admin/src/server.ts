import express from "express";
import apiRoutes from "./routes/api";
import pageRoutes from "./routes/pages";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRoutes);
app.use(pageRoutes);

export default app;
