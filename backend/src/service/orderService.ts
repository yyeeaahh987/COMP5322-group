import nodemailer from "nodemailer";
import moment from 'moment'
import * as sqlService from '../service/sqlService';
import * as itemService from '../service/itemService'
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

export async function place(cartId: any, userId: any, price: any) {

    console.log(`place`, cartId, userId, price)
    let arr: any[] = []
    let cart = {
        cartId: null,
        items: arr
    }
    let orderId = null
    try {
        let sql = `select a.CART_ID ,a.ITEM_ID ,a.AMOUNT ,b.CHI_NAME ,b.PRICE  from SHOPPING_CART a, ITEM b where a.CART_ID= ?
        and a.ITEM_ID =b.ITEM_ID `
        const [cartRow]: any = await connection.promise().query(sql, [cartId]);
        let result = cartRow ? cartRow : null
        console.log(`cartRow`, cartRow);
        if (cartRow.length > 0) {
            sql = `insert into USER_ORDER  (USER_ID,PRICE,ADDRESS,ORDER_STATUS) values(? ,?,?,?)`
            const [userOrderRows]: any = await connection.promise().query(sql, [userId, price, "", "PENDING"]);
            console.log(`userOrderRows`, userOrderRows.insertId)
            orderId = userOrderRows.insertId

            for (let i = 0; i < cartRow.length; i++) {
                sql = `insert into ORDER_ITEM  (ORDER_ID,ITEM_ID,ITEM_NAME,AMOUNT,PRICE) values(? ,?,?,?,?)`
                let [userOrderRows]: any = await connection.promise().query(sql, [orderId, cartRow[i].ITEM_ID, cartRow[i].CHI_NAME, cartRow[i].AMOUNT, cartRow[i].PRICE]);
            }
        }
        //delete original cart
        sql = `delete from SHOPPING_CART where CART_ID= ?`
        const [shoppingCartDeleteRow]: any = await connection.promise().query(sql, [cartId]);
        sql = `delete from SHOPPING_CART_SUBSCRIPTION where CART_ID= ?`
        const [shoppingCartSubDeleteRow]: any = await connection.promise().query(sql, [cartId]);
        return orderId
    } catch (e) {
        console.error(`getItemByItemId `, e)
    }
    return orderId;
}

export async function getOrderByUserId(userId: any) {
    console.log(`getOrderByUserId`, userId)
    try {
        let sql = `select * from USER_ORDER uo  where USER_ID = ?`
        const [userOrderRow]: any = await connection.promise().query(sql, [userId]);
        let result = userOrderRow ? userOrderRow : null
        console.log(`userOrderRow`, userOrderRow);
        if (userOrderRow.length > 0) {
            for (let i = 0; i < userOrderRow.length; i++) {
                sql = `select * from ORDER_ITEM where ORDER_ID = ?`
                let [userOrderRows]: any = await connection.promise().query(sql, [userOrderRow[i].ORDER_ID]);
                result[i].items = userOrderRows
            }
        }
        return result
    } catch (e) {
        console.error(`getOrderByUserId `, e)
    }
    return null;
}