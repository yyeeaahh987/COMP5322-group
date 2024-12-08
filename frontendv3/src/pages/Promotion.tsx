import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import './Overview.css'
import { getSuggestList } from '../utils/itemFunction/itemFunction';
import img001 from '/img/promotionBanner/001.jpg'
import img002 from '/img/promotionBanner/002.jpg'
import img003 from '/img/promotionBanner/003.jpg'
import img004 from '/img/promotionBanner/004.jpg'
import img005 from '/img/promotionBanner/005.jpg'


const promotionTitle = ["美酒共賞", "急凍優鮮餸", "萬聖節Trick or Treat", "一買即換", "長者優惠"]

const imgArr = [img001, img002, img003, img004, img005]

export const Promotion = () => {
    let { itemId } = useParams();
    const [productList, setProductList] = useState([])
    useEffect(() => {
        (async () => {
            let list = await getSuggestList()
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




