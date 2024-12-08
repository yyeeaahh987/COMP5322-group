import { useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { useAppSelector } from '../../app/hooks';
import { Button } from '@mui/material';
import './SShoppingCart.css'
import { selectItems } from './shoppingCartSlice';

export const SShoppingCart = () => {
    const items = useAppSelector(selectItems)
    useEffect(() => {

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
