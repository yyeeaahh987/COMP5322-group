import express, { Application, Request, Response } from "express"
// import CronJob from 'cron'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
// import mongoose from 'mongoose'
import fs from 'fs';
import https from 'https'
import bodyParser from "body-parser";
import mysql from 'mysql'

const ENV = process.env.ENV
const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_DATABASE = process.env.DATABASE_DATABASE

const connection = mysql.createConnection({
    host: DATABASE_URL,
    user: DATABASE_NAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_DATABASE
})

import userRouter from './router/userRouter';
import itemRouter from "./router/itemRouter";

const app: Application = express()
const port: number = 8080
const httpsPort: number = 8443

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json({limit: '5000mb'}))
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }))


app.use('/user', userRouter);
app.use('/item', itemRouter);


app.get("/hi", (req: Request, res: Response) => {
    res.send("hi")
})

app.get("/toto", (req: Request, res: Response) => {
    
    connection.connect()
    connection.query('select * from user;', (err: any, rows: any, fields: any) => {
        if (err) {
            throw err
        }
        // console.log('The solution is: ', rows)
    })

    connection.end()
    res.send("Hello toto")
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})

if(ENV !== "local"){
    const key = fs.readFileSync(`/etc/letsencrypt/live/comp5322foru.agency/privkey.pem`)
    const cert = fs.readFileSync(`/etc/letsencrypt/live/comp5322foru.agency/fullchain.pem`)

    const cred = {
        key,
        cert
    }

    const httpsServer = https.createServer(cred, app)
    httpsServer.listen(httpsPort)
    console.log(`https ports App is listening on ${httpsPort} !`)

}
