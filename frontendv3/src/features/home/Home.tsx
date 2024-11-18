import * as React from 'react';
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

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

export const Home = () => {
    const dispatch = useAppDispatch()

    return (
        <>
            <NavBar>

            </NavBar>

            
            <Outlet></Outlet>
            {/* <Routes>
                <Route path="/home/item/detail/:id" element={<ItemDetail></ItemDetail>}></Route>
            </Routes> */}

        </>
    )
}
