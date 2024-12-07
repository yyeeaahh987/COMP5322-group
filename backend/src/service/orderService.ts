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
    let orderId = null
    try {
        let sql = `select a.CART_ID ,a.ITEM_ID ,a.AMOUNT ,b.CHI_NAME ,b.PRICE  from SHOPPING_CART a, ITEM b where a.CART_ID= ?
        and a.ITEM_ID =b.ITEM_ID `
        const [cartRow]: any = await connection.promise().query(sql, [cartId]);
        if (cartRow.length > 0) {
            sql = `insert into USER_ORDER  (USER_ID,PRICE,ADDRESS,ORDER_STATUS) values(? ,?,?,?)`
            const [userOrderRows]: any = await connection.promise().query(sql, [userId, price, "", "待確認"]);
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
    try {
        let sql = `select * from USER_ORDER uo  where USER_ID = ?`
        const [userOrderRow]: any = await connection.promise().query(sql, [userId]);
        let result = userOrderRow ? userOrderRow : null
        if (userOrderRow.length > 0) {
            let totalPrice = 0
            for (let i = 0; i < userOrderRow.length; i++) {
                sql = `select * from ORDER_ITEM where ORDER_ID = ?`
                let [userOrderRows]: any = await connection.promise().query(sql, [userOrderRow[i].ORDER_ID]);
                result[i].items = userOrderRows
                for(let j=0; j < userOrderRows.length; j++){
                    totalPrice = totalPrice + Number(userOrderRows[j].PRICE)
                }
                result[i].PRICE = totalPrice
            }            
        }
        return result
    } catch (e) {
        console.error(`getOrderByUserId `, e)
    }
    return null;
}