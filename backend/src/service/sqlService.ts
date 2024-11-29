import mysql from 'mysql2';

const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_DATABASE = process.env.DATABASE_DATABASE

const connection = mysql.createPool({
    host: DATABASE_URL,
    user: DATABASE_NAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_DATABASE
})

export async function queryToDb(sql: string) {
    // connection.connect()
    // // let result;
    // connection.p
    let result
    try{
        const [rows, fields]:any = await connection.promise().query(sql);
        // const rows =  await connection.promise().query(sql);
        result= rows
    }catch(e:any){

    }
    return result;
    // await connection.query(sql, (err: any, rows: any, fields: any) => {
    //     if (err) {
    //         throw err
    //     }
    //     console.log(`rows`, rows)
    //     result = rows;
    //     // console.log(`rows`,rows)
    //     // return rows;

    //     // result = rows
    // })

    connection.end()
    // console.log(`result`, result)
    // return result;
}