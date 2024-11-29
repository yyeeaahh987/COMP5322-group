import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NavBar } from '../navbar/NavBar';
import { ItemCard } from '../card/ItemCard';
import { Route, Routes, useParams } from 'react-router-dom';
// import itemImage from "../../../img/item/001/big_1.jpg"
// import './ItemDetail.css'
import { Button, TextField } from '@mui/material';
import './SShoppingCart.css'
import { selectCartId, selectItems } from './shoppingCartSlice';
// import {
//     getItemByItemId,
//     selectProductId,
//     selectDescriptionDetail,
//     selectInStock,
//     selectPrice,
//     selectProductImage,
//     selectProductName,
//     selectProductUnit,
// } from "./itemDetailSlice"

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

export const SShoppingCart = () => {
    // let { itemId } = useParams();
    // console.log(`itemId`, itemId)
    const dispatch = useAppDispatch()
    const cartId = useAppSelector(selectCartId)
    const items = useAppSelector(selectItems)
    console.log(`items`, items)
    // const productId = useAppSelector(selectProductId)
    // const productName = useAppSelector(selectProductName)
    // const productImage = useAppSelector(selectProductImage)
    // const productUnit = useAppSelector(selectProductUnit)
    // const inStock = useAppSelector(selectInStock)
    // const price = useAppSelector(selectPrice)
    // const descriptionDetail = useAppSelector(selectDescriptionDetail)
    // const [pendingPurchaseAmt, setPendingPurchaseAmt] = useState(0);

    useEffect(() => {
        // console.log(`itemId`, itemId)
        // dispatch(getItemByItemId(itemId))
    }, [])

    return (
        <>

            <Grid container>
                <Grid size={12}>
                    <h3>購物車預覽</h3>
                </Grid>
                <Grid size={12}>
                    <Button className="submit-button" variant="outlined">查看購物車</Button>
                </Grid>
                {items.map((eachProduct, index) => {
                    return (
                        <>
                            <Grid size={12}>
                                <Grid container>
                                    <Grid size={4}>
                                        <img className="product-img" src={`/img/item/${eachProduct.itemId}/itemCard.jpg`}></img>
                                    </Grid>
                                    <Grid size={8}>
                                        <Grid size={12}>
                                            <span>{`${eachProduct.engName} ${eachProduct.chiName}`}</span>
                                        </Grid>
                                        <Grid size={12}>
                                            <span>{`${eachProduct.amount}`}</span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    )
                })}
            </Grid>
        </>
    )
}
