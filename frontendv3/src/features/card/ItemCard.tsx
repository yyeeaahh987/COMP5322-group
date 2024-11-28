import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Card, CardActions, CardContent, CardMedia, Collapse, styled } from '@mui/material';
import './ItemCard.css'
interface ItemCardProps {
    imagePath: string;
    altImage:string;
    itemDesc:string;
    price:number;
    addCartDisabled:boolean;
    redirectLink:string;
}

export const ItemCard = ((props:ItemCardProps) => {
    const [expanded, setExpanded] = useState(false);


    const handleClickItem = ()=>{
        console.log(`handleClickItem`)
        // console.log(`${REACT_APP_DOMAIN}/home`)
        window.location.href = `${props.redirectLink}`
    }
    
    console.log(`linke`,`../../../img/item/${props.imagePath}/itemCard.jpg`)
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={`../../../img/item/${props.imagePath}/itemCard.jpg`}
                    alt={props.altImage}
                    onClick={handleClickItem}
                />
                <CardContent>
                    <Typography variant="body2"  onClick={handleClickItem}>
                        <span className='card-description'>{props.itemDesc}</span>
                    </Typography>
                    <Typography variant="body2" >
                        <span className='card-price'>{`$${props.price}`}</span>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}
)