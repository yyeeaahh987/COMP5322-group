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

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
const DOMAIN = process.env.REACT_APP_DOMAIN;
interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

const pages = ['食品及飲品', '母嬰', '個人護理、健康', '家居生活', '寵物區'];
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
        // switch (index) {
        //     case 0:
        //         setAnchorFirstMenu(event.currentTarget);
        //         setDropdownFirstMenu(true);
        //     case 1:
        //         setAnchorSecondMenu(event.currentTarget);
        //         setDropdownSecondMenu(true);
        //     case 2:
        //         setAnchorThirdMenu(event.currentTarget);
        //         setDropdownThirdMenu(true);
        //     case 3:
        //         setAnchorForthMenu(event.currentTarget);
        //         setDropdownForthMenu(true)
        //     case 4:
        //         setAnchorFifthMenu(event.currentTarget);
        //         setDropdownFifthMenu(true);
        //     default:
        //         break;
        // }
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
        // switch (index) {
        //     case 0:
        //         setAnchorFirstMenu(null);
        //         setDropdownFirstMenu(false)
        //     case 1:
        //         setAnchorSecondMenu(null);
        //         setDropdownSecondMenu(false)
        //     case 2:
        //         setAnchorThirdMenu(null);
        //         setDropdownThirdMenu(false)
        //     case 3:
        //         setAnchorForthMenu(null);
        //         setDropdownForthMenu(false)
        //     case 4:
        //         setAnchorFifthMenu(null);
        //         setDropdownFifthMenu(false)
        //     default:
        //         break;
        // }
    }

    function handleMenuClose() {

    }
    return (
        <>
            {/* <NavBar>

            </NavBar> */}
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
                                                <MenuItem>飲品、即沖飲品、酒類</MenuItem>
                                                <MenuItem>米、麵、油、烘焙</MenuItem>
                                                <MenuItem>罐頭、醃製食品、乾貨</MenuItem>
                                            </>
                                        }
                                        {(subMenu == 1) &&
                                            <>
                                                <MenuItem onClick={()=>{
                                                    window.location.href = `${DOMAIN}/home/overview/嬰幼兒奶粉/奶粉`
                                                }}
                                                >嬰幼兒奶粉</MenuItem>
                                                <MenuItem>嬰幼兒尿片</MenuItem>
                                                <MenuItem>嬰幼兒食品</MenuItem>
                                                <MenuItem>嬰幼兒護理</MenuItem>
                                                <MenuItem>其他嬰幼兒用品</MenuItem>
                                            </>
                                        }
                                        {(subMenu == 2) &&
                                            <>
                                                <MenuItem>嬰幼兒奶粉</MenuItem>
                                                <MenuItem>嬰幼兒尿片</MenuItem>
                                                <MenuItem>嬰幼兒食品</MenuItem>
                                                <MenuItem>嬰幼兒護理</MenuItem>
                                                <MenuItem>其他嬰幼兒用品</MenuItem>
                                            </>
                                        }
                                        {(subMenu == 3) &&
                                            <>
                                                <MenuItem>嬰幼兒奶粉</MenuItem>
                                                <MenuItem>嬰幼兒尿片</MenuItem>
                                                <MenuItem>嬰幼兒食品</MenuItem>
                                                <MenuItem>嬰幼兒護理</MenuItem>
                                                <MenuItem>其他嬰幼兒用品</MenuItem>
                                            </>
                                        }
                                        {(subMenu == 4) &&
                                            <>
                                                <MenuItem>嬰幼兒奶粉</MenuItem>
                                                <MenuItem>嬰幼兒尿片</MenuItem>
                                                <MenuItem>嬰幼兒食品</MenuItem>
                                                <MenuItem>嬰幼兒護理</MenuItem>
                                                <MenuItem>其他嬰幼兒用品</MenuItem>
                                            </>
                                        }
                                    </Menu>
                                    {/* <Menu
                                        id="second-menu"
                                        anchorEl={anchorSecondMenu}
                                        open={dropdownSecondMenu}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center"
                                        }}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem >2</MenuItem>
                                        <MenuItem >My account</MenuItem>
                                        <MenuItem >Logout</MenuItem>
                                    </Menu>
                                    <Menu
                                        id="third-menu"
                                        anchorEl={anchorThirdMenu}
                                        open={dropdownThirdMenu}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center"
                                        }}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem >3</MenuItem>
                                        <MenuItem >My account</MenuItem>
                                        <MenuItem >Logout</MenuItem>
                                    </Menu>
                                    <Menu
                                        id="forth-menu"
                                        anchorEl={anchorForthMenu}
                                        open={dropdownForthMenu}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center"
                                        }}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem >4</MenuItem>
                                        <MenuItem >My account</MenuItem>
                                        <MenuItem >Logout</MenuItem>
                                    </Menu>
                                    <Menu
                                        id="fifth-menu"
                                        anchorEl={anchorFifthMenu}
                                        open={dropdownFifthMenu}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center"
                                        }}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem >5</MenuItem>
                                        <MenuItem >My account</MenuItem>
                                        <MenuItem >Logout</MenuItem>
                                    </Menu> */}
                                </Box>
                                {/* <Menu open={true} anchorEl={anchorFirstMenu}
                                    
                                >
                                    abc
                                    <br></br>
                                    item
                                </Menu> */}
                                <Box sx={{ flexGrow: 0 }} className="nav-icon-box">
                                    <Tooltip title="購物車">
                                        <IconButton onClick={handleOpenShoppingCart} sx={{ p: 0 }}>
                                            <ShoppingCartIcon className='nav-icon'></ShoppingCartIcon>
                                        </IconButton>
                                    </Tooltip>
                                    {/* <Menu
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
                                                <Typography sx={{ textAlign: 'center' }} onClick={()=>{handleIconMenuOnClick(setting.action)}}>{setting.display}</Typography>
                                            </MenuItem>
                                        ))}
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
            <Outlet></Outlet>
            {/* <Routes>
                <Route path="/home/item/detail/:id" element={<ItemDetail></ItemDetail>}></Route>
            </Routes> */}
            <Declare></Declare>
        </>
    )
}
