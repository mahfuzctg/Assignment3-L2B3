import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const startServer = async () => {
  try {
    await mongoose.connect(config.database_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true as unknown as boolean,
    });
    console.log("Connected to MongoDB");

    const port = config.port || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();
