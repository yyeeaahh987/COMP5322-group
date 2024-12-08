import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import './Overview.css'
import { Box } from '@mui/material';
import { getSubcategoryList, getSuggestList } from '../utils/itemFunction/itemFunction';
import { ItemCard } from '../features/card/ItemCard';

export const Overview = () => {
    let { category, subcategory } = useParams();
    const [productList, setProductList] = useState([])
    useEffect(() => {
        (async () => {
            let list = await getSubcategoryList(category ? category : "", subcategory ? subcategory : "")
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




