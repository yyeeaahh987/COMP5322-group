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
    let arr:any[] =[]
    let cart={
        cartId:null,
        items:arr
    }
    try {
        let sql = `select * from SHOPPING_CART sc where CART_ID = (select CART_ID  from SHOPPING_CART_SUBSCRIPTION scs where USER_ID = ?)`
        const [rows, fields]: any = await connection.promise().query(sql, [userId]);
        let result = rows? rows :null
        if(result !=null){
            cart.cartId = result[0].CART_ID
            for(let i=0;i<result.length;i++){
                let shopItem = await itemService.getItemByItemId(result[i].ITEM_ID)
                let cartItem = {
                    ...shopItem,
                    amount: result[i].AMOUNT,
                }
                cart.items.push(cartItem)
            }
        }
        return  cart
    } catch (e) {
        console.error(`getItemByItemId `, e)
    }
    return null;
}

export async function addItem(cartId :any,itemId:any, amount:any, userId:any) {

    console.log(`addItem`,cartId,itemId,amount,userId)
    let arr:any[] =[]
    let cart={
        cartId:null,
        items:arr
    }
    try {
        let sql = `select * from SHOPPING_CART_SUBSCRIPTION where CART_ID= ?`
        const [subRows, fields]: any = await connection.promise().query(sql, [cartId]);
        let result = subRows? subRows :null
        
        if(subRows.length >0){
            //cart is exist
            sql = `SELECT * FROM SHOPPING_CART where cart_id = ? and item_id= ?`
            const [cartRows, fields]: any = await connection.promise().query(sql, [cartId, itemId]);
            // result = cartRows? cartRows :null
            if(cartRows.length >0){
                //item exist >>  call update current record
                console.log(`cartRows`,cartRows[0].AMOUNT)
                let newAmt = cartRows?.[0]?.AMOUNT??0 + amount
                sql = `update SHOPPING_CART set amount = ? where cart_id =? and item_id=?`
                const [updatedRow, fields]: any = await connection.promise().query(sql, [newAmt, cartId,itemId]);
            }else {
                //item not exist >> call insert current record
                sql = `INSERT INTO SHOPPING_CART (CART_ID , ITEM_ID , AMOUNT) VALUES (?,?,?)`
                const [insertedRow, fields]: any = await connection.promise().query(sql, [cartId, itemId,amount]);
            }
                
        }else{
            //cart not exist
            sql = `INSERT INTO SHOPPING_CART_SUBSCRIPTION (CART_ID , USER_ID) VALUES (?,?)`
            const [insertCartSubRows]: any = await connection.promise().query(sql, [cartId, userId]);
            sql = `INSERT INTO SHOPPING_CART (CART_ID , ITEM_ID , AMOUNT) VALUES (?,?,?)`
            const [insertCartRows]: any = await connection.promise().query(sql, [cartId, itemId,amount]);
        }
        return getCartByUserId(userId)
    } catch (e) {
        console.error(`getItemByItemId `, e)
    }
    return null;
}

export async function deleteItem(cartId :any,itemId:any, amount:any, userId:any) {

    console.log(`addItem`,cartId,itemId,amount,userId)
    let arr:any[] =[]
    let cart={
        cartId:null,
        items:arr
    }
    try {
        let sql = `update SHOPPING_CART set amount = ? where cart_id =? and item_id=?`
        const [updatedRow, fields]: any = await connection.promise().query(sql, [amount, cartId,itemId]);

        // let sql = `select * from SHOPPING_CART_SUBSCRIPTION where CART_ID= ?`
        // const [subRows, fields]: any = await connection.promise().query(sql, [cartId]);
        // let result = subRows? subRows :null
        
        // if(subRows.length >0){
        //     //cart is exist
        //     sql = `SELECT * FROM SHOPPING_CART where cart_id = ? and item_id= ?`
        //     const [cartRows, fields]: any = await connection.promise().query(sql, [cartId, itemId]);
        //     // result = cartRows? cartRows :null
        //     if(cartRows.length >0){
        //         //item exist >>  call update current record
        //         console.log(`cartRows`,cartRows[0].AMOUNT)
        //         let newAmt = cartRows?.[0]?.AMOUNT??0 + amount
        //         sql = `update SHOPPING_CART set amount = ? where cart_id =? and item_id=?`
        //         const [updatedRow, fields]: any = await connection.promise().query(sql, [newAmt, cartId,itemId]);
        //     }else {
        //         //item not exist >> call insert current record
        //         sql = `INSERT INTO SHOPPING_CART (CART_ID , ITEM_ID , AMOUNT) VALUES (?,?,?)`
        //         const [insertedRow, fields]: any = await connection.promise().query(sql, [cartId, itemId,amount]);
        //     }
                
        // }else{
        //     //cart not exist
        //     sql = `INSERT INTO SHOPPING_CART_SUBSCRIPTION (CART_ID , USER_ID) VALUES (?,?)`
        //     const [insertCartSubRows]: any = await connection.promise().query(sql, [cartId, userId]);
        //     sql = `INSERT INTO SHOPPING_CART (CART_ID , ITEM_ID , AMOUNT) VALUES (?,?,?)`
        //     const [insertCartRows]: any = await connection.promise().query(sql, [cartId, itemId,amount]);
        // }
        return getCartByUserId(userId)
    } catch (e) {
        console.error(`getItemByItemId `, e)
    }
    return null;
}

