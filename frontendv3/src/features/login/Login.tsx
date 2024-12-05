import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Login.module.css"
import Grid from '@mui/material/Grid2';
import { Box, Button, Input, TextField } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
    selectLoginSuccess,
    selectUserName,
    validateLogin
} from "./userSlice"
import { Header } from "../header/Header";
import { Declare } from "../declare/Declare";
import { getCartByUserId } from "../smallShoppingCart/shoppingCartSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
const DOMAIN = process.env.REACT_APP_DOMAIN;

// enum GenderEnum {
//     female = "female",
//     male = "male",
//     other = "other",
// }
// interface IFormInput {
//     firstName: string
//     gender: GenderEnum
//   }

interface IFormInput {
    loginAccountName: string
    loginAccountPasswowrd: string
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    const loginSuccess = useAppSelector(selectLoginSuccess)
    const userName = useAppSelector(selectUserName)

    useEffect(() => {
        console.log(`loginSuccess`, loginSuccess)
        if (loginSuccess === true) {
            navigate("/home/promotion");
            // location(`/home/promotion`);
            // return (
            //     <>
            //         <Link to="/login">Login again</Link>
            //     </>
            // )

            // location(`${DOMAIN}/home/promotion`);
        }
    }, [loginSuccess])

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            loginAccountName: "",
            loginAccountPasswowrd: "",
        }
    });
    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data)
        dispatch(validateLogin(data))
    }

    function handleReset() {
        reset({
            loginAccountName: "",
            loginAccountPasswowrd: "",
        })
    }

    function handleRegister() {
        navigate("/register");
    }


    return (
        <>
            <Header></Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid size={12}>
                        <h2>仲未係會員?​ 快啲加入, 有好多優惠等緊你！</h2>
                    </Grid>
                    <Grid size={6} justifyContent={"center"}>
                        <Box className={"sign-in-box"}>
                            <Grid size={12}>
                                登入
                            </Grid>
                            <Grid size={12}>
                                帳戶
                            </Grid>
                            <Grid size={12}>
                                <Controller
                                    name="loginAccountName"
                                    control={control}
                                    render={({ field }) => <TextField variant="standard" {...field} />}
                                />
                            </Grid>
                            <Grid size={12}>
                                密碼
                            </Grid>
                            <Grid size={12}>
                                <Controller
                                    name="loginAccountPasswowrd"
                                    control={control}
                                    render={({ field }) => <TextField variant="standard"  {...field} />}
                                />
                            </Grid>
                        </Box>
                        <Button className="submit-button" variant="outlined" type="submit">登入</Button>
                        <Button className="clear-button" variant="outlined" onClick={handleReset}>清取</Button>
                    </Grid>

                    <Grid size={6} justifyContent={"center"}>
                        <Box className={"sign-in-box"}>
                            <Grid size={12}>
                                <Button className="submit-button" variant="outlined" onClick={handleRegister}>註冊</Button>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid size={6}>

                    </Grid>
                    <Grid size={6}>

                    </Grid>
                </Grid>
            </form>
            <Declare></Declare>
        </>
    )
}
