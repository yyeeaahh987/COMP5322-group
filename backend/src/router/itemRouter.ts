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
    console.log(`result`, result)
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
    console.log(`result`, result)
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
    // console.log(`sendEmail`,req.body)
    let resultObj = {
        code: 0,
        message: "",
        result: null
    }
    const { category, subcategory } = req.body
    const result = await ItemService.getSubcategoryList(category, subcategory);
    console.log(`result`, result)
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
    // console.log(`updateUser`)
    // let resultObj = {
    //     code: 0,
    //     message: "",
    //     result: null
    // }
    // const { userId,password, email,firstName,lastName,chiName,address,phoneNumber,language, used } = req.body
    // const result = await UserService.createUser(userId,password, email,firstName,lastName,chiName,address,phoneNumber,language, used);
    // console.log(`result`, result)
    // if (result == ReturnStatusMessage.SUCCESS) {
    //     resultObj.code = ReturnStatusCode.SUCCESS
    //     resultObj.message = "success"
    //     res.status(200).json(resultObj)
    // } else {
    //     resultObj.code = ReturnStatusCode.ERROR
    //     resultObj.message = "Fail to Insert"
    //     res.status(200).json(resultObj)
    // }
});

router.post('/updateItem', async function (req: Request, res: Response) {
    // console.log(`updateItem`)
    // let resultObj = {
    //     code: 0,
    //     message: "",
    //     result: null
    // }
    // const { userId, email,firstName,lastName,chiName,address,phoneNumber,language, used } = req.body
    // const result = await ItemService.updateItem(userId, email,firstName,lastName,chiName,address,phoneNumber,language, used);
    // console.log(`result`, result)
    // if (result == ReturnStatusMessage.SUCCESS) {
    //     resultObj.code = ReturnStatusCode.SUCCESS
    //     resultObj.message = "success"
    //     res.status(200).json(resultObj)
    // } else {
    //     resultObj.code = ReturnStatusCode.ERROR
    //     resultObj.message = "Fail to Update"
    //     res.status(200).json(resultObj)
    // }
});


export default router;
