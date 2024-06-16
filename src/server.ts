import mongoose from "mongoose";

import app from "./app";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("mongoDB connected");
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
console.log("Database URL:", config.database_url);
console.log("BCrypt Salt Rounds:", config.bcrypt_salt_rounds);
console.log("Default Pass:", config.default_pass);
console.log("JWT Access Secret:", config.jwt_access_secret);
main();