// export async function getTodaySuggestList() {
//     try {
//         let sql = `select * from ITEM i,SUGGEST_ITEM si
//                     where si.ITEM_ID =i.ITEM_ID 
//                     order by si.DISPLAY_ORDER`
//         const [rows, fields]: any = await connection.promise().query(sql);
//         // console.log(`rows`, rows)
//         let result = rows ? rows : null;
//         // console.log(`result`, result)
//         if (result != null) {
//             result.forEach((item: any, index: any) => {
//                 // Replace the buffer array with base64 data
//                 const imgBase64 = item.IMAGE.toString('base64');

//                 console.log(`imgBase64`, imgBase64)
//                 result[index] = {
//                     ...item,
//                     imageBase64: imgBase64
//                 }
//             })
//         }
//         return result
//     } catch (e) {
//         console.error(`getTodaySuggestList `, e)
//     }
//     return null;
// }

// export async function uploadImageByItemId(file: string, itemId: string) {
//     try {
//         let sql = `UPDATE ITEM SET IMAGE = ? WHERE ITEM_ID = ?`
//         const [rows, fields]: any = await connection.promise().query(sql, [file, itemId]);
//         return null
//     } catch (e) {
//         console.error(`getItemByItemId `, e)
//     }
//     return null;
// }

// export async function getSubcategoryList(category: string, subcategory: string) {
//     try {
//         let sql = `select * from ITEM where CATEGORY = ? and SUB_CATEGORY = ?`
//         const [rows, fields]: any = await connection.promise().query(sql, [category, subcategory]);
//        // console.log(`rows`, rows)
//         let result = rows ? rows : null;
//       //  console.log(`result`, result)
//         // if (result != null) {
//         //     result.forEach((item: any, index: any) => {
//         //         // Replace the buffer array with base64 data
//         //         const imgBase64 = item.IMAGE.toString('base64');

//         //         console.log(`imgBase64`, imgBase64)
//         //         result[index] = {
//         //             ...item,
//         //             imageBase64: imgBase64
//         //         }
//         //     })
//         // }
//         return result
//     } catch (e) {
//         console.error(`getSubcategoryList `, e)
//     }
//     return null;
// }

// export async function createItem(category: string, subCategory: string, brand: string, image: string, engName: string, chiName: string, price: string, description: string, origin: string, srchName: string, discount: string, rating: string, used: string) {
//     try {
//         let sql = `INSERT INTO ITEM (ITEM_ID,CATEGORY,SUB_CATEGORY,BRAND,IMAGE,ENG_NAME,CHI_NAME,PRICE,DESCRIPTION,ORIGIN,SRCH_NAME,DISCOUNT,RATING,CREATED_BY,CREATED_DATE,USED,LAST_UPDATED_BY,LAST_UPDATED_DATE) 
//         values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
//         const [{ insertId }]: any = await connection.promise().query(sql,
//             [null, category, subCategory, brand, image, engName, chiName, price, description, origin, srchName, discount, rating, "admin", itemService.getNow(), used, "admin", itemService.getNow()]
//         );
//         return ReturnStatusMessage.SUCCESS
//     } catch (e) {
//         console.log(`createUser error`, e)
//     }
//     return ReturnStatusMessage.FAIL
// }

// export async function updateItem(itemId: string, category: string, subCategory: string, brand: string, image: string, engName: string, chiName: string, price: string, description: string, origin: string, srchName: string, discount: string, rating: string, used: string) {
//     // let srchName = engName;
//     try {
//         let sql = `update ITEM set         
//         CATEGORY = ?,
//         SUB_CATEGORY = ?,
//         BRAND = ?,
//         IMAGE = ?,
//         ENG_NAME = ?,
//         CHI_NAME = ?,
//         PRICE = ?,
//         DESCRIPTION = ?,
//         ORIGIN = ?,
//         SRCH_NAME = ?,
//         DISCOUNT = ?,
//         RATING = ?,
//         LAST_UPDATED_BY = ?,
//         LAST_UPDATED_DATE = ?,
//         USED = ?
//         where ITEM_ID = ?`
//         const [{ updateId }]: any = await connection.promise().query(sql,
//             [category, subCategory, brand, image, engName, chiName, price, description, origin, srchName, discount, rating, "admin", itemService.getNow(), used, itemId]
//         );
//         return ReturnStatusMessage.SUCCESS
//     } catch (e) {
//         console.log(`createUser error`, e)
//     }
//     return ReturnStatusMessage.FAIL
// }

// export async function deleteItem(used: string, itemId: string) {
//     try {
//         let sql = `update ITEM set 
//         USED = ?,
//         LAST_UPDATED_BY = ?,
//         LAST_UPDATED_DATE = ?
//         where ITEM_ID = ?`
//         const [{ updateId }]: any = await connection.promise().query(sql,
//             ["0", "admin", itemService.getNow(), itemId]
//         );
//         return ReturnStatusMessage.SUCCESS
//     } catch (e) {
//         console.log(`createUser error`, e)
//     }
//     return ReturnStatusMessage.FAIL
// }


