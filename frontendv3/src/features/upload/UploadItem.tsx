import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { NavBar } from '../navbar/NavBar';
// import { ItemCard } from '../card/ItemCard';
import { Route, Routes, useParams } from 'react-router-dom';
import itemImage from "../../../img/item/001/big_1.jpg"
import './uploadItem.css'
import { TextField } from '@mui/material';
import { postRequestOptions } from '../../utils/constant';
// import {
//     getItemByItemId,
//     selectDescriptionDetail,
//     selectInStock,
//     selectPrice,
//     selectProductName,
//     selectProductUnit,
//   } from "./itemDetailSlice"
const DOMAIN = process.env.REACT_APP_DOMAIN;
const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

export const UploadItem = () => {
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

    const [file, setFile]: any = useState(null);
    const [fileId, setFileId]: any = useState(null);
    
    useEffect(() => {
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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        //   const formData = new FormData();
        //   formData.append('file', file);
        //   formData.append('id', fileId);

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
            console.log(reader.result);

            let body = {
                file: reader.result,
                id: fileId
            }
            let requestOption = {
                ...postRequestOptions,
                body: JSON.stringify(body)
            }
            console.log(`requestOption`, requestOption)
            const response = await fetch(`${BACKEND_SERVER}/item/uploadImage`, requestOption)
            const result = await response.json()
            console.log(`result`, result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };





        //   fetch('/file/upload', {
        //     method: 'POST',
        //     body: formData,
        //   })
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log('Success:', data);
        //   })
        //   .catch((error) => {
        //     console.error('Error:', error);
        //   });
    };

    const handleFileIdChange = (event: any) => {
        setFileId(event.target.value);
    };

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    return (
        <>
            <Grid container>
                <Grid size={12}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={handleFileIdChange} ></input>
                        <input type="file" onChange={handleFileChange} />
                        <button type="submit">Upload</button>
                    </form>
                </Grid>
            </Grid>
        </>
    )
}




