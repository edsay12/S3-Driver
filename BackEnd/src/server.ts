import express, { Express } from "express";
import * as dotenv from "dotenv";
import routes from "./routes/Routes";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is running at port ${process.env.NODE_PORT} `);
});

export default app;
