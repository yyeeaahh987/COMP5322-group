import { useState } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch } from '../../app/hooks';
import { NavBar } from '../navbar/NavBar';
import { Card, CardActions, CardContent, CardMedia, Collapse, styled } from '@mui/material';
import { REACT_APP_DOMAIN } from '../../utils/constant';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

interface ItemCardProps {
    imagePath: string;
    altImage:string;
    itemDesc:string;
    price:number;
    addCartDisabled:boolean;
    redirectLink:string;
}

export const ItemCard = ((props:ItemCardProps) => {
    const dispatch = useAppDispatch()
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClickItem = ()=>{
        console.log(`handleClickItem`,handleClickItem)
        console.log(`${REACT_APP_DOMAIN}/home`)
        window.location.href = `${REACT_APP_DOMAIN}${props.redirectLink}`
    }
    
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={props.imagePath}
                    alt={props.altImage}
                    onClick={handleClickItem}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} onClick={handleClickItem}>
                        {props.itemDesc}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {`$${props.price}`}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}
)











// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// interface ExpandMoreProps extends IconButtonProps {
//     expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme }) => ({
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
//     variants: [
//         {
//             props: ({ expand }) => !expand,
//             style: {
//                 transform: 'rotate(0deg)',
//             },
//         },
//         {
//             props: ({ expand }) => !!expand,
//             style: {
//                 transform: 'rotate(180deg)',
//             },
//         },
//     ],
// }));

// export default function RecipeReviewCard() {
//     const [expanded, setExpanded] = React.useState(false);

//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };

//     return (
//         <Card sx={{ maxWidth: 345 }}>
//             <CardHeader
//                 avatar={
//                     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                         R
//                     </Avatar>
//                 }
//                 action={
//                     <IconButton aria-label="settings">
//                         <MoreVertIcon />
//                     </IconButton>
//                 }
//                 title="Shrimp and Chorizo Paella"
//                 subheader="September 14, 2016"
//             />
//             <CardMedia
//                 component="img"
//                 height="194"
//                 image="/static/images/cards/paella.jpg"
//                 alt="Paella dish"
//             />
//             <CardContent>
//                 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                     This impressive paella is a perfect party dish and a fun meal to cook
//                     together with your guests. Add 1 cup of frozen peas along with the mussels,
//                     if you like.
//                 </Typography>
//             </CardContent>
//             <CardActions disableSpacing>
//                 <IconButton aria-label="add to favorites">
//                     <FavoriteIcon />
//                 </IconButton>
//                 <IconButton aria-label="share">
//                     <ShareIcon />
//                 </IconButton>
//                 <ExpandMore
//                     expand={expanded}
//                     onClick={handleExpandClick}
//                     aria-expanded={expanded}
//                     aria-label="show more"
//                 >
//                     <ExpandMoreIcon />
//                 </ExpandMore>
//             </CardActions>
//             <Collapse in={expanded} timeout="auto" unmountOnExit>
//                 <CardContent>
//                     <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
//                     <Typography sx={{ marginBottom: 2 }}>
//                         Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
//                         aside for 10 minutes.
//                     </Typography>
//                     <Typography sx={{ marginBottom: 2 }}>
//                         Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
//                         medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
//                         occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
//                         large plate and set aside, leaving chicken and chorizo in the pan. Add
//                         pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
//                         stirring often until thickened and fragrant, about 10 minutes. Add
//                         saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
//                     </Typography>
//                     <Typography sx={{ marginBottom: 2 }}>
//                         Add rice and stir very gently to distribute. Top with artichokes and
//                         peppers, and cook without stirring, until most of the liquid is absorbed,
//                         15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
//                         mussels, tucking them down into the rice, and cook again without
//                         stirring, until mussels have opened and rice is just tender, 5 to 7
//                         minutes more. (Discard any mussels that don&apos;t open.)
//                     </Typography>
//                     <Typography>
//                         Set aside off of the heat to let rest for 10 minutes, and then serve.
//                     </Typography>
//                 </CardContent>
//             </Collapse>
//         </Card>
//     );
// }