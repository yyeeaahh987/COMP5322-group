import nodemailer from "nodemailer";
import moment from 'moment'
import * as sqlService from '../service/sqlService';
import * as itemService from '../common/utilService'
import { ReturnStatusCode, ReturnStatusMessage } from '../enum/enum'
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

export async function getItemByItemId(itemId: string) {
    try {
        let sql = `select * from ITEM where ITEM_ID = ?`
        const [rows, fields]: any = await connection.promise().query(sql, [itemId]);
        console.log(`rows`, rows)
        let result = rows?.[0] ?? null;
        console.log(`result`, result)
        return result
    } catch (e) {
        console.error(`getItemByItemId `, e)
    }
    return null;
}

export async function getTodaySuggestList(){
    try {
        let sql = `select * from ITEM i,SUGGEST_ITEM si
                    where si.ITEM_ID =i.ITEM_ID 
                    order by si.DISPLAY_ORDER`
        const [rows, fields]: any = await connection.promise().query(sql);
        console.log(`rows`, rows)
        let result = rows?rows : null;
        console.log(`result`, result)
        return result
    } catch (e) {
        console.error(`getTodaySuggestList `, e)
    }
    return null;
}

export async function uploadImageByItemId(file:string, itemId:string) {
    console.log(`itemId`,itemId)
    try {
        let sql = `UPDATE ITEM SET IMAGE = ? WHERE ITEM_ID = ?`
        const [rows, fields]: any = await connection.promise().query(sql, [file,itemId]);
        return null
    } catch (e) {
        console.error(`getItemByItemId `, e)
    }
    return null;
}

export async function getSubcategoryList(category:string, subcategory:string){
    try {
        let sql = `select * from ITEM where CATEGORY = ? and SUB_CATEGORY = ?`
        const [rows, fields]: any = await connection.promise().query(sql, [category,subcategory]);
        console.log(`rows`, rows)
        let result = rows?rows : null;
        console.log(`result`, result)
        return result
    } catch (e) {
        console.error(`getSubcategoryList `, e)
    }
    return null;
}

export async function createItem(category: string, subCategory: string, brand: string, image: string, engName: string, chiName: string, price: string, description: string, origin: string, srchName: string, discount: string, rating: string, used: string) {
    try {
        let sql = `INSERT INTO ITEM (ITEM_ID,CATEGORY,SUB_CATEGORY,BRAND,IMAGE,ENG_NAME,CHI_NAME,PRICE,DESCRIPTION,ORIGIN,SRCH_NAME,DISCOUNT,RATING,CREATED_BY,CREATED_DATE,USED,LAST_UPDATED_BY,LAST_UPDATED_DATE) 
        values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const [{ insertId }]: any = await connection.promise().query(sql,
            [null, category, subCategory, brand, image, engName, chiName, price, description, origin, srchName, discount, rating, "admin", itemService.getNow(), used, "admin", itemService.getNow()]
        );
        console.log(`insertId`, insertId)
        return ReturnStatusMessage.SUCCESS
    } catch (e) {
        console.log(`createUser error`, e)
    }
    return ReturnStatusMessage.FAIL
}

export async function updateItem(itemId:string,category: string, subCategory: string, brand: string, image: string, engName: string, chiName: string, price: string, description: string, origin: string, srchName: string, discount: string, rating: string, used: string) {
    // let srchName = engName;
    try {
        let sql = `update ITEM set         
        CATEGORY = ?,
        SUB_CATEGORY = ?,
        BRAND = ?,
        IMAGE = ?,
        ENG_NAME = ?,
        CHI_NAME = ?,
        PRICE = ?,
        DESCRIPTION = ?,
        ORIGIN = ?,
        SRCH_NAME = ?,
        DISCOUNT = ?,
        RATING = ?,
        LAST_UPDATED_BY = ?,
        LAST_UPDATED_DATE = ?,
        USED = ?
        where ITEM_ID = ?`
        const [{ updateId }]: any = await connection.promise().query(sql,
            [category, subCategory, brand, image, engName, chiName, price, description, origin, srchName, discount, rating, "admin", itemService.getNow(), used, itemId]
        );
        console.log(`update`, updateId)
        return ReturnStatusMessage.SUCCESS
    } catch (e) {
        console.log(`createUser error`, e)
    }
    return ReturnStatusMessage.FAIL
}

export async function deleteItem(used: string, itemId: string) {
    try {
        let sql = `update ITEM set 
        USED = ?,
        LAST_UPDATED_BY = ?,
        LAST_UPDATED_DATE = ?
        where ITEM_ID = ?`
        const [{ updateId }]: any = await connection.promise().query(sql,
            ["0", "admin", itemService.getNow(), itemId]
        );
        console.log(`update`, updateId)
        return ReturnStatusMessage.SUCCESS
    } catch (e) {
        console.log(`createUser error`, e)
    }
    return ReturnStatusMessage.FAIL
}


