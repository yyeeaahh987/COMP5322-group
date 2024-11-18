import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../../app/hooks';
import { NavBar } from '../navbar/NavBar';
import { ItemCard } from '../card/ItemCard';
import { Route, Routes, useParams } from 'react-router-dom';
import itemImage from "../../../img/item/001/big_1.jpg"
import './ItemDetail.css'
import { TextField } from '@mui/material';

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
    const [inStock, setInStock] = useState(true);
    const [pendingPurchaseAmt, setPendingPurchaseAmt] = useState(0);

    // useEffect(async()=>{
    //     console.log(`itemId`,itemId)
    //     await 
    // },[])
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
                    <img className='image-cust' src={itemImage}></img>
                    {/* <span>this is photo area</span> */}
                </Grid>
                <Grid size={6}>
                    <Grid size={12}>
                        <h1 className='product-name'>Aptamil Pro 白金版初生嬰兒配方奶粉1號</h1>
                    </Grid>
                    <Grid size={12}>
                        <div className='product-unit'>900G</div>
                    </Grid>
                    <Grid size={12}>
                        <span>
                            {inStock === true && <div className='product-label instock'>有貨</div>}
                            {inStock === false && <div className='product-label outofstock'>暫無存貨</div>}
                        </span>
                    </Grid>
                    <Grid size={12}>
                        <span className="currentPrice">$388.00</span>
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
            <span>here is scroll bar??</span>
            <Grid container>
                <Grid size={12}>
                    <div className='group-title'>描述</div>
                </Grid>
                <Grid size={12}>
                    <div className='description-topic'>
                        商品代碼：807819
                        原裝新西蘭進口
                        0-6個月初生嬰兒適用
                        餵哺表
                        ^一平量匙 = 4.5克奶粉。
                        注意：一平量匙奶粉加入30毫升水。
                        1. 每次只沖調一次的餵哺量。沖調奶液後即時飲用是最安全的。請把喝剩的奶液倒去。
                        2. 必須遵照指導。按照指導準備奶瓶和奶嘴，只能使用罐內量匙。除非有醫生的建議，否則不要改變奶粉沖調比例。不恰當的沖調比例不利於寶寶的健康。請勿讓寶寶獨自進食。
                        3. 不要使用沒有罐蓋封條或鋁箔的奶粉，如鋁箔受損亦不宜使用。
                        此餵哺表只作建議，你的寶寶可能有不同需要。6個月以上寶寶食用此產品時，需要添加輔助食品。

                        沖調指引
                        1. 將雙手洗淨及清潔沖調範圍。將奶瓶，奶嘴及器具放入開水中煮沸消毒，或使用合格的消毒器消毒。
                        2. 將安全的飲用水煮沸並放涼至40℃。將正常份量已煮沸的暖水倒入已清潔的奶瓶。
                        3. 只能使用隨附量匙。輕輕地舀滿一平量匙並刮平，避免壓實奶粉。
                        4. 每30毫升水加一平匙奶粉。蓋好奶瓶蓋，搖動奶瓶至奶粉完全溶解。
                        5. 準備餵哺前，把奶液滴在手腕上試溫。沖調後馬上餵哺（不要儲存）。請把喝剩的奶液倒去。

                        備註
                        配方奶並非無菌的食品，在沖調過程中或會受到污染。

                        沖調指引
                        1. 將雙手洗淨及清潔沖調範圍。將奶瓶，奶嘴及器具放入開水中煮沸消毒，或使用合格的消毒器消毒。
                        2. 將安全的飲用水煮沸並放涼至40℃。將正常份量已煮沸的暖水倒入已清潔的奶瓶。
                        3. 只能使用隨附量匙。輕輕地舀滿一平量匙並刮平，避免壓實奶粉。
                        4. 每30毫升水加一平匙奶粉。蓋好奶瓶蓋，搖動奶瓶至奶粉完全溶解。
                        5. 準備餵哺前，把奶液滴在手腕上試溫。沖調後馬上餵哺（不要儲存）。請把喝剩的奶液倒去。

                        備註
                        配方奶並非無菌的食品，在沖調過程中或會受到污染。
                    </div>
                </Grid>
            </Grid>

        </>
    )
}
