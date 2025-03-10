// Load environment variables from .env file
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file in the project root
dotenv.config({ path: resolve(__dirname, '..', '.env') });

// Export environment variables for use in other modules
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;