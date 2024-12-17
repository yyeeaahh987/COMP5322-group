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

export async function getCartByUserId(userId: string) {
    let arr: any[] = []
    let cart = {
        cartId: null,
        items: arr
    }
    try {
        let sql = `select * from SHOPPING_CART sc where CART_ID = (select CART_ID  from SHOPPING_CART_SUBSCRIPTION scs where USER_ID = ?)`
        const [rows, fields]: any = await connection.promise().query(sql, [userId]);
        let result = rows ? rows : null
        if (result != null && result.length >0) {
            console.log(`result`,result)
            cart.cartId = result[0].CART_ID
            for (let i = 0; i < result.length; i++) {
                let shopItem = await itemService.getItemByItemId(result[i].ITEM_ID)
                let cartItem = {
                    ...shopItem,
                    amount: result[i].AMOUNT,
                }
                cart.items.push(cartItem)
            }
        }
        return cart
    } catch (e) {
        console.error(`getItemByItemId `, e)
    }
    return null;
}

export async function addItem(cartId: any, itemId: any, amount: any, userId: any) {
    try {
        let sql = `select * from SHOPPING_CART_SUBSCRIPTION where CART_ID= ?`
        const [subRows, fields]: any = await connection.promise().query(sql, [cartId]);

        if (subRows.length > 0) {
            //cart is exist
            sql = `SELECT * FROM SHOPPING_CART where cart_id = ? and item_id= ?`
            const [cartRows, fields]: any = await connection.promise().query(sql, [cartId, itemId]);
            if (cartRows.length > 0) {
                //item exist >>  call update current record
                let newAmt = (cartRows?.[0]?.AMOUNT ?? 0) + Number(amount)
                sql = `update SHOPPING_CART set amount = ? where cart_id =? and item_id=?`
                const [updatedRow, fields]: any = await connection.promise().query(sql, [newAmt, cartId, itemId]);
            } else {
                //item not exist >> call insert current record
                sql = `INSERT INTO SHOPPING_CART (CART_ID , ITEM_ID , AMOUNT) VALUES (?,?,?)`
                const [insertedRow, fields]: any = await connection.promise().query(sql, [cartId, itemId, amount]);
            }

        } else {
            //cart not exist
            sql = `INSERT INTO SHOPPING_CART_SUBSCRIPTION (USER_ID) VALUES (?)`
            const [insertCartSubRows]: any = await connection.promise().query(sql, [userId]);
            let newCartId = insertCartSubRows.insertId
            sql = `INSERT INTO SHOPPING_CART (CART_ID , ITEM_ID , AMOUNT) VALUES (?,?,?)`
            const [insertCartRows]: any = await connection.promise().query(sql, [newCartId, itemId, amount]);
        }
        return getCartByUserId(userId)
    } catch (e) {
        console.error(`getItemByItemId `, e)
    }
    return null;
}

export async function addItemInShoppingCart(cartId: any, itemId: any, amount: any, userId: any) {
    try {
        let sql = `update SHOPPING_CART set amount = ? where cart_id =? and item_id=?`
        const [updatedRow, fields]: any = await connection.promise().query(sql, [amount, cartId, itemId]);
        return getCartByUserId(userId)
    } catch (e) {
        console.error(`addItemInShoppingCart `, e)
    }
    return null;
}

export async function deleteItem(cartId: any, itemId: any, amount: any, userId: any) {
    try {
        let sql = `update SHOPPING_CART set amount = ? where cart_id =? and item_id=?`
        const [updatedRow, fields]: any = await connection.promise().query(sql, [amount, cartId, itemId]);
        return getCartByUserId(userId)
    } catch (e) {
        console.error(`getItemByItemId `, e)
    }
    return null;
}
