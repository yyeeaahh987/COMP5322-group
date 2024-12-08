import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addItem, deleteItem, selectCartId, selectItems } from '../features/smallShoppingCart/shoppingCartSlice';
import { Box, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { selectUserName } from '../features/login/userSlice';
import { closeLoading, openLoading } from '../features/loader/loadingSlice';
import { placeOrder } from '../features/order/orderSlice';
import { useNavigate } from 'react-router-dom';
import { openPopup } from '../features/alertPopup/alertPopupSlice';

interface CartProps {
  itemId: number;
  description: string;
  amount: number;
}

export const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const cartId = useAppSelector(selectCartId)
  const items = useAppSelector(selectItems)
  const userName = useAppSelector(selectUserName)

  function handleOrder() {
    dispatch(openLoading())
    let requestObj = {
      cartId: cartId,
      userId: userName,
    }
    try {
      dispatch(placeOrder(requestObj))
      //success nevigate to order
      navigate("/home/order");
      let object: any = {}
      object = {
        popupStatus: true,
        severity: "success",
        alertText: "下單成功",
      }
      dispatch(openPopup(object))
    } catch (e) {

    }
    dispatch(closeLoading())
  }
  return (
    <>
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
      {
        items.length === 0 &&
        <>
          <h3>沒有物品在購物車</h3>
        </>
      }
    </>
  );
}


const CartItem = ((props: CartProps) => {
  const dispatch = useAppDispatch()
  const userName = useAppSelector(selectUserName)
  const cartId = useAppSelector(selectCartId)
  const [disableRemoveButton, setDisableRemoveButton] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(false);
  useEffect(() => {
    if (props.amount === 0) {
      setDisableRemoveButton(true)
    }
  }, [props.amount])
  function handleClickMinus() {
    let newAmount = props.amount - 1
    dispatch(openLoading())
    dispatch(deleteItem({
      cartId: cartId,
      itemId: props.itemId,
      amount: newAmount,
      userId: userName
    }))
    dispatch(closeLoading())
  }

  function handleDelete() {
    dispatch(deleteItem({
      cartId: cartId,
      itemId: props.itemId,
      amount: 0,
      userId: userName
    }))
  }
  function handleClickPlus() {
    let newAmount = props.amount + 1
    dispatch(openLoading())
    dispatch(addItem({
      cartId: cartId,
      itemId: props.itemId,
      amount: newAmount,
      userId: userName,
      mode: "SHOPPING_CART"
    }))
    dispatch(closeLoading())
  }
  return (
    <>
      <Box>
        <Grid container>
          <Grid size={12}>
            <br></br>
          </Grid>
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
