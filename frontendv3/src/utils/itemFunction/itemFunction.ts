import { getRequestOptions } from "../constant";

export const REACT_APP_ENV = "dev"
export const REACT_APP_DOMAIN = "http://localhost:5173"
export const REACT_BACKEND_SERVER = "http://localhost:8080"


export const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
};


export async function getSuggestList() {
    // let requestOption ={
    //     ...postRequestOptions,
    //     body: JSON.stringify({ 
    //       itemId: data
    //     })
    //   }

    const response = await fetch(`${REACT_BACKEND_SERVER}/item/getTodaySuggestList`, getRequestOptions)
    const result = await response.json()
    console.log(`result`, result)
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

    const response = await fetch(`${REACT_BACKEND_SERVER}/item/getSubcategoryList`, requestOption)
    const result = await response.json()
    console.log(`result`, result)
    return result?.result ?? []
}