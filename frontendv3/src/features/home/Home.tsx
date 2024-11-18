import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAppDispatch } from '../../app/hooks';
import { NavBar } from '../navbar/NavBar';
import { ItemCard } from '../card/ItemCard';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ItemDetail } from '../itemDetail/ItemDetail';
import { postRequestOptions, REACT_BACKEND_SERVER } from '../../utils/constant';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

export const Home = () => {
    const dispatch = useAppDispatch()


    const [file, setFile]: any = useState(null);
    const [fileId, setFileId]: any = useState(null);

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleFileIdChange = (event: any) => {
        setFileId(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        //   const formData = new FormData();
        //   formData.append('file', file);
        //   formData.append('id', fileId);

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
            console.log(reader.result);

            let body = {
                file: reader.result,
                id: fileId
            }
            let requestOption = {
                ...postRequestOptions,
                body: JSON.stringify(body)
            }
            console.log(`requestOption`, requestOption)
            const response = await fetch(`${REACT_BACKEND_SERVER}/item/uploadImage`, requestOption)
            const result = await response.json()
            console.log(`result`, result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };





        //   fetch('/file/upload', {
        //     method: 'POST',
        //     body: formData,
        //   })
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log('Success:', data);
        //   })
        //   .catch((error) => {
        //     console.error('Error:', error);
        //   });
    };

    return (
        <>
            <NavBar>

            </NavBar>

{/* this part is for upload image only */}
            {/* <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleFileIdChange} ></input>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form> */}
            <Outlet></Outlet>
            {/* <Routes>
                <Route path="/home/item/detail/:id" element={<ItemDetail></ItemDetail>}></Route>
            </Routes> */}

        </>
    )
}
