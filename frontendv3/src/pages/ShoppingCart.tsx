import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const ShoppingCart = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
















// import { useEffect, useState } from 'react';
// import Grid from '@mui/material/Grid2';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// // import { useAppDispatch, useAppSelector } from '../../app/hooks';
// // import { NavBar } from '../navbar/NavBar';
// // import { ItemCard } from '../card/ItemCard';
// import { Route, Routes, useParams } from 'react-router-dom';
// import itemImage from "../../../img/item/001/big_1.jpg"
// import './Overview.css'
// import { Button, Menu, MenuItem, TextField } from '@mui/material';
// import { getSuggestList, REACT_APP_DOMAIN, REACT_BACKEND_SERVER } from '../utils/itemFunction/itemFunction';
// import { ItemCard } from '../features/card/ItemCard';

// interface IFormInput {
//     accountName: string
//     accountPasswowrd: string
// }

// export const ShoppingCart = () => {
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <>
//             <span>this is shopping cart</span>

//             <div>
//                 <Button
//                     id="basic-button"
//                     // ref={anchorEl} 

//                     aria-controls={open ? 'basic-menu' : undefined}
//                     aria-haspopup="true"
//                     aria-expanded={open ? 'true' : undefined}
//                     onClick={handleClick}
//                 >
//                     Dashboard
//                 </Button>
//                 <Menu
//                     id="basic-menu"
//                     anchorEl={anchorEl}
//                     open={open}
//                     onClose={handleClose}
//                     MenuListProps={{
//                         'aria-labelledby': 'basic-button',
//                     }}
//                 >
//                     <MenuItem onClick={handleClose}>Profile</MenuItem>
//                     <MenuItem onClick={handleClose}>My account</MenuItem>
//                     <MenuItem onClick={handleClose}>Logout</MenuItem>
//                 </Menu>
//             </div>

//         </>
//     )
// }




