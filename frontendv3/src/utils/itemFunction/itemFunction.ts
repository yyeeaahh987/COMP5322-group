import { getRequestOptions } from "../constant";

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;

export const postRequestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', 
        'Referrer-Policy': "unsafe-url"
    },
    body: JSON.stringify({ title: 'React POST Request Example' })
};


export async function getSuggestList() {
    const response = await fetch(`${BACKEND_SERVER}/item/getTodaySuggestList`, getRequestOptions)
    const result = await response.json()
    return result?.result ?? []
}

export async function getSubcategoryList(category: string, subcategory: string) {
    let requestOption = {
        ...postRequestOptions,
        body: JSON.stringify({
            category: category,
            subcategory: subcategory
        })
    }

    const response = await fetch(`${BACKEND_SERVER}/item/getSubcategoryList`, requestOption)
    const result = await response.json()
    return result?.result ?? []
}