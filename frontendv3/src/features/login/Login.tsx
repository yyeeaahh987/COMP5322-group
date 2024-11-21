import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Login.module.css"
import Grid from '@mui/material/Grid2';
import { Box, Button, Input, TextField } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
    validateLogin
} from "./userSlice"
import { Header } from "../header/Header";
import { Declare } from "../declare/Declare";

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
    return (
        <>
            <Header></Header>

            <Grid container>
                <Grid size={12}>
                    <span>nav bar</span>
                </Grid>
            </Grid>
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
                                註冊
                            </Grid>
                            <Grid size={12}>
                                帳戶
                            </Grid>
                            <Grid size={12}>
                                {/* <Controller
                                    name="accountName"
                                    control={control}
                                    render={({ field }) => <TextField variant="standard" {...field} />}
                                /> */}
                            </Grid>
                            <Grid size={12}>
                                密碼
                            </Grid>
                            <Grid size={12}>
                                {/* <Controller
                                    name="accountPasswowrd"
                                    control={control}
                                    render={({ field }) => <TextField variant="standard"  {...field} />}
                                /> */}
                            </Grid>
                        </Box>
                        <Button className="submit-button" variant="outlined">註冊</Button>
                        <Button className="clear-button" variant="outlined">清取</Button>
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
