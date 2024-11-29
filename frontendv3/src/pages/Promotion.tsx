import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { NavBar } from '../navbar/NavBar';
// import { ItemCard } from '../card/ItemCard';
import { Route, Routes, useParams } from 'react-router-dom';
import './Overview.css'
import { TextField } from '@mui/material';
import { getSuggestList } from '../utils/itemFunction/itemFunction';
import { ItemCard } from '../features/card/ItemCard';
import img001 from '/img/promotionBanner/001.jpg'
import img002 from '/img/promotionBanner/002.jpg'
import img003 from '/img/promotionBanner/003.jpg'
import img004 from '/img/promotionBanner/004.jpg'
import img005 from '/img/promotionBanner/005.jpg'


// import {
//     getItemByItemId,
//     selectDescriptionDetail,
//     selectInStock,
//     selectPrice,
//     selectProductName,
//     selectProductUnit,
//   } from "./itemDetailSlice"

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

const promotionTitle = ["美酒共賞", "急凍優鮮餸", "萬聖節Trick or Treat", "一買即換", "長者優惠"]

const imgArr = [img001, img002, img003, img004, img005]

export const Promotion = () => {
    let { itemId } = useParams();
    console.log(`itemId`, itemId)
    // const dispatch = useAppDispatch()
    // const productName = useAppSelector(selectProductName)
    // const productUnit = useAppSelector(selectProductUnit)
    // const inStock= useAppSelector(selectInStock)
    // const price= useAppSelector(selectPrice)
    // const descriptionDetail = useAppSelector(selectDescriptionDetail)
    // const descriptionDetail = useAppSelector(selectDescriptionDetail)

    // const [inStock, setInStock] = useState(true);
    const [pendingPurchaseAmt, setPendingPurchaseAmt] = useState(0);
    const [productList, setProductList] = useState([])
    useEffect(() => {
        (async () => {
            let list = await getSuggestList()
            console.log(`list`, list)
            setProductList(list)
        })
            ()
    }, [])




    return (
        <>
            <Grid container>
                {promotionTitle.map((item, index) => {
                    return (
                        <>
                            <Grid size={12}>
                                <h2>{item}</h2>
                            </Grid>
                            <Grid size={12}>
                                <img src={imgArr[index]}></img>
                            </Grid>
                        </>
                    )
                })
                }
            </Grid>
        </>
    )
}




