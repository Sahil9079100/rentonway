import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Create a new Sequelize instance with MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME || 'renton_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;