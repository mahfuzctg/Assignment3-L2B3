
import mongoose from 'mongoose';

import app from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

main();