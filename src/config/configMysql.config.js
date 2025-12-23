import mysql from "mysql2";
import ENVIRONMENT from "./environment.config.js";

const pool=mysql.createPool(
    {
    host: ENVIRONMENT.MYSQL_DB_HOSTNAME,
    user: ENVIRONMENT.MYSQL_DB_USERNAME,
    password: ENVIRONMENT.MYSQL_DB_PASSWORD,
    database: ENVIRONMENT.MYSQL_DB_NAME
    }
).promise()

export async function checkConnection() {
    try{
        await pool.query('SELECT 1')
        console.log('base de datos MYSQL conectada con exito')
    }
    catch(error){
        console.error('error al conectarte a la DB MYSQL')
    }
}

export default pool;