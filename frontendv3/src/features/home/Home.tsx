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
import Grid from '@mui/material/Grid2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { useAppDispatch } from '../../app/hooks';
import { NavBar } from '../navbar/NavBar';
import { ItemCard } from '../card/ItemCard';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ItemDetail } from '../itemDetail/ItemDetail';
import { postRequestOptions } from '../../utils/constant';
import { Header } from '../header/Header';
import { Declare } from '../declare/Declare';
import './home.css'
import { logout } from '../login/userSlice';
import { SShoppingCart } from '../smallShoppingCart/SShoppingCart';

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
const DOMAIN = process.env.REACT_APP_DOMAIN;
interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

const pages = ['食品及飲品', '母嬰'];
const settings = [
    {
        action: "logout",
        display: '登出'
    }
];

export const Home = () => {
    const dispatch = useAppDispatch()


    const [file, setFile]: any = useState(null);
    const [fileId, setFileId]: any = useState(null);

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElShop, setAnchorElShop] = useState<null | HTMLElement>(null);

    const [anchorFirstMenu, setAnchorFirstMenu] = useState<null | HTMLElement>(null);
    const [anchorSecondMenu, setAnchorSecondMenu] = useState<null | HTMLElement>(null);
    const [anchorThirdMenu, setAnchorThirdMenu] = useState<null | HTMLElement>(null);
    const [anchorForthMenu, setAnchorForthMenu] = useState<null | HTMLElement>(null);
    const [anchorFifthMenu, setAnchorFifthMenu] = useState<null | HTMLElement>(null);

    const [dropdownFirstMenu, setDropdownFirstMenu] = useState(false)
    const [dropdownSecondMenu, setDropdownSecondMenu] = useState(false)
    const [dropdownThirdMenu, setDropdownThirdMenu] = useState(false)
    const [dropdownForthMenu, setDropdownForthMenu] = useState(false)
    const [dropdownFifthMenu, setDropdownFifthMenu] = useState(false)

    const [dropdownCartMenu, setDropdownCartMenu] = useState(false)


    const [subMenu, setSubMenu] = useState<null | number>(null)
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
            const response = await fetch(`${BACKEND_SERVER}/item/uploadImage`, requestOption)
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

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    const handleOpenSmallShoppingCart = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElShop(event.currentTarget);
        setDropdownCartMenu(true);
    };

    const handleCloseSmallShoppingCart = () => {
        setAnchorElShop(null);
        setDropdownCartMenu(false);
    };

    function handleIconMenuOnClick(action: string) {
        if (action === "logout") {
            window.location.href = `${DOMAIN}`
            dispatch(logout())
        }
    }

    function handleOpenShoppingCart() {
        window.location.href = `${DOMAIN}/home/cart`
    }

    function handleMouseOver(event: React.MouseEvent<HTMLElement>, index: number) {
        console.log(`handleMouseOver`, index)
        setDropdownFirstMenu(false);
        setAnchorFirstMenu(event.currentTarget);
        setDropdownFirstMenu(true);
        setSubMenu(index)
    }

    function handleMouseLeave(event: React.MouseEvent<HTMLElement>, index: number) {
        // console.log(`handleMouseLeave`)
        // setAnchorFirstMenu(null);
        console.log(`handleMouseLeave`, index)
        setAnchorFirstMenu(null);
        setDropdownFirstMenu(false)
        setSubMenu(null)
    }

    function handleMenuClose() {

    }

    function handleClickHome() {
        window.location.href = `${DOMAIN}/home/promotion`
    }

    return (
        <>
            <Header></Header>

            <Grid container>
                <Grid size={12}>
                    <AppBar position="static">
                        <Container maxWidth="xl" className='nav-main'>
                            <Toolbar disableGutters>
                                {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{ display: { xs: 'block', md: 'none' } }}
                                    >
                                        {pages.map((page) => (
                                            <>

                                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                    <Typography sx={{ textAlign: 'center' }} aria-owns={"simple-menu"} onMouseOver={handleMouseOver}>{page}</Typography>
                                                </MenuItem>
                                              
                                            </>
                                        ))}
                                    </Menu>
                                </Box> */}

                                <Box sx={{ flexGrow: 0 }} className="nav-icon-box">
                                    <IconButton onClick={handleClickHome} sx={{ p: 0 }}>
                                        <HomeIcon className='nav-icon'></HomeIcon>
                                    </IconButton>
                                </Box>

                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {pages.map((page, index) => (
                                        <>
                                            <Button
                                                key={index}
                                                // onClick={handleMouseOver}
                                                aria-owns={"simple-menu"}
                                                onMouseOver={(event) => { handleMouseOver(event, index) }}
                                                // onMouseLeave={(event) => { handleMouseLeave(event, index) }}
                                                className='nav-button'
                                                sx={{ my: 2, color: 'white', display: 'block' }}
                                            >
                                                {page}

                                            </Button>

                                        </>
                                    ))}
                                    <Menu
                                        id="first-menu"
                                        anchorEl={anchorFirstMenu}
                                        open={dropdownFirstMenu}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center"
                                        }}
                                        MenuListProps={{ onMouseLeave: (e) => { handleMouseLeave(e, 0) } }}
                                    // onClose={handleMenuClose}
                                    >
                                        {(subMenu == 0) &&
                                            <>
                                                <MenuItem onClick={() => {
                                                    window.location.href = `${DOMAIN}/home/overview/食品及飲品/飲品、即沖飲品、酒類`
                                                }}>飲品、即沖飲品、酒類</MenuItem>
                                                <MenuItem onClick={() => {
                                                    window.location.href = `${DOMAIN}/home/overview/食品及飲品/米、麵、油、烘焙`
                                                }}
                                                >米、麵、油、烘焙</MenuItem>
                                            </>
                                        }
                                        {(subMenu == 1) &&
                                            <>
                                                <MenuItem onClick={() => {
                                                    window.location.href = `${DOMAIN}/home/overview/嬰幼兒奶粉/奶粉`
                                                }}
                                                >嬰幼兒奶粉</MenuItem>
                                            </>
                                        }
                                    </Menu>
                                </Box>
                                <Box sx={{ flexGrow: 0 }} className="nav-icon-box">
                                    {/* <Tooltip title="購物車"> */}
                                    <IconButton
                                        name="shoppingCartIcon"
                                        // onClick={handleOpenSmallShoppingCart}
                                        sx={{ p: 0 }}>
                                        <ShoppingCartIcon className='nav-icon'></ShoppingCartIcon>
                                    </IconButton>
                                    {/* <Menu
                                        id="menu-shopping-cart"
                                        anchorEl={anchorElShop}
                                        open={dropdownCartMenu}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center"
                                        }}
                                        MenuListProps={{   
                                            onMouseLeave: (e) => { handleMouseLeave(e, 0) } 
                                        }}
                                    >
                                        <>
                                        <MenuItem>
                                        <SShoppingCart></SShoppingCart>
                                        </MenuItem>
                                        </>
                                    </Menu> */}
                                </Box>
                                <Box></Box>
                                <Box sx={{ flexGrow: 0 }} className="nav-icon-box">
                                    <Tooltip title="帳戶">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                                            <AccountCircleIcon className='nav-icon'></AccountCircleIcon>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting.action} onClick={handleCloseUserMenu}>
                                                <Typography sx={{ textAlign: 'center' }} onClick={() => { handleIconMenuOnClick(setting.action) }}>{setting.display}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>

                </Grid>
            </Grid>

            <Grid container>
                {/* <Grid size={12}>
                    <span>{JSON.stringify(anchorFirstMenu, null, 2)}</span>
                </Grid>
                <Grid size={12}>
                    <span>{JSON.stringify(anchorSecondMenu, null, 2)}</span>
                </Grid>
                <Grid size={12}>
                    <span>{JSON.stringify(anchorThirdMenu, null, 2)}</span>
                </Grid>
                <Grid size={12}>
                    <span>{JSON.stringify(anchorForthMenu, null, 2)}</span>
                </Grid>
                <Grid size={12}>
                    <span>{JSON.stringify(anchorFifthMenu, null, 2)}</span>
                </Grid> */}
            </Grid>
            {/* this part is for upload image only */}
            {/* <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleFileIdChange} ></input>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form> */}
            <Box className="main-box">
                <Outlet></Outlet>
            </Box>

            {/* <Routes>
                <Route path="/home/item/detail/:id" element={<ItemDetail></ItemDetail>}></Route>
            </Routes> */}
            <Declare></Declare>
        </>
    )
}
