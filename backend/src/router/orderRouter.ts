import express, { NextFunction, Request, Response } from 'express';
import { ReturnObj, ReturnStatusCode, ReturnStatusMessage } from '../enum/enum'
import * as orderService from '../service/orderService'

const router = express.Router();


router.post('/place', async function (req: Request, res: Response) {
    console.log(`place`)
    let resultObj: ReturnObj = {
        code: 0,
        message: "",
        result: null
    }
    const { cartId, itemId, userId, price } = req.body

    const result = await orderService.place(cartId, userId, price);
    if (result == null) {
        resultObj.code = ReturnStatusCode.NO_DATA_FOUND
        resultObj.message = "no data found"
        res.status(200).json(resultObj)
    } else {
        resultObj.code = ReturnStatusCode.SUCCESS
        resultObj.message = "success"
        resultObj.result = result
        res.status(200).json(resultObj)
    }
});

router.post('/getOrderByUserId', async function (req: Request, res: Response) {
    console.log(`getOrderByUserId`)
    let resultObj: ReturnObj = {
        code: 0,
        message: "",
        result: null
    }
    const { userId } = req.body

    const result = await orderService.getOrderByUserId(userId);
    if (result == null) {
        resultObj.code = ReturnStatusCode.NO_DATA_FOUND
        resultObj.message = "no data found"
        res.status(200).json(resultObj)
    } else {
        resultObj.code = ReturnStatusCode.SUCCESS
        resultObj.message = "success"
        resultObj.result = result
        res.status(200).json(resultObj)
    }
});

export default router;
