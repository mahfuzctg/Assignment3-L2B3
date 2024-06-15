import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL || "",
  default_pass: process.env.DEFAULT_PASS || "",
  bcrypt_salt_rounds: process.env.BCRYPT_SAlT_ROUNDS || 10,
  jwt_secret:
    process.env.JWT_SECRET ||
    "72849ac5327e85131a038bcd2156f283064936cdcb4f742e81f5eaeb2a26de47",
};
