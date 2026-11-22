import "dotenv/config";
import { app } from "./app.js";

const port = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`API Running on port ${port}`);
});
