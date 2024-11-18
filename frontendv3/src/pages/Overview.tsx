import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { NavBar } from '../navbar/NavBar';
// import { ItemCard } from '../card/ItemCard';
import { Route, Routes, useParams } from 'react-router-dom';
import itemImage from "../../../img/item/001/big_1.jpg"
import './Overview.css'
import { TextField } from '@mui/material';
import { getSuggestList, REACT_APP_DOMAIN, REACT_BACKEND_SERVER } from '../utils/itemFunction/itemFunction';
import { ItemCard } from '../features/card/ItemCard';
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

export const Overview = () => {
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


    // useEffect(async ()=>{

    //     console.log(`itemId`,itemId)
    //     // await 
    //     dispatch( getItemByItemId("123"))
    //     //  getItemByItemId
    // },[])

    // function getSuggestList(){
    //     let list = [
    //         {

    //         },
    //         {

    //         },
    //     ]
    // }
    // function handleClickMinus() {

    //     console.log(`pendingPurchaseAmt`, pendingPurchaseAmt)
    //     if (pendingPurchaseAmt <= 0) {
    //         return
    //     }
    //     let amt = pendingPurchaseAmt
    //     amt = amt - 1;
    //     setPendingPurchaseAmt(amt);
    // }

    // function handleClickPlus() {
    //     console.log(`pendingPurchaseAmt`, pendingPurchaseAmt)
    //     let amt = pendingPurchaseAmt
    //     amt = amt + 1;
    //     setPendingPurchaseAmt(amt);
    // }

    // function handleAddCart() {

    // }

    return (
        <>
            <Grid container>

                {/* <span>overview</span> */}
                {
                    productList.map((item: any, index: number) => {
                        return (
                            <Grid size={2} key={index}>
                                {/* <div > */}
                                    {/* <img src={item.IMAGE}></img> */}
                                    <ItemCard
                                        imagePath={item.IMAGE}
                                        altImage={"a"}
                                        itemDesc={`${item?.ENG_NAME ?? ""} ${item?.CHI_NAME ?? ""}`}
                                        price={item.PRICE}
                                        addCartDisabled={((item?.AMOUNT ?? 0) > 0) ? false : true}
                                        redirectLink={`${REACT_APP_DOMAIN}/home/item/detail/${item.ITEM_ID}`}
                                    >
                                    </ItemCard>
                                {/* </div> */}
                            </Grid>
                        )
                    })
                }

            </Grid>
        </>
    )
}




