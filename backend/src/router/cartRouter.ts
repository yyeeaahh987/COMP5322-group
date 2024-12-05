import express, { NextFunction, Request, Response } from 'express';
import * as cartService from '../service/cartService'
import { ReturnObj, ReturnStatusCode, ReturnStatusMessage } from '../enum/enum'

const router = express.Router();


router.post('/getCartByUserId', async function (req: Request, res: Response) {
    console.log(`getCartByUserId`)
    let resultObj:ReturnObj = {
        code: 0,
        message: "",
        result: null
    }
    const { userName } = req.body
    const result = await cartService.getCartByUserId(userName);
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

router.post('/addItem', async function (req: Request, res: Response) {
    console.log(`addItem`)
    let resultObj:ReturnObj = {
        code: 0,
        message: "",
        result: null
    }
    const { cartId,itemId, amount, userId  } = req.body

    const result = await cartService.addItem(cartId,itemId, amount, userId);
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

router.post('/deleteItem', async function (req: Request, res: Response) {
    console.log(`deleteItem`)
    let resultObj:ReturnObj = {
        code: 0,
        message: "",
        result: null
    }
    const { cartId,itemId, amount, userId  } = req.body

    const result = await cartService.deleteItem(cartId,itemId, amount, userId);
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
