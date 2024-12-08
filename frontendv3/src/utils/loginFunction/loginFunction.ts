import { postRequestOptions } from "../constant";

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;

export async function registerNewUser(username: string, password: string) {
    let requestOption = {
        ...postRequestOptions,
        body: JSON.stringify({
            username: username,
            password: password
        })
    }
    const response = await fetch(`${BACKEND_SERVER}/user/registerNewUser`, requestOption)
    const result = await response.json()
    return ((result?.code ?? 0) ===0) ? true : false
}
