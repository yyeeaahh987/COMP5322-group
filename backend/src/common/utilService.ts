import nodemailer from "nodemailer";
import moment from 'moment'
import * as SqlService from '../service/sqlService';
import {ReturnStatusCode , ReturnStatusMessage} from '../enum/enum'
import mysql from 'mysql2';

export function getNow() {
    return moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
}


