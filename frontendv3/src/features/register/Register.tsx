import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Login.module.css"
import Grid from '@mui/material/Grid2';
import { Box, Button, Input, TextField } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import {
//     validateLogin
// } from "./userSlice"
import { Header } from "../header/Header";
import { Declare } from "../declare/Declare";
import { registerNewUser } from "../../utils/loginFunction/loginFunction";
import { useNavigate } from "react-router-dom";

const DOMAIN = process.env.REACT_APP_DOMAIN;

interface IFormInput {
    loginAccountName: string
    loginAccountPasswowrd: string
}

export const Register = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    //   const count = useAppSelector(selectCount)
    //   const status = useAppSelector(selectStatus)
    //   const [incrementAmount, setIncrementAmount] = useState("2")

    //   const incrementValue = Number(incrementAmount) || 0
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
    const onSubmit: SubmitHandler<any> = async (data) => {
        console.log(data)
        let result = await registerNewUser(data.loginAccountName, data.loginAccountPasswowrd)
        console.log(`result`, result)
        if (result) {
            window.alert("success")
            navigate("/");
        } else {
            window.alert("fail to register")
        }
        // dispatch(validateLogin(data))
    }

    function handleReset() {
        reset({
            loginAccountName: "",
            loginAccountPasswowrd: "",
        })
    }
    return (
        <>
            <Header></Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid size={12}>
                        <h2>註冊</h2>
                    </Grid>
                    <Grid size={6} justifyContent={"center"}>
                        <Box className={"sign-in-box"}>
                            <Grid size={12}>
                                註冊
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
                        <Button className="submit-button" variant="outlined" type="submit">註冊</Button>
                        <Button className="clear-button" variant="outlined" onClick={handleReset}>清取</Button>
                    </Grid>
                </Grid>
            </form>
            <Declare></Declare>
        </>
    )
}
