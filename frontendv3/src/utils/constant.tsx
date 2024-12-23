// export const REACT_APP_ENV="dev"
// export const REACT_APP_DOMAIN="http://localhost:5173"
// export const REACT_BACKEND_SERVER="http://localhost:8080"


export const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Referrer-Policy': "unsafe-url" },
    body: JSON.stringify({ title: 'React POST Request Example' })
};

export const getRequestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Referrer-Policy': "unsafe-url" },
    // body: JSON.stringify({ title: 'React POST Request Example' })
};