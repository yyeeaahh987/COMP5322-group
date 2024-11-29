import express, { NextFunction, Request, Response } from 'express';
import * as UserService from '../service/userService'
import {ReturnStatusCode , ReturnStatusMessage} from '../enum/enum'

const router = express.Router();

router.post('/login', async function (req: Request, res: Response) {
    console.log(`login`)
    let resultObj = {
        code: 0,
        message: "",
        result: false
    }
    const { name, password } = req.body
    const result = await UserService.validateAccountLogin(name, password);
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

router.post('/getUserDetailById', async function (req: Request, res: Response) {
    console.log(`getUserDetailById`)
    let resultObj = {
        code: 0,
        message: "",
        result: null
    }
    const { userId } = req.body
    const result = await UserService.getUserDetailById(userId);
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

router.post('/registerNewUser', async function (req: Request, res: Response) {
    console.log(`updateUser`)
    let resultObj = {
        code: 0,
        message: "",
        result: null
    }
    // const { userId,password, email,firstName,lastName,chiName,address,phoneNumber,language, used } = req.body
    // const result = await UserService.createUser(userId,password, email,firstName,lastName,chiName,address,phoneNumber,language, used);
    const { username,password} = req.body
    const result = await UserService.createUser(username,password, "","","","","","","", "");
    if (result == ReturnStatusMessage.SUCCESS) {
        resultObj.code = ReturnStatusCode.SUCCESS
        resultObj.message = "success"
        res.status(200).json(resultObj)
    } else {
        resultObj.code = ReturnStatusCode.ERROR
        resultObj.message = "Fail to Insert"
        res.status(200).json(resultObj)
    }
});

router.post('/updateUser', async function (req: Request, res: Response) {
    console.log(`updateUser`)
    let resultObj = {
        code: 0,
        message: "",
        result: null
    }
    const { userId, email,firstName,lastName,chiName,address,phoneNumber,language, used } = req.body
    const result = await UserService.updateUser(userId, email,firstName,lastName,chiName,address,phoneNumber,language, used);
    if (result == ReturnStatusMessage.SUCCESS) {
        resultObj.code = ReturnStatusCode.SUCCESS
        resultObj.message = "success"
        res.status(200).json(resultObj)
    } else {
        resultObj.code = ReturnStatusCode.ERROR
        resultObj.message = "Fail to Update"
        res.status(200).json(resultObj)
    }
});


export default router;
