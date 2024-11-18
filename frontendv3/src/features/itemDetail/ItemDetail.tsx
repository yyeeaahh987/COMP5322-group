import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NavBar } from '../navbar/NavBar';
import { ItemCard } from '../card/ItemCard';
import { Route, Routes, useParams } from 'react-router-dom';
import itemImage from "../../../img/item/001/big_1.jpg"
import './ItemDetail.css'
import { TextField } from '@mui/material';
import {
    getItemByItemId,
    selectDescriptionDetail,
    selectInStock,
    selectPrice,
    selectProductImage,
    selectProductName,
    selectProductUnit,
  } from "./itemDetailSlice"
  
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

export const ItemDetail = () => {
    let { itemId } = useParams();
    console.log(`itemId`,itemId)
    const dispatch = useAppDispatch()
    const productName = useAppSelector(selectProductName)
    const productImage = useAppSelector(selectProductImage)
    const productUnit = useAppSelector(selectProductUnit)
    const inStock= useAppSelector(selectInStock)
    const price= useAppSelector(selectPrice)
    const descriptionDetail = useAppSelector(selectDescriptionDetail)
    const [pendingPurchaseAmt, setPendingPurchaseAmt] = useState(0);

    useEffect(()=>{
        console.log(`itemId`,itemId)
        dispatch( getItemByItemId(itemId))
    },[])

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

    }

    return (
        <>
            <Grid container>
                <Grid size={6}>
                    <img className='image-cust' src={productImage}></img>
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
                            {inStock === true && <div className='product-label instock'>有貨</div>}
                            {inStock === false && <div className='product-label outofstock'>暫無存貨</div>}
                        </span>
                    </Grid>
                    <Grid size={12}>
                        <span className="currentPrice">{`$${price}`}</span>
                    </Grid>
                    <Grid container>
                        <Grid size={6}>
                            <div className='input-container'>
                                <button className="minus" type="button" onClick={handleClickMinus}>
                                    <RemoveIcon></RemoveIcon>
                                </button>
                                {/* <input type="number">{pendingPurchaseAmt}</input> */}
                                <TextField id="standard-basic" variant="standard" value={pendingPurchaseAmt} />
                                <button className="plus" type="button" onClick={handleClickPlus}>
                                    <AddIcon></AddIcon>
                                </button>
                            </div>
                        </Grid>
                        <Grid size={6}>
                            <button className="plus" type="button" onClick={handleAddCart}>加入購物車</button>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            {/* <span>here is scroll bar??</span> */}
            <Grid container>
                <Grid size={12}>
                    <div className='group-title'>描述</div>
                </Grid>
                <Grid size={12}>
                    <div className='description-topic'>
                        {descriptionDetail}
                    </div>
                </Grid>
            </Grid>

        </>
    )
}
