import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './Overview.css'
import { Box } from '@mui/material';
import { getSubcategoryList, getSuggestList } from '../utils/itemFunction/itemFunction';
import { ItemCard } from '../features/card/ItemCard';

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
    let { category, subcategory } = useParams();
    const [pendingPurchaseAmt, setPendingPurchaseAmt] = useState(0);
    const [productList, setProductList] = useState([])
    useEffect(() => {
        (async () => {
            let list = await getSubcategoryList(category ? category : "", subcategory ? subcategory : "")
            console.log(`list`, list)
            setProductList(list)
        })
            ()
    }, [category,subcategory])

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
                                        redirectLink={`/home/item/detail/${item.ITEM_ID}`}
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




