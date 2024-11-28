import { getRequestOptions, postRequestOptions } from "../constant";

// export const REACT_APP_ENV = "dev"
// export const REACT_APP_DOMAIN = "http://localhost:5173"
// export const REACT_BACKEND_SERVER = "http://localhost:8080"


const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
// console.log(`BACKEND_SERVER item fucntion`,process.env)


export async function registerNewUser(username: string, password: string) {
    let requestOption = {
        ...postRequestOptions,
        body: JSON.stringify({
            username: username,
            password: password
        })
    }
console.log(`abc`,`${BACKEND_SERVER}/user/registerNewUser`)
    const response = await fetch(`${BACKEND_SERVER}/user/registerNewUser`, requestOption)
    const result = await response.json()
    console.log(`result`, result?.code ?? 0)
    return ((result?.code ?? 0) ===0) ? true : false
}
