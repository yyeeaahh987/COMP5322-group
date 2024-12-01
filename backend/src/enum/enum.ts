export enum ReturnStatusCode {
    SUCCESS=0,
    NO_DATA_FOUND=-1,
    ERROR=-2,
}

export enum ReturnStatusMessage {
    'SUCCESS',
    'FAIL'
}

export interface ReturnObj {
    code: number
    message: string
    result: any
}
// export enum HttpStatusCode{
//     '200',
//     '404',
// }