import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import './uploadItem.css'
import { postRequestOptions } from '../../utils/constant';
const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;

export const UploadItem = () => {
    const [file, setFile]: any = useState(null);
    const [fileId, setFileId]: any = useState(null);
    
    useEffect(() => {
    }, [])

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {

            let body = {
                file: reader.result,
                id: fileId
            }
            let requestOption = {
                ...postRequestOptions,
                body: JSON.stringify(body)
            }
            const response = await fetch(`${BACKEND_SERVER}/item/uploadImage`, requestOption)
            const result = await response.json()
        };
        reader.onerror = function (error) {
        };
    };

    const handleFileIdChange = (event: any) => {
        setFileId(event.target.value);
    };

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    return (
        <>
            <Grid container>
                <Grid size={12}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={handleFileIdChange} ></input>
                        <input type="file" onChange={handleFileChange} />
                        <button type="submit">Upload</button>
                    </form>
                </Grid>
            </Grid>
        </>
    )
}




