import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { selectUserName } from '../features/login/userSlice';
import { getOrder, selectOrders } from '../features/order/orderSlice';
import './Order.css'
interface OrderProps {
    orderId: number;
    orderStatus: string;
    orderPrice: number;
    address: string;
}

export const Order = () => {
    const dispatch = useAppDispatch()
    const orders = useAppSelector(selectOrders)
    console.log(`orders`, orders)
    const userName = useAppSelector(selectUserName)

    useEffect(() => {
        (async () => {
            console.log(`init async`, userName)
            dispatch(getOrder(userName))
        })
            ()
    }, [])
    return (
        <>
            {
                orders.length > 0 && orders.map((eachOrder: any, index) => {
                    return (
                        <>
                            <br></br>
                            <OrderItem
                                orderId={eachOrder.ORDER_ID}
                                orderStatus={eachOrder.ORDER_STATUS}
                                orderPrice={eachOrder.PRICE}
                                address={eachOrder.ADDRESS}
                            >
                            </OrderItem>
                            <br></br>
                        </>
                    )
                })
            }
        </>
    );
}


const OrderItem = ((props: OrderProps) => {
    return (
        <>
            <Box className='box-style'>
                <Grid container >
                    <Grid size={12}>
                        <span>{`訂單編號: ${props.orderId}`}</span>
                    </Grid>
                    <Grid size={12}>
                        <span>{`訂單總價 $${props.orderPrice}`}</span>
                    </Grid>
                    <Grid size={12}>
                        <span>{`訂單狀態 ${props.orderStatus}`}</span>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
})
