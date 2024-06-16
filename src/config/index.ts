import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), ".env") });

// Destructure environment variables with default values
const {
  NODE_ENV = "development",
  PORT = "5000", // Default PORT as a string
  DATABASE_URL,
  BCRYPT_SALT_ROUNDS = "10", // Default BCRYPT_SALT_ROUNDS as a string
  DEFAULT_PASS,
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN = "1d", // Default JWT_ACCESS_EXPIRES_IN as a string representing a timespan
} = process.env;

// Define configuration object
const config = {
  node_env: NODE_ENV,
  port: PORT,
  database_url: DATABASE_URL,
  bcrypt_salt_rounds: parseInt(BCRYPT_SALT_ROUNDS, 10), // Parse BCRYPT_SALT_ROUNDS as a number
  default_pass: DEFAULT_PASS,
  jwt_access_secret: JWT_ACCESS_SECRET,
  jwt_access_expires_in: JWT_ACCESS_EXPIRES_IN, // Assign JWT_ACCESS_EXPIRES_IN directly as it's already a string
};

export default config;
