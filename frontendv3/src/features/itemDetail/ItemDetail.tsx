import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NavBar } from '../navbar/NavBar';
import { ItemCard } from '../card/ItemCard';
import { Route, Routes, useParams } from 'react-router-dom';
import './ItemDetail.css'
import { Box, Button, IconButton, TextField } from '@mui/material';
import {
    getItemByItemId,
    selectProductId,
    selectDescriptionDetail,
    selectInStock,
    selectPrice,
    selectProductImage,
    selectProductName,
    selectProductEngName,
    selectProductChiName,
    selectProductUnit,
    selectStockAmt,
} from "./itemDetailSlice"
import { addItem, selectCartId } from '../smallShoppingCart/shoppingCartSlice';
import { selectUserName } from '../login/userSlice';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

export const ItemDetail = () => {
    let { itemId } = useParams();
    console.log(`itemId`, itemId)
    const [disableRemoveButton, setDisableRemoveButton] = useState(false)
    const [disableAddButton, setDisableAddButton] = useState(false)
    const dispatch = useAppDispatch()
    const userName = useAppSelector(selectUserName)
    const cartId = useAppSelector(selectCartId)
    const productId = useAppSelector(selectProductId)
    const productName = useAppSelector(selectProductName)
    const productEngName = useAppSelector(selectProductEngName)
    const productChiName = useAppSelector(selectProductChiName)
    const productImage = useAppSelector(selectProductImage)
    const productUnit = useAppSelector(selectProductUnit)
    const inStock = useAppSelector(selectInStock)
    console.log(`inStock`, inStock)
    const stockAmt = useAppSelector(selectStockAmt)
    const price = useAppSelector(selectPrice)
    const descriptionDetail = useAppSelector(selectDescriptionDetail)
    const [pendingPurchaseAmt, setPendingPurchaseAmt] = useState(0);

    useEffect(() => {
        console.log(`itemId`, itemId)
        dispatch(getItemByItemId(itemId))
        console.log(`stockAmt`, inStock)
    }, [])

    useEffect(() => {
        if (inStock === false) {
            console.log(`58`)
            setDisableRemoveButton(true)
            setDisableAddButton(true)
        } else {
            console.log(`67`)
            setDisableRemoveButton(false)
            setDisableAddButton(false)
        }
    }, [inStock])
    function handleClickMinus() {

        console.log(`pendingPurchaseAmt`, pendingPurchaseAmt)
        if (pendingPurchaseAmt <= 0) {
            return
        }
        let amt = pendingPurchaseAmt
        amt = amt - 1;
        setPendingPurchaseAmt(amt);
    }

    function handleClickPlus() {
        console.log(`pendingPurchaseAmt`, pendingPurchaseAmt)
        let amt = pendingPurchaseAmt
        amt = amt + 1;
        setPendingPurchaseAmt(amt);
    }

    function handleAddCart() {
        dispatch(addItem({
            itemId: productId,
            engName: productEngName,
            chiName: productChiName,
            price: price,
            amount: pendingPurchaseAmt,
            cartId: cartId,
            userId: userName,
        }))
    }

    function handleChangeAmt(e: any) {
        console.log(`e`, e.target.value)
        console.log(`isNaN(e.target.value)`, isNaN(e.target.value))
        console.log(`isNaN(e.target.value)`, e.target.value)
        if (isNaN(e.target.value) === false && e.target.value >= 0) {
            if (e.target.value <= stockAmt) {
                setPendingPurchaseAmt(e.target.value);
            } else {
                setPendingPurchaseAmt(stockAmt);
            }

            if (e.target.value === stockAmt) {
                console.log(`104`)
                setDisableAddButton(true)
            } else if (e.target.value === 0) {
                console.log(`107`)
                setDisableRemoveButton(true)
            }
            else if (
                0 < e.target.value &&
                e.target.value < stockAmt
            ) {
                setDisableAddButton(false)
                setDisableRemoveButton(false)
            }
        }
    }

    return (
        <>
            <Grid container>
                <Grid size={6}>
                    <Box className="product-box">
                        <img className='image-cust' src={`/img/item/${productId}/itemCard.jpg`}></img>
                    </Box>

                    {/* <span>this is photo area</span> */}
                </Grid>
                <Grid size={6}>
                    <Grid size={12}>
                        <h1 className='product-name'>{productName}</h1>
                    </Grid>
                    <Grid size={12}>
                        <div className='product-unit'>{productUnit}</div>
                    </Grid>
                    <Grid size={12}>
                        <span>
                            {(inStock === true) && <span className='product-label instock'>有貨</span>}
                            {(inStock === false) && <span className='product-label outofstock'>暫無存貨</span>}
                        </span>
                    </Grid>
                    <Grid size={12}>
                        <span className="currentPrice">{`$${price}`}</span>
                    </Grid>
                    <Grid container>
                        <Grid size={6}>
                            <div className='input-container'>
                                {/* <button className="minus" type="button" onClick={handleClickMinus}>
                                    
                                </button> */}
                                <Grid container>
                                    <Grid size={1}>
                                        <div style={{ paddingLeft: "5px" }}></div>
                                    </Grid>
                                    <Grid size={1}>
                                        <IconButton onClick={handleClickMinus}
                                            disabled={disableRemoveButton}
                                        >
                                            <RemoveIcon></RemoveIcon>
                                        </IconButton>
                                    </Grid>
                                    <Grid size={8}>
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
                                            // inputProps={{min: 0, style: { textAlign: 'center' }}} 
                                            onChange={(e) => { handleChangeAmt(e) }}
                                            value={pendingPurchaseAmt} />
                                    </Grid>
                                    <Grid size={1}>
                                        <IconButton onClick={handleClickPlus}
                                            disabled={disableAddButton}
                                        >
                                            <AddIcon></AddIcon>
                                        </IconButton>
                                    </Grid>
                                    <Grid size={1}>
                                        <div style={{ paddingRight: "5px" }}></div>
                                    </Grid>
                                </Grid>


                                {/* <input type="number">{pendingPurchaseAmt}</input> */}

                                {/* <input type="number"></input> */}
                                {/* <button className="plus" type="button" onClick={handleClickPlus}>
                                    <AddIcon></AddIcon>
                                </button> */}
                            </div>
                        </Grid>
                        <Grid size={6}>
                            <button type="button" className="plus" onClick={handleAddCart}>加入購物車</button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <pre>{JSON.stringify(pendingPurchaseAmt,null,2)}</pre>
            <Grid container>
                <Grid size={12}>
                    <div className='group-title'>描述</div>
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth={true}
                        disabled={true}
                        value={descriptionDetail}
                        multiline={true}
                        slotProps={{
                            input: {
                                disableUnderline: true,
                            },
                        }}
                    ></TextField>
                </Grid>
                <Grid size={12}>

                    {/* <div className='description-topic'>
                        {descriptionDetail}
                    </div> */}
                </Grid>
            </Grid>

        </>
    )
}