import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { Header } from '../header/Header';
import { Declare } from '../declare/Declare';
import './home.css'
import { logout, selectUserName } from '../login/userSlice';
import { getCartByUserId } from '../smallShoppingCart/shoppingCartSlice';
import { openPopup } from '../alertPopup/alertPopupSlice';

const pages = ['食品及飲品', '母嬰'];
const settings = [
    {
        action: "order",
        display: '訂單'
    },
    {
        action: "logout",
        display: '登出'
    },
];

const categoryMenu0 = [
    {
        description:"飲品、即沖飲品、酒類",
        nevigateLink:"/home/overview/食品及飲品/飲品、即沖飲品、酒類"
    },
    {
        description:"米、麵、油、烘焙",
        nevigateLink:"/home/overview/食品及飲品/米、麵、油、烘焙"
    },
]

export const Home = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const userName = useAppSelector(selectUserName)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorFirstMenu, setAnchorFirstMenu] = useState<null | HTMLElement>(null);
    const [dropdownFirstMenu, setDropdownFirstMenu] = useState(false)
    const [subMenu, setSubMenu] = useState<null | number>(null)

    useEffect(() => {
        if (userName != null && userName !="") {
            dispatch(getCartByUserId(userName))
        }
    }, [userName])

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    const handleOpenSmallShoppingCart = (event: React.MouseEvent<HTMLElement>) => {
        navigate("/home/cart");
    };

    function handleIconMenuOnClick(action: string) {
        if (action === "logout") {
            dispatch(logout())
            navigate("/")
            let object: any = {}
            object = {
                popupStatus: true,
                severity: "success",
                alertText: "Logout success",
            }
            dispatch(openPopup(object))
        }else if(action === "order"){
            navigate("/home/order")
        }
    }

    function handleMouseOver(event: React.MouseEvent<HTMLElement>, index: number) {
        setDropdownFirstMenu(false);
        setAnchorFirstMenu(event.currentTarget);
        setDropdownFirstMenu(true);
        setSubMenu(index)
    }

    function handleMouseLeave(event: React.MouseEvent<HTMLElement>, index: number) {
        setAnchorFirstMenu(null);
        setDropdownFirstMenu(false)
        setSubMenu(null)
    }

    function handleClickHome() {
        navigate(`/home/promotion`)
    }

    return (
        <>
            <Header></Header>
            <Grid container>
                <Grid size={12}>
                    <AppBar position="static">
                        <Container maxWidth="xl" className='nav-main'>
                            <Toolbar disableGutters>

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
                                                aria-owns={"simple-menu"}
                                                onMouseOver={(event) => { handleMouseOver(event, index) }}
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
                                    >
                                        {(subMenu == 0) &&
                                        categoryMenu0.map((eachSubMenu)=>{
                                            return (
                                                <MenuItem onClick={() => {
                                                    navigate(eachSubMenu.nevigateLink)
                                                }}>{eachSubMenu.description}</MenuItem>
                                            )
                                        })
                                        }
                                        {(subMenu == 1) &&
                                            <>
                                                <MenuItem onClick={() => {
                                                    navigate(`/home/overview/嬰幼兒奶粉/奶粉`)
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
                                        onClick={handleOpenSmallShoppingCart}
                                        sx={{ p: 0 }}>
                                        <ShoppingCartIcon className='nav-icon'></ShoppingCartIcon>
                                    </IconButton>
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

            <Box className="main-box">
                <Outlet></Outlet>
            </Box>
            <Declare></Declare>
        </>
    )
}
