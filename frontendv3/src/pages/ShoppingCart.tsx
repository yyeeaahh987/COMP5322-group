import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addItem, deleteItem, selectCartId, selectItems } from '../features/smallShoppingCart/shoppingCartSlice';
import { Box, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { selectUserName } from '../features/login/userSlice';

interface CartProps {
  itemId: number;
  description: string;
  amount: number;
}

export const ShoppingCart = () => {
  const dispatch = useAppDispatch()
  const cartId = useAppSelector(selectCartId)
  const items = useAppSelector(selectItems)

  console.log(`cartId`, cartId)
  console.log(`items`, items)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleOrder(){
    console.log(`handleOrder`)
    
  }
  return (
    <>

      {/* <div>
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
      </div> */}
      {
        items.length > 0 && items.map((item: any, index) => {
          return (
            <>
              <CartItem
                itemId={item.ITEM_ID}
                description={item.CHI_NAME}
                amount={item.amount}
              >
              </CartItem>
            </>
          )
        })
      }
      {
        items.length > 0 && 
        <>
          <Button variant='outlined' onClick={handleOrder}>下單</Button>
        </>
      }
    </>
  );
}


const CartItem = ((props: CartProps) => {
  console.log(`props`, props)
  const dispatch = useAppDispatch()
  const userName = useAppSelector(selectUserName)
  const cartId = useAppSelector(selectCartId)
  const [disableRemoveButton, setDisableRemoveButton] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(false);

  useEffect(() => {
    if (props.amount === 0) {
      setDisableRemoveButton(true)
    }
    // if(){

    // }
  }, [props.amount])
  function handleClickMinus() {
    let newAmount = props.amount - 1
    console.log(`newAmount`, newAmount)
    dispatch(deleteItem({
      cartId: cartId,
      itemId: props.itemId,
      amount: newAmount,
      userId: userName
    }))
  }

  function handleDelete(){
    dispatch(deleteItem({
      cartId: cartId,
      itemId: props.itemId,
      amount: 0,
      userId: userName
    }))
  }
  function handleClickPlus(){
    let newAmount = props.amount - 1
    console.log(`newAmount`, newAmount)
    dispatch(addItem({
      cartId: cartId,
      itemId: props.itemId,
      amount: newAmount,
      userId: userName
    }))
  }
  return (
    <>
      <Box>
        <Grid container>
          <Grid size={2}>
            <img className='image-cust' src={`/img/item/${props.itemId}/itemCard.jpg`}></img>
          </Grid>
          <Grid size={10}>
            <Grid container>
              <Grid size={12}>
                <span>{props.description}</span>
              </Grid>
              <Grid size={12}>
                <Box>
                  <IconButton
                    onClick={handleClickMinus}
                    disabled={disableRemoveButton}
                  >
                    <RemoveIcon></RemoveIcon>
                  </IconButton>

                  <TextField id="standard-basic"
                    variant="standard"
                    slotProps={{
                      input: {
                        disableUnderline: true,
                      },
                      htmlInput: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    // onChange={(e) => { handleChangeAmt(e) }}
                    value={props.amount}
                  />

                  <IconButton
                    onClick={handleClickPlus}
                    disabled={disableAddButton}
                  >
                    <AddIcon></AddIcon>
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
})
