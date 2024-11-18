export const REACT_APP_ENV="dev"
export const REACT_APP_DOMAIN="http://localhost:5173"
export const REACT_BACKEND_SERVER="http://localhost:8080"


export const postRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
};
