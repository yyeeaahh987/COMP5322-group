import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Route, Routes, useParams } from 'react-router-dom';
import './Overview.css'
import { Box, TextField } from '@mui/material';
import { getSubcategoryList, getSuggestList } from '../utils/itemFunction/itemFunction';
import { ItemCard } from '../features/card/ItemCard';
// import {
//     getItemByItemId,
//     selectDescriptionDetail,
//     selectInStock,
//     selectPrice,
//     selectProductName,
//     selectProductUnit,
//   } from "./itemDetailSlice"
const DOMAIN = process.env.REACT_APP_DOMAIN;
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

const blobToBase64 = (blob: any) => {
    console.log(`blob`, blob)
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
};

export const Overview = () => {
    let { itemId } = useParams();
    console.log(`itemId`, itemId)
    let { category, subcategory } = useParams();
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
            let list = await getSubcategoryList(category ? category : "", subcategory ? subcategory : "")
            console.log(`list`, list)
            // list.forEach((item:any,index:any)=>{
            //     console.log(`item.IMAGE`,item.IMAGE)

            //     const base64String = item.IMAGE.toString('base64');
            //     console.log(`base64String`,base64String)

            //     const image = new Blob([item.IMAGE], { type: 'image/jpeg' });
            //     console.log(`imageUrl`,image)
            //     const imageUrl = URL.createObjectURL(image);
            //     console.log(`imageUrl`,imageUrl)
            //     // blobToBase64(item.IMAGE).then(res => {
            //     //     // do what you wanna do
            //     //     console.log(res); // res is base64 now
            //         item={
            //             ...item,
            //             imageBase64:base64String
            //         }
            //     //   });                  
            // })
            console.log(`list`, list)
            setProductList(list)
        })
            ()
    }, [])

    return (
        <>
            <Grid container>
                <Grid size={12}>
                    <div style={{ padding: '5px' }}></div>
                </Grid>

                {/* <span>overview</span> */}
                {
                    productList.map((item: any, index: number) => {
                        return (
                            <Grid size={2} key={index}>
                                <Box className="card">
                                    <ItemCard
                                        imagePath={item.ITEM_ID}
                                        altImage={"a"}
                                        itemDesc={`${item?.ENG_NAME ?? ""} ${item?.CHI_NAME ?? ""}`}
                                        price={item.PRICE}
                                        addCartDisabled={((item?.AMOUNT ?? 0) > 0) ? false : true}
                                        redirectLink={`${DOMAIN}/home/item/detail/${item.ITEM_ID}`}
                                    >
                                    </ItemCard>
                                </Box>
                            </Grid>
                        )
                    })
                }
                <Grid size={12}>
                    <div style={{ padding: '5px' }}></div>
                </Grid>
            </Grid>
        </>
    )
}




