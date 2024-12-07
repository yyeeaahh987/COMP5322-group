import express, { NextFunction, Request, Response } from 'express';
import * as ItemService from '../service/itemService'
import { ReturnStatusCode, ReturnStatusMessage } from '../enum/enum'

const router = express.Router();

router.post('/getItemByItemId', async function (req: Request, res: Response) {
    console.log(`getItemByItemId`)
    let resultObj = {
        code: 0,
        message: "",
        result: null
    }
    const { itemId } = req.body
    const result = await ItemService.getItemByItemId(itemId);
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

router.get('/getTodaySuggestList', async function (req: Request, res: Response) {
    console.log(`getTodaySuggestList`)
    let resultObj = {
        code: 0,
        message: "",
        result: null
    }
    const result = await ItemService.getTodaySuggestList();
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

router.post('/uploadImage', async function (req: Request, res: Response) {
    console.log(`uploadImage`)
    let resultObj = {
        code: 0,
        message: "",
        result: null
    }
    const { file, id } = req.body
    const result = await ItemService.uploadImageByItemId(file, id);
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

router.post('/getSubcategoryList', async function (req: Request, res: Response) {
    console.log(`getSubcategoryList`)
    let resultObj = {
        code: 0,
        message: "",
        result: null
    }
    const { category, subcategory } = req.body
    const result = await ItemService.getSubcategoryList(category, subcategory);
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

router.post('/createUser', async function (req: Request, res: Response) {

});

router.post('/updateItem', async function (req: Request, res: Response) {

});


export default router;
