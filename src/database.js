'use strict';

import mariadb from 'mariadb';
import env from 'dotenv';

env.config()

const password = process.env.DB_PASS;
const user = process.env.DB_USER;
const database = process.env.DB_BASE;
const host = process.env.DB_HOST;
const connectionLimit = 5;
const connectTimeout = 3000;

export const pool = mariadb.createPool({
  host,
  database,
  user,
  password,
  connectionLimit
});

export const getConnection = async () => {
  await pool.getConnection()
    .then( conn => {
      console.log('Database is connected','idconnection:',conn.threadId);
      conn.release();
    })
    .catch( err => {
      console.log("Not connected due to error",err) 
    })
 }
