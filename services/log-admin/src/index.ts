import app from "./server";
import { PORT } from "./config";

app.listen(PORT, () => console.log(`📊 Log Admin Panel running at http://localhost:${PORT}`));
