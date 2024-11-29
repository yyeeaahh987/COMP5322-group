import nodemailer from "nodemailer";
import moment from 'moment'
import * as SqlService from '../service/sqlService';
import {ReturnStatusCode , ReturnStatusMessage} from '../enum/enum'
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
    
export async function validateAccountLogin(name:string, password:string) {
    try {
        let sql = `select count(*) as count from USER WHERE user_id = ? and PASSWORD = ?`
        const [rows, fields]: any = await connection.promise().query(sql, [name,password]);
        let result = rows?.[0]?.count ?? 0;
        if(result ===0){
            return false;
        }else{
            return true;
        }    } catch (e) {

    }
    return false;
}

export async function getUserDetailById(userId: string) {
    try {
        let sql = `select * from USER WHERE user_id = ? and used ='1'`
        const [rows, fields]: any = await connection.promise().query(sql, [userId]);
        let result = rows?.[0] ?? null;
        return result
    } catch (e) {

    }
    return null;
}

export async function createUser(userId: string, password: string, email: string, firstName: string, lastName: string, chiName: string, address: string, phoneNumber: string, language: string,used: string) {
    try {
        let sql = `INSERT INTO USER (USER_ID, PASSWORD, EMAIL,FIRST_NAME,LAST_NAME,CHI_NAME,ADDRESS,CREATED_BY,CREATED_DATE,LAST_UPDATED_BY,LAST_UPDATED_DATE,PHONE_NUMBER,LANGUAGE, USED) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const [{ insertId }]: any = await connection.promise().query(sql,
            [userId, password, email, firstName, lastName, chiName, address, "admin", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), "admin", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), phoneNumber, language,used]
        );
        return ReturnStatusMessage.SUCCESS
    } catch (e) {
        console.log(`createUser error`, e)
    }
    return ReturnStatusMessage.FAIL
}

export async function updateUser(userId: string, email: string, firstName: string, lastName: string, chiName: string, address: string, phoneNumber: string, language: string, used: string) {
    try {
        let sql = `update USER set 
        EMAIL = ?,
        FIRST_NAME = ?,
        LAST_NAME = ?,
        CHI_NAME = ?,
        ADDRESS = ?,
        LAST_UPDATED_BY = ?,
        LAST_UPDATED_DATE = ?,
        PHONE_NUMBER = ?,
        LANGUAGE = ?,
        USED = ?
        where USER_ID = ?`
        const [{ updateId }]: any = await connection.promise().query(sql,
            [email, firstName, lastName, chiName, address, "admin", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), phoneNumber, language, used, userId]
        );
        return ReturnStatusMessage.SUCCESS
    } catch (e) {
        console.log(`createUser error`, e)
    }
    return ReturnStatusMessage.FAIL
}