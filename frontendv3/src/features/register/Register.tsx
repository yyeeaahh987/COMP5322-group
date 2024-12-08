import { useAppDispatch } from "../../app/hooks"
import Grid from '@mui/material/Grid2';
import { Box, Button, TextField } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Header } from "../header/Header";
import { Declare } from "../declare/Declare";
import { registerNewUser } from "../../utils/loginFunction/loginFunction";
import { useNavigate } from "react-router-dom";
import { openPopup } from "../alertPopup/alertPopupSlice";

export const Register = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
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
        let result = await registerNewUser(data.loginAccountName, data.loginAccountPasswowrd)
        if (result) {
            navigate("/");
            let object: any = {}
            object = {
                popupStatus: true,
                severity: "success",
                alertText: "Success",
            }
            dispatch(openPopup(object))
        } else {
            let object:any = {
                popupStatus: true,
                severity: "error",
                alertText: "failt to create",
            }
            dispatch(openPopup(object))
        }
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
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <h2 style={{ textAlign: "center" }}>註冊</h2>
                    </Grid>
                    <Grid size={6} justifyContent={"center"}>
                        <Box className={"sign-in-box"}>
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
                            <Grid size={12}>
                                <br></br>
                            </Grid>
                            <Grid size={12}>
                                <Button className="submit-button" variant="outlined" type="submit">註冊</Button>
                                <span> </span>
                                <Button className="clear-button" variant="outlined" onClick={handleReset}>清取</Button>
                            </Grid>
                        </Box>


                    </Grid>
                </Grid>
            </form>
            <Declare></Declare>
        </>
    )
}
